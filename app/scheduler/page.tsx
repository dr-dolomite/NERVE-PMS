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
import { FaTrashAlt } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import axios from "axios"; // Assuming you're using Axios for API requests

import { gapi } from "gapi-script";

// Schema for form validation using Zod
const FormSchema = z.object({
  startDateTime: z.date({
    required_error: "A start date and time is required.",
  }),
  endDateTime: z.date({
    required_error: "An end date and time is required.",
  }),
  title: z.string().min(1, "Event title is required"),
  description: z.string().optional(),
});

interface Event {
  id?: string; // Add this line to include the id
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const [gapiLoaded, setGapiLoaded] = useState(false);

  const CALENDAR_ID = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

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
      description: "",
    },
  });

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    form.setValue("startDateTime", arg.date);
    form.setValue("endDateTime", arg.date); // Set endDateTime to the same date
    setShowModal(true);
  }

  //DELETE EVENT
  function handleDelete() {
    if (!idToDelete) {
      console.error("No event ID to delete.");
      return;
    }

    const request = {
      calendarId: CALENDAR_ID,
      eventId: idToDelete, // Use the eventId directly
    };

    (gapi.client as any).calendar.events
      .delete(request)
      .then(() => {
        console.log("Event deleted successfully.");
        toast({
          title: "Event Deleted",
          description: "The event has been successfully deleted.",
        });
        setAllEvents((prev) => prev.filter((event) => event.id !== idToDelete));
        setShowEditModal(false);
        setIdToDelete(null);
      })
      .catch((err: Error) => {
        console.error("Error deleting event: ", err.message);
        toast({
          title: "Error",
          description: "Failed to delete the event. Please try again.",
          variant: "destructive",
        });
      });
  }

  function handleCloseModal() {
    setShowModal(false);
    form.reset();
    setShowEditModal(false);
    setIdToDelete(null);
  }

  // CREATE EVENT
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (gapiLoaded) {
        await gapi.auth2.getAuthInstance().signIn();

        const event: Event = {
          summary: data.title,
          description: data.description,
          start: {
            dateTime: data.startDateTime.toISOString(),
            timeZone: "Asia/Manila",
          },
          end: {
            dateTime: data.endDateTime.toISOString(),
            timeZone: "Asia/Manila",
          },
        };

        const response = await (gapi.client as any).calendar.events.insert({
          calendarId: CALENDAR_ID,
          resource: event,
        });

        if (response.status === 200) {
          const newEvent = {
            summary: data.title,
            start: {
              dateTime: data.startDateTime.toISOString(),
              timeZone: "Asia/Manila",
            },
            end: {
              dateTime: data.endDateTime.toISOString(),
              timeZone: "Asia/Manila",
            },
            description: data.description,
          };

          setAllEvents((prev) => [...prev, newEvent]);
          handleCloseModal();
          toast({
            title: "Event Added",
            description: "Your event has been successfully added.",
          });
        } else {
          throw new Error("Failed to create event.");
        }
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: (error as Error).message || "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  //EDIT EVENT
  async function fetchEventData(eventId: string) {
    try {
      if (gapiLoaded) {
        await gapi.auth2.getAuthInstance().signIn();

        const request = {
          calendarId: CALENDAR_ID,
          eventId: eventId,
        };

        const response = await (gapi.client as any).calendar.events.get(
          request
        );
        const event = response.result;

        if (event) {
          form.setValue("title", event.summary || "");
          form.setValue("startDateTime", new Date(event.start.dateTime));
          form.setValue("endDateTime", new Date(event.end.dateTime));
          form.setValue("description", event.description || "");
        }
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to fetch event data.",
        variant: "destructive",
      });
    }
  }
  async function handleEditEvent(data: z.infer<typeof FormSchema>) {
    try {
      if (gapiLoaded && idToDelete) {
        await gapi.auth2.getAuthInstance().signIn();

        const updatedEvent: Partial<Event> = {
          summary: data.title,
          description: data.description,
          start: {
            dateTime: data.startDateTime.toISOString(),
            timeZone: "Asia/Manila",
          },
          end: {
            dateTime: data.endDateTime.toISOString(),
            timeZone: "Asia/Manila",
          },
        };

        const response = await (gapi.client as any).calendar.events.patch({
          calendarId: CALENDAR_ID,
          eventId: idToDelete, // Use the eventId for the patch request
          resource: updatedEvent,
        });

        if (response.status === 200) {
          setAllEvents((prev) =>
            prev.map((event) =>
              event.id === idToDelete ? { ...event, ...updatedEvent } : event
            )
          );
          toast({
            title: "Event Updated",
            description: "Your event has been successfully updated.",
          });
          handleCloseModal();
        } else {
          throw new Error("Failed to update event.");
        }
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: (error as Error).message || "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  function handleEditModal(data: { event: { id: string } }) {
    setIdToDelete(data.event.id); // Set event ID as string
    fetchEventData(data.event.id); // Fetch event data to populate the form
    setShowEditModal(true);
  }

  // Event handler for drag-and-drop
  const handleEventDrop = async (eventDropInfo: any) => {
    const { event } = eventDropInfo;
    const eventId = event.id;
    const updatedStart = event.start.toISOString();
    const updatedEnd = event.end ? event.end.toISOString() : updatedStart;

    try {
      const response = await axios.patch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${eventId}`,
        {
          start: { dateTime: updatedStart },
          end: { dateTime: updatedEnd },
        },
        {
          headers: {
            Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Event updated successfully in Google Calendar!",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error updating event in Google Calendar:", error);
      toast({
        title: "Error",
        description: "Failed to update event in Google Calendar.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
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
        eventDrop={handleEventDrop} // Add this line for drag-and-drop handling
        selectable={true}
        selectMirror={true}
        dateClick={handleDateClick}
        showNonCurrentDates={false}
        eventClick={(data) => {
          data.jsEvent.preventDefault();
          handleEditModal(data);
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
                      <Input {...field} required placeholder="Name of Event" />
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
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={format(field.value, "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={format(
                          field.value ?? form.getValues("startDateTime"),
                          "yyyy-MM-dd'T'HH:mm"
                        )}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        required
                      />
                    </FormControl>
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
                      <Input {...field} placeholder="Optional description" />
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
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div>Update Event</div>
              <div>
                <FaTrashAlt onClick={handleDelete} />
              </div>
            </DialogTitle>
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
                      <Input {...field} required placeholder="Name of Event" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => {
                  const dateValue =
                    field.value instanceof Date ? field.value : new Date();

                  // Check if the dateValue is valid before formatting
                  const formattedValue = !isNaN(dateValue.getTime())
                    ? format(dateValue, "yyyy-MM-dd'T'HH:mm")
                    : "";

                  return (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          value={formattedValue}
                          onChange={(e) => {
                            const newDate = new Date(e.target.value);
                            field.onChange(newDate);
                          }}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => {
                  const dateValue =
                    field.value instanceof Date ? field.value : new Date();

                  // Check if the dateValue is valid before formatting
                  const formattedValue = !isNaN(dateValue.getTime())
                    ? format(dateValue, "yyyy-MM-dd'T'HH:mm")
                    : "";

                  return (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          value={formattedValue}
                          onChange={(e) => {
                            const newDate = new Date(e.target.value);
                            field.onChange(newDate);
                          }}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Optional description" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                {/* <Button type="submit">Update Event</Button> */}

                <Button
                  type="button"
                  onClick={() => {
                    const formData = form.getValues(); // Get current form values
                    handleEditEvent(formData);
                  }}
                >
                  Save Changes
                </Button>

                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
