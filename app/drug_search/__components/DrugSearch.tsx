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

  useEffect(() => {
    // Create a link element for the CSS stylesheet
    const cssLink = document.createElement("link");
    cssLink.href =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.css"; // URL for the CSS
    cssLink.rel = "stylesheet"; // Set the relationship to stylesheet
    document.head.appendChild(cssLink); // Append the CSS link to the document head

    // Create a script element for jQuery
    const jqueryScript = document.createElement("script");
    jqueryScript.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"; // URL for jQuery
    document.body.appendChild(jqueryScript); // Append the jQuery script to the document body

    // Create a script element for the autocomplete functionality
    const autocompleteScript = document.createElement("script");
    autocompleteScript.src =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.js"; // URL for the autocomplete script
    document.body.appendChild(autocompleteScript); // Append the autocomplete script to the document body

    // Set up onload event for jQuery script
    jqueryScript.onload = () => {
      // Set up onload event for the autocomplete script
      autocompleteScript.onload = () => {
        // Initialize the drug strengths autocomplete
        new (window as any).Def.Autocompleter.Prefetch("drug_strengths", []);
        // Initialize the drug search autocomplete
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
              autocomp.getSelectedItemData()[0].data["STRENGTHS_AND_FORMS"]; // Get the strengths associated with the selected drug

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
      document.head.removeChild(cssLink); // Remove the CSS link
      document.body.removeChild(jqueryScript); // Remove the jQuery script
      document.body.removeChild(autocompleteScript); // Remove the autocomplete script
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle adding the selected drug and strength to the list
  const handleAddSelection = () => {
    if (selectedDrug && selectedStrength) {
      // Check if both drug and strength are selected
      setSelectedItems([
        ...selectedItems, // Spread the existing items
        { drug: selectedDrug, strength: selectedStrength }, // Add the new selection
      ]);
      setSelectedDrug(""); // Clear the selected drug state
      setSelectedStrength(""); // Clear the selected strength state
    }
  };

  // Function to handle deleting a selected drug and strength
  const handleDeleteSelection = (index: number) => {
    const newSelectedItems = selectedItems.filter((_, i) => i !== index); // Filter out the item at the specified index
    setSelectedItems(newSelectedItems); // Update the selected items state
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    // Set the font size for the title
    doc.setFontSize(16);
    doc.text("Selected Drugs and Dosages:", 10, 10);

    // Add the current date below the title
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 10, 20);

    // Add the list of drugs and dosages
    selectedItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.drug} - ${item.strength}`,
        10,
        30 + index * 10
      );
    });

    // Save the PDF with the date in the filename
    const fileName = `selected_drugs_${currentDate.replace(/\//g, "-")}.pdf`;
    doc.save(fileName);
  };

  return (
    <div>
      <Input
        type="text"
        id="rxterms" // ID for the drug input field
        placeholder="Drug name"
        value={selectedDrug} // Controlled input value
        onChange={(e) => setSelectedDrug(e.target.value)} // Update state on input change
      />
      <Input
        type="text"
        id="drug_strengths" // ID for the strength input field
        placeholder="Strength list"
        value={selectedStrength} // Controlled input value
        onChange={(e) => setSelectedStrength(e.target.value)} // Update state on input change
      />
      <Button onClick={handleAddSelection} className="mb-8">
        Add Selection {/* Button to add the selected drug and strength*/}
      </Button>
      {selectedItems.length > 0 && ( // Check if there are any selected items
        <div>
          <h3 className="font-bold">Selected Drugs and Dosages:</h3>{" "}
          {/* // Header for the selected items list */}
          <ul>
            {selectedItems.map(
              (
                item,
                index // Map through selected items to display them
              ) => (
                <li key={index}>
                  {" "}
                  {/* // Unique key for each list item */}
                  {item.drug} - {item.strength}{" "}
                  {/* // Display drug and strength */}
                  <Button
                    onClick={() => handleDeleteSelection(index)} // Button to delete the item
                    className="ml-2 mb-5"
                  >
                    Delete
                  </Button>
                </li>
              )
            )}
          </ul>
          <Button onClick={handleGeneratePDF} className="mt-4">
            Generate PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default DrugSearch; // Export the DrugSearch component for use in other parts of the application
