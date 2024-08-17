"use client";

import React, { useState } from "react";
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
import { TimePicker12Demo } from "./time-picker-12h-demo"; // Adjust this import path as needed

// A <TimePickerInput /> component built with React and Shadcn UI. https://time.openstatus.dev/
// Schema for form validation using Zod
const FormSchema = z.object({
  eventDateTime: z.date({
    required_error: "An event date and time is required.",
  }),
  title: z.string().min(1, "Event title is required"),
  patientName: z.string().min(1, "Patient name is required"),
  description: z.string().optional(),
});

// Event interface for typing events in the calendar
interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
  patientName?: string;
  description?: string;
}

export default function Scheduler() {
  const [allEvents, setAllEvents] = useState<Event[]>([]); // State to store all events
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the add event modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the visibility of the delete event modal
  const [idToDelete, setIdToDelete] = useState<number | null>(null); // State to store the id of the event to delete

  // Initialize the form with default values and validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventDateTime: new Date(),
      title: "",
      patientName: "",
      description: "",
    },
  });

  // Handle date click event from the calendar
  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    form.setValue("eventDateTime", arg.date); // Set the clicked date as the event date
    setShowModal(true); // Open the add event modal
  }

  // Add a new event to the calendar
  function addEvent(data: DropArg) {
    const newEvent: Event = {
      title: data.draggedEl.innerText,
      start: data.date,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, newEvent]); // Update the state with the new event
  }

  // Handle the delete event modal
  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true); // Open the delete event modal
    setIdToDelete(Number(data.event.id)); // Store the id of the event to delete
  }

  // Delete an event from the calendar
  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false); // Close the delete event modal
    setIdToDelete(null); // Reset the id to delete
  }

  // Close all modals and reset form
  function handleCloseModal() {
    setShowModal(false);
    form.reset(); // Reset the form fields
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  // Handle form submission to add a new event
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newEvent: Event = {
      title: data.title,
      start: data.eventDateTime,
      allDay: false,
      id: new Date().getTime(),
      patientName: data.patientName,
      description: data.description,
    };
    setAllEvents([...allEvents, newEvent]); // Add the new event to the state
    handleCloseModal(); // Close the modal
    toast({
      title: "Event added",
      description: "Your event has been successfully added to the calendar.",
    });
  }

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
        selectable={true}
        selectMirror={true}
        dateClick={handleDateClick} // Handle date click to open the add event modal
        drop={(data) => addEvent(data)} // Handle drop event to add new events
        showNonCurrentDates={false}
        eventClick={(data) => {
          data.jsEvent.preventDefault();
          handleDeleteModal(data); // Handle event click to open delete modal
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
                name="eventDateTime"
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
                              format(field.value, "PPP hh:mm:ss a") // Display the selected date and time in 12-hour format
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
                          onSelect={field.onChange} // Handle date selection
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker12Demo
                            setDate={field.onChange}
                            date={field.value} // TimePicker for start time
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDateTime"
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
                              format(field.value, "PPP hh:mm:ss a") // Display the selected date and time in 12-hour format
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
                          onSelect={field.onChange} // Handle date selection
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker12Demo
                            setDate={field.onChange}
                            date={field.value} // TimePicker for end time
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
