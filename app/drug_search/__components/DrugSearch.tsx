"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";

const DrugSearch = () => {
  const [selectedDrug, setSelectedDrug] = useState<string>(""); // State to hold the selected drug name
  const [selectedStrength, setSelectedStrength] = useState<string>(""); // State to hold the selected strength of the drug
  const [selectedItems, setSelectedItems] = useState<
    { drug: string; strength: string }[]
  >([]); // State to hold an array of selected drug and strength pairs

  const [patientName, setPatientName] = useState<string>(""); // State to hold the patient's name
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State to hold the PDF preview URL

  // Effect to load the necessary scripts and CSS for the autocomplete functionality
  useEffect(() => {
    const cssLink = document.createElement("link");
    cssLink.href =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink);

    const jqueryScript = document.createElement("script"); // Create a script element for the autocomplete functionality
    jqueryScript.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    document.body.appendChild(jqueryScript);

    const autocompleteScript = document.createElement("script"); // Create a script element for the autocomplete functionality
    autocompleteScript.src =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.js";
    document.body.appendChild(autocompleteScript);

    // Set up onload event for jQuery script
    jqueryScript.onload = () => {
      autocompleteScript.onload = () => {
        new (window as any).Def.Autocompleter.Prefetch("drug_strengths", []);
        new (window as any).Def.Autocompleter.Search(
          "rxterms",
          "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS"
        );

        // Observe selections from the drug search autocomplete
        (window as any).Def.Autocompleter.Event.observeListSelections(
          "rxterms",
          function () {
            const drugField = (window as any).$("#rxterms")[0]; // Get the drug input field
            const autocomp = drugField.autocomp; // Access the autocomplete instance
            const selectedDrug = drugField.value; // Get the selected drug name
            const strengths =
              autocomp.getSelectedItemData()[0].data["STRENGTHS_AND_FORMS"];

            // If strengths are available, update the strengths autocomplete
            if (strengths) {
              (window as any)
                .$("#drug_strengths")[0]
                .autocomp.setListAndField(strengths, ""); // Set the strengths in the autocomplete
              setSelectedDrug(selectedDrug); // Update the selected drug state
              setSelectedStrength(""); // Clear the selected strength state
            }

            // Observe selections from the strengths autocomplete
            (window as any).Def.Autocompleter.Event.observeListSelections(
              "drug_strengths",
              function () {
                const strengthField = (window as any).$("#drug_strengths")[0]; // Get the strength input field
                const selectedStrength = strengthField.value; // Get the selected strength
                setSelectedStrength(selectedStrength); // Update the selected strength state
              }
            );
          }
        );
      };
    };

    // Cleanup function to remove the appended elements when the component unmounts
    return () => {
      document.head.removeChild(cssLink);
      document.body.removeChild(jqueryScript);
      document.body.removeChild(autocompleteScript);
    };
  }, []);

  // Function to handle adding the selected drug and strength to the list
  const handleAddSelection = () => {
    if (selectedDrug && selectedStrength) {
      setSelectedItems([
        ...selectedItems,
        { drug: selectedDrug, strength: selectedStrength },
      ]);
      setSelectedDrug(""); // Clear the selected drug state
      setSelectedStrength(""); // Clear the selected strength state
    }
  };

  // Function to handle deleting a selected drug and strength
  const handleDeleteSelection = (index: number) => {
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newSelectedItems); // Update the selected items state
  };

  // Function to generate a PDF preview of the selected drugs and strengths
  const handleGeneratePDFPreview = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Set the font size for the title
    doc.setFontSize(16);
    doc.text("Selected Drugs and Dosages:", 10, 10);

    // Add the current date and patient's name below the title
    doc.setFontSize(12);
    doc.text(`Patient: ${patientName}`, 10, 20); // Add patient name
    doc.text(`Date: ${currentDate}`, 10, 30);

    // Add the list of drugs and dosages
    selectedItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.drug} - ${item.strength}`,
        10,
        40 + index * 10
      );
    });

    // Create a Blob from the PDF and generate a URL for it
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  // Function to handle downloading the generated PDF
  const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;

      // Use the patient name in the PDF filename
      link.download = `${patientName
        .replace(/\s+/g, "_")
        .toLowerCase()}_selected_drugs_${new Date()
        .toLocaleDateString()
        .replace(/\//g, "-")}.pdf`;
      link.click();

      // Clean up the object URL after downloading
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  return (
    <div>
      {/* Patient Name Input */}
      <Input
        type="text"
        id="patient_name" // ID for the patient name input field
        placeholder="Name of Patient"
        value={patientName} // Controlled input value
        onChange={(e) => setPatientName(e.target.value)} // Update state on input change
        className="mb-4"
      />
      {/* Drug name Search */}
      <Input
        type="text"
        id="rxterms"
        placeholder="Drug name"
        value={selectedDrug}
        onChange={(e) => setSelectedDrug(e.target.value)}
      />
      {/* Drug Strength dropdown. Each Drug will have different dosage strengths */}
      <Input
        type="text"
        id="drug_strengths"
        placeholder="Strength list"
        value={selectedStrength}
        onChange={(e) => setSelectedStrength(e.target.value)}
      />

      {/* Click this to add Drug and Dosage in the Prescription */}
      <Button onClick={handleAddSelection} className="mb-8">
        Add Selection
      </Button>
      {selectedItems.length > 0 && ( // Render the block if there are selected items
        <div>
          <h3 className="font-bold">Selected Drugs and Dosages:</h3>
          <ul>
            {/* Iterate over selectedItems array to display each drug and its corresponding strength */}
            {selectedItems.map((item, index) => (
              <li key={index}>
                {/* Display the selected drug name and strength */}
                {item.drug} - {item.strength}
                {/* Button to clear the current drug and strength selection */}
                {/*(delete) the current selection from the list */}
                <Button
                  onClick={() => handleDeleteSelection(index)}
                  className="ml-2 mb-5"
                >
                  Clear
                </Button>
              </li>
            ))}
          </ul>

          {/* Button to generate the PDF preview */}
          <Button onClick={handleGeneratePDFPreview} className="mt-4">
            Generate PDF Preview
          </Button>
          {/* Conditionally render the PDF preview section if the PDF URL is available */}

          {pdfUrl && (
            <div className="mt-4">
              <h4 className="font-bold">PDF Preview:</h4>

              {/* iframe to display the PDF preview within the UI */}
              <iframe src={pdfUrl} width="100%" height="500px" />
              {/* Button to download the generated PDF */}
              <Button onClick={handleDownloadPDF} className="mt-4">
                Download PDF
              </Button>

              {/* Button to cancel the PDF preview, which clears the PDF URL */}
              <Button onClick={() => setPdfUrl(null)} className="ml-2 mt-4">
                {" "}
                {/* setPdfUrl(null); // Clear the PDF preview URL */}
                Cancel Preview
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrugSearch;
