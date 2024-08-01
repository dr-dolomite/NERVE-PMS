"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface Patient {
  id: string;
  name: string;
  spotNumber: number;
  status: string;
}

interface NowServingClientProps {
  currentPatients: Patient[];
}

export default function NowServingClient({
  currentPatients,
}: NowServingClientProps) {
  // Sort patients by their Queue Number (spotNumber) in ascending order
  const sortedPatients = currentPatients.sort(
    (a, b) => a.spotNumber - b.spotNumber
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLastPatient, setIsLastPatient] = useState(false);
  const [isFirstPatient, setIsFirstPatient] = useState(true);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    // Initialize with the first non-finished patient
    let index = 0;
    while (
      index < sortedPatients.length &&
      sortedPatients[index].status === "Finished Checkup"
    ) {
      index++;
    }
    setCurrentIndex(index < sortedPatients.length ? index : 0);
    checkIfLastPatient(index);
    checkIfFirstPatient(index);

    // Load voices for speech synthesis
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
      setVoicesLoaded(true);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        setVoicesLoaded(true);
      };
    }
  }, [sortedPatients]);

  const checkIfLastPatient = (index: number) => {
    let nextIndex = index + 1;
    while (nextIndex < sortedPatients.length) {
      if (sortedPatients[nextIndex].status !== "Finished Checkup") {
        setIsLastPatient(false);
        return;
      }
      nextIndex++;
    }
    setIsLastPatient(true);
  };

  const checkIfFirstPatient = (index: number) => {
    let prevIndex = index - 1;
    while (prevIndex >= 0) {
      if (sortedPatients[prevIndex].status !== "Finished Checkup") {
        setIsFirstPatient(false);
        return;
      }
      prevIndex--;
    }
    setIsFirstPatient(true);
  };

  const handleNextPatient = () => {
    let nextIndex = currentIndex + 1;
    while (nextIndex < sortedPatients.length) {
      if (sortedPatients[nextIndex].status !== "Finished Checkup") {
        setCurrentIndex(nextIndex);
        checkIfLastPatient(nextIndex);
        checkIfFirstPatient(nextIndex);
        return;
      }
      nextIndex++;
    }
    // If we've reached here, we're at the last valid patient
    setIsLastPatient(true);
  };

  const handlePreviousPatient = () => {
    let prevIndex = currentIndex - 1;
    while (prevIndex >= 0) {
      if (sortedPatients[prevIndex].status !== "Finished Checkup") {
        setCurrentIndex(prevIndex);
        checkIfLastPatient(prevIndex);
        checkIfFirstPatient(prevIndex);
        return;
      }
      prevIndex--;
    }
    // If we've reached here, we're at the first valid patient
    setIsFirstPatient(true);
  };

  const currentPatient = sortedPatients[currentIndex];

  const notificationWindowRef = useRef<Window | null>(null);

  function speak() {
    if (!voicesLoaded) {
      console.log("Voices not loaded yet");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `Now serving Queue Number ${currentPatient.spotNumber} ${currentPatient.name}`
    );

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];

    speechSynthesis.speak(utterance);

    // Open or update the notification window
    if (
      !notificationWindowRef.current ||
      notificationWindowRef.current.closed
    ) {
      notificationWindowRef.current = window.open(
        "",
        "NotificationWindow",
        "fullscreen=yes, popup=yes"
      );
    }

    if (notificationWindowRef.current) {
      const doc = notificationWindowRef.current.document;

      // If it's a new window, write the full HTML structure
      if (doc.body.innerHTML === "") {
        doc.write(`
          <html>
            <head>
              <title>Now Serving</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  height: 100vh; 
                  margin: 0; 
                  background-color: #f0f0f0;
                  overflow: hidden;
                }
                .container { 
                  background-color: white; 
                  padding: 40px; 
                  border-radius: 10px; 
                  box-shadow: 0 0 10px rgba(0,0,0,0.1);
                  text-align: center;
                }
                h1 { 
                  color: #333; 
                  font-size: 4em;
                  margin-bottom: 30px;
                }
                p { 
                  color: #666; 
                  font-size: 3em;
                  margin: 20px 0;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Now Serving</h1>
                <p id="patientName"></p>
                <p id="queueNumber"></p>
              </div>
            </body>
          </html>
        `);
        doc.close();
      }

      // Update the patient information
      const nameElement = doc.getElementById("patientName");
      const numberElement = doc.getElementById("queueNumber");
      if (nameElement && numberElement) {
        nameElement.textContent = `Patient Name: ${currentPatient.name}`;
        numberElement.textContent = `Queue Number: ${currentPatient.spotNumber}`;
      }

      notificationWindowRef.current.focus();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      {currentPatient && currentPatient.status !== "Finished Checkup" && (
        <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <div>
            <div className="mb-4">
              <h2 className={`mb-3 text-2xl font-semibold`}>Now Serving</h2>
              <p className={`mb-3 text-xl font-normal`}>
                Patient Name: {currentPatient.name}
              </p>
              <p className={`mb-3 text-xl font-normal`}>
                Patient Queue Number: {currentPatient.spotNumber}
              </p>
              <p className={`mb-3 text-xl font-normal`}>
                Patient Status: {currentPatient.status}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row space-x-14">
        {!isFirstPatient && (
          <button
            onClick={handlePreviousPatient}
            className="mt-12 px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Previous Patient
          </button>
        )}

        {!isLastPatient && (
          <button
            onClick={handleNextPatient}
            className="mt-12 px-4 py-2 bg-green-500 text-white rounded"
          >
            Next Patient
          </button>
        )}
      </div>

      <div className="flex flex-row space-x-14">
        <button
          // onClick={() => console.log("Click is working")}
          onClick={speak}
          className="mt-12 px-4 py-2 bg-slate-500 text-white rounded"
        >
          Notify
        </button>
        <Link
          key={currentPatient.id}
          href={`/queuing/post/${currentPatient.id}/edit_queue`}
          className=""
        >
          <button className={`mt-12 px-4 py-2 bg-blue-500 text-white rounded`}>
            UPDATE PATIENT INFO
          </button>
        </Link>
      </div>

      <Link
        href="/queuing"
        className="mt-24 px-4 py-2 bg-amber-500 text-white rounded"
      >
        Redirect to Queue
      </Link>
    </main>
  );
}
