import * as React from "react";
// import "@/app/printables/print.css";

export const Prescription = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    // Presciption Printable
    <div ref={ref} style={{ textAlign: "center", padding: "20px" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "0.25in" }}>
        <h2
          style={{
            fontSize: "16pt",
            margin: "0 0 0.1in 0",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          EMMYLOU JANE C. BAYLOSIS-VALENCIA, M.D.
        </h2>
        <p
          style={{
            fontSize: "12pt",
            margin: "0 0 0.1in 0",
            textAlign: "center",
          }}
        >
          INTERNAL MEDICINE - NEUROLOGY
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "10pt",
          }}
        >
          <div style={{ textAlign: "left" }}>
            ROOM 401-MAB
            <br />
            Iloilo Mission Hospital
            <br />
            Mission Road, Jaro, Iloilo City
            <br />
            Tel. No. 3200315 Loc. 6071 / 0999 468 0603
            <br />
            Tues & Thurs: 9:00am - 2:00pm
          </div>
          <div style={{ textAlign: "left" }}>
            <br />
            Metro Iloilo Medical Center, Inc.
            <br />
            Mondays: 9:00am - 2:00pm
            <br />
            Tel. No. 327-1527
          </div>
        </div>
      </div>

      <hr
        style={{
          border: "3px solid black",
          backgroundColor: "black",
        }}
      />
      <br />
      <hr
        style={{
          border: "1px solid black",
          backgroundColor: "black",
        }}
      />
      <br />
      {/* Patient Information Section */}

      <div style={{ marginBottom: "0.5in" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              flex: 1,
              textAlign: "left",
            }}
          >
            Patient Name:
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "left",
            }}
          >
            Date:
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              flex: 1,
              textAlign: "left",
            }}
          >
            Address:
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "left",
            }}
          >
            Age:
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "left",
            }}
          >
            Sex:
          </div>
        </div>
      </div>

      {/*Prescription Section  */}
      <div
        style={{
          textAlign: "left", // Align text to the left
          fontSize: "40px",
        }}
      >
        RX
        <div
          style={{
            textAlign: "left", // Align text to the left
            fontSize: "12px",
          }}
        >
          king it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.3
        </div>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: "0.5in" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "10pt", margin: "0" }}>
              EMMYLOU JANE C. BAYLOSIS-VALENCIA, M.D.
            </p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "10pt", margin: "0" }}>
              Lic No: <span style={{ fontWeight: "bold" }}> 102582</span>
            </p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "10pt", margin: "0" }}>PTR No:</p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "10pt", margin: "0" }}>S2 No:</p>
          </div>
        </div>
      </div>
    </div>
  );
});

Prescription.displayName = "Prescription";
