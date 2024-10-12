"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Prescription } from "@/components/printables/Prescription";
import { Button } from "@/components/ui/button";

const PrintPage = () => {
  const componentRef = useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);
  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const [dimensions, setDimensions] = React.useState({
    width: 210,
    height: 148.5,
  });

  const printFn = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: ${dimensions.width}mm ${dimensions.height}mm;
        margin: 0;
      }
        
    }`,
    contentRef: componentRef,
    documentTitle: "Prescription",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    printFn(); // Trigger the print function when button is clicked
  };
  return (
    <div>
      <Button onClick={handleClick}>Print</Button>
      <Prescription ref={componentRef} />
    </div>
  );
};

export default PrintPage;
