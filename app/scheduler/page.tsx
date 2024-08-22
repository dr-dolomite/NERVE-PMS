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

  // function addEvent(data: DropArg) {
  //   // Function left empty intentionally
  // }

  // const listEvents = async (): Promise<void> => {
  //   let response;
  //   try {
  //     const request = {
  //       calendarId: CALENDAR_ID,
  //       // timeMin: new Date().toISOString(),
  //       showDeleted: false,
  //       singleEvents: true,
  //       // maxResults: 10,
  //       orderBy: "startTime",
  //     };
  //     response = await (gapi.client as any).calendar.events.list(
  //       request as any
  //     );
  //   } catch (err) {
  //     const errorMessage = (err as Error).message;
  //     document.getElementById("content")!.innerText = errorMessage;
  //     return;
  //   }

  //   const events = response.result.items;
  //   if (!events || events.length === 0) {
  //     document.getElementById("content")!.innerText = "No events found.";
  //     return;
  //   }

  //   // Flatten to string to display
  //   const output = events.reduce(
  //     (str: string, event: any) =>
  //       `${str}${event.summary} (${
  //         event.start.dateTime || event.start.date
  //       }) - ID: ${event.id}\n`,
  //     "Events:\n"
  //   );
  //   document.getElementById("content")!.innerText = output;
  // };

  const listEvents = async (eventId: string): Promise<void> => {
    let response;
    try {
      const request = {
        calendarId: CALENDAR_ID,
        eventId: eventId,
      };
      response = await (gapi.client as any).calendar.events.get(request as any);
    } catch (err) {
      const errorMessage = (err as Error).message;
      document.getElementById("content")!.innerText = errorMessage;
      return;
    }

    const event = response.result;
    if (!event) {
      document.getElementById("content")!.innerText = "Event not found.";
      return;
    }

    const output = `${event.summary} (${
      event.start.dateTime || event.start.date
    }) - ID: ${event.id}\n`;
    document.getElementById("content")!.innerText = output;
  };

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowEditModal(true);
    setIdToDelete(data.event.id); // Set event ID as string
  }
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

  async function handleEditEvent(
    eventId: string, // Use the eventId directly for editing
    data: z.infer<typeof FormSchema>
  ) {
    try {
      if (gapiLoaded) {
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
          eventId: eventId, // Use the retrieved eventId for the patch request
          resource: updatedEvent,
        });

        if (response.status === 200) {
          setAllEvents((prev) =>
            prev.map((event) =>
              event.id === eventId ? { ...event, ...updatedEvent } : event
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

  return (
    <>
      {/* <button onClick={handleClick} disabled={!gapiLoaded}> Add Event</button> */}

      {/* <button onClick={listEvents} disabled={!gapiLoaded}>
        List Events
      </button> */}
      <div id="content"></div>

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
        // drop={(data) => addEvent(data)}
        showNonCurrentDates={false}
        eventClick={(data) => {
          data.jsEvent.preventDefault();
          // listEvents(data.event.id);
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
                <Button type="submit">Update Event</Button>
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
