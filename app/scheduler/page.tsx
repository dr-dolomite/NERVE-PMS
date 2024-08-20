"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DropArg } from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaCalendar } from "react-icons/fa";
import { TimePicker12Demo } from "./time-select/time-picker-12h-demo"; // Adjust this import path as needed

import { gapi } from "gapi-script";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Schema for form validation using Zod
const FormSchema = z.object({
  startDateTime: z.date({
    required_error: "A start date and time is required.",
  }),
  endDateTime: z.date({
    required_error: "An end date and time is required.",
  }),
  title: z.string().min(1, "Event title is required"),
  patientName: z.string().min(1, "Patient name is required"),
  description: z.string().optional(),
});

interface Event {
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurrence?: string[];
  attendees?: Array<{ email: string }>;
  reminders?: {
    useDefault: boolean;
    overrides: Array<{ method: string; minutes: number }>;
  };
}

export default function Scheduler() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const [gapiLoaded, setGapiLoaded] = useState(false);

  const CALENDAR_ID = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  //You need to remember that a service account is not you. A service account has its own google calendar account. The events are being inserted into its google calendar and not yours.
  //You should share your calendar with the service account using the service account email address and then use the calendar id from your calendar to insert into.
  //https://www.youtube.com/watch?v=aD9vU1a7WXo
  useEffect(() => {
    const DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ];
    const initializeGapi = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            setGapiLoaded(true);
            console.log("gapi initialized");
          })
          .catch((error) => {
            console.error("Error initializing gapi", error);
          });
      });
    };

    initializeGapi();
  }, [API_KEY, CLIENT_ID, SCOPES]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDateTime: new Date(),
      endDateTime: new Date(),
      title: "",
      patientName: "",
      description: "",
    },
  });

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    form.setValue("startDateTime", arg.date);
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    // Function left empty intentionally
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    // Function left empty intentionally
  }

  function handleCloseModal() {
    setShowModal(false);
    form.reset();
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Function left empty intentionally

    //##############

    handleCloseModal();
    toast({
      title: "Event added",
      description: "Your event has been successfully added to the calendar.",
    });
  }

  const handleClick: () => void = () => {
    if (gapiLoaded) {
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          console.log("User signed in");
          gapi.client.load("calendar", "v3", () =>
            console.log("Calendar API loaded")
          );

          const event: Event = {
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
              "A chance to hear more about Google's developer products.",
            start: {
              dateTime: "2024-08-29T09:00:00+08:00",
              timeZone: "Asia/Manila",
            },
            end: {
              dateTime: "2024-08-29T17:00:00+08:00",
              timeZone: "Asia/Manila",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=3"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          // Use any to avoid TypeScript errors
          (gapi.client as any).calendar.events
            .insert({
              calendarId: CALENDAR_ID,
              resource: event,
            })
            .then((response: any) => {
              console.log("Event created:", response);
            })
            .catch((error: any) => {
              console.error("Error creating event", error);
            });
        });
    } else {
      console.error("gapi not loaded yet");
    }
  };

  return (
    <>
      {/* REMOVE THE GOOGLE SIGN IN IF NEEDED */}
      {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          // useOneTap
          // auto_select
        />
      </GoogleOAuthProvider> */}
      {/* REMOVE THE GOOGLE SIGN IN IF NEEDED */}

      <button onClick={handleClick} disabled={!gapiLoaded}>
        Add Event
      </button>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          googleCalendarPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        events={{
          googleCalendarId: process.env.NEXT_PUBLIC_CALENDAR_ID,
          ...allEvents,
        }}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        dateClick={handleDateClick}
        drop={(data) => addEvent(data)}
        showNonCurrentDates={false}
        eventClick={(data) => {
          data.jsEvent.preventDefault();
          handleDeleteModal(data);
        }}
      />
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>
              Please enter the event details below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <FaCalendar className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP hh:mm:ss a")
                            ) : (
                              <span>Pick a start time</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker12Demo
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <FaCalendar className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP hh:mm:ss a")
                            ) : (
                              <span>Pick an end time</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker12Demo
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button type="submit">Add Event</Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
