"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isLastPatient, setIsLastPatient] = useState(false);

  const handleNextPatient = () => {
    if (currentIndex === null) {
      setCurrentIndex(0);
    } else {
      let nextIndex = currentIndex + 1;
      while (nextIndex < currentPatients.length) {
        if (currentPatients[nextIndex].status !== "Finished Checkup") {
          setCurrentIndex(nextIndex);
          return;
        }
        nextIndex++;
      }
      // If we've reached here, we're at the last valid patient
      setIsLastPatient(true);
    }
  };

  useEffect(() => {
    // Check if we're at the last patient
    if (currentIndex !== null) {
      let nextIndex = currentIndex + 1;
      while (nextIndex < currentPatients.length) {
        if (currentPatients[nextIndex].status !== "Finished Checkup") {
          setIsLastPatient(false);
          return;
        }
        nextIndex++;
      }
      setIsLastPatient(true);
    }
  }, [currentIndex, currentPatients]);

  const currentPatient =
    currentIndex !== null ? currentPatients[currentIndex] : null;

  // If current patient has finished checkup, move to the next one
  useEffect(() => {
    if (
      currentPatient &&
      currentPatient.status === "Finished Checkup" &&
      !isLastPatient
    ) {
      handleNextPatient();
    }
  }, [currentPatient, isLastPatient]);

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
        {!isLastPatient && (
          <button
            onClick={handleNextPatient}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next Patient
          </button>
        )}
      </div>

      <button
        onClick={() => console.log("Click is working")}
        className="mt-12 px-4 py-2 bg-slate-500 text-white rounded"
      >
        Notify
      </button>

      <Link
        href="/queuing"
        className="mt-24 px-4 py-2 bg-amber-500 text-white rounded"
      >
        Redirect to Queue
      </Link>
    </main>
  );
}
