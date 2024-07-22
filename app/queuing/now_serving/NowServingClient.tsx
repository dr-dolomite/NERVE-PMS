"use client"; // Mark this component as a client component

import React, { useState } from "react";

interface Patient {
  id: string;
  name: string;
  spotNumber: number; // Ensure this field name is correct
}

interface NowServingClientProps {
  currentPatients: Patient[];
}

const NowServingClient: React.FC<NowServingClientProps> = ({
  currentPatients,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Use null for default value

  const handleNextPatient = () => {
    if (currentIndex === null) {
      setCurrentIndex(0); // Show the first patient when button is clicked
    } else if (currentIndex < currentPatients.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentPatient =
    currentIndex !== null ? currentPatients[currentIndex] : null;

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div>
          <div className="mb-4">
            <h2 className={`mb-3 text-2xl font-semibold`}>Now Serving</h2>
            <p className={`mb-3 text-xl font-normal`}>
              Patient Name: {currentPatient ? currentPatient.name : "----"}
            </p>
            <p className={`mb-3 text-xl font-normal`}>
              Patient Queue Number:{" "}
              {currentPatient ? currentPatient.spotNumber : "----"}
            </p>
          </div>
        </div>
      </div>
      {currentIndex === null || currentIndex < currentPatients.length - 1 ? (
        <button
          onClick={handleNextPatient}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Patient
        </button>
      ) : null}
    </main>
  );
};

export default NowServingClient;
