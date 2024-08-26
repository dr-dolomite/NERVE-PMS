"use client"; // Indicates that this component is a client-side component in Next.js
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react"; // Importing React hooks
import { Input } from "@/components/ui/input"; // Importing a custom Input component

const DrugSearch = () => {
  // State to hold the selected drug and strength
  const [selectedDrug, setSelectedDrug] = useState<string>("");
  const [selectedStrength, setSelectedStrength] = useState<string>("");
  // State to hold the list of selected drug and strength pairs
  const [selectedItems, setSelectedItems] = useState<
    { drug: string; strength: string }[]
  >([]);

  useEffect(() => {
    // Load external CSS for autocomplete styling
    const cssLink = document.createElement("link");
    cssLink.href =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink); // Append CSS link to the document head

    // Load jQuery library
    const jqueryScript = document.createElement("script");
    jqueryScript.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    document.body.appendChild(jqueryScript); // Append jQuery script to the document body

    // Load the Autocomplete library
    const autocompleteScript = document.createElement("script");
    autocompleteScript.src =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.js";
    document.body.appendChild(autocompleteScript); // Append Autocomplete script to the document body

    // Initialize autocomplete once the scripts are loaded
    jqueryScript.onload = () => {
      autocompleteScript.onload = () => {
        // Initialize drug_strengths autocomplete
        new (window as any).Def.Autocompleter.Prefetch("drug_strengths", []);

        // Initialize rxterms autocomplete with API endpoint
        new (window as any).Def.Autocompleter.Search(
          "rxterms",
          "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS"
        );

        // Set up event listener for list selections from rxterms
        (window as any).Def.Autocompleter.Event.observeListSelections(
          "rxterms",
          function () {
            const drugField = (window as any).$("#rxterms")[0]; // Get the drug input field
            const autocomp = drugField.autocomp; // Access the autocomplete instance
            const selectedDrug = drugField.value; // Get the selected drug name
            const strengths =
              autocomp.getSelectedItemData()[0].data["STRENGTHS_AND_FORMS"]; // Get strengths for the selected drug

            if (strengths) {
              // If strengths are available, set them in the strength input
              (window as any)
                .$("#drug_strengths")[0]
                .autocomp.setListAndField(strengths, "");

              // Set selected drug and reset selected strength
              setSelectedDrug(selectedDrug);
              setSelectedStrength("");
            }

            // Event listener for selecting a specific strength
            (window as any).Def.Autocompleter.Event.observeListSelections(
              "drug_strengths",
              function () {
                const strengthField = (window as any).$("#drug_strengths")[0]; // Get the strength input field
                const selectedStrength = strengthField.value; // Get the selected strength
                setSelectedStrength(selectedStrength); // Update state with selected strength
              }
            );
          }
        );
      };
    };

    return () => {
      // Cleanup the appended elements when the component unmounts
      document.head.removeChild(cssLink); // Remove the CSS link
      document.body.removeChild(jqueryScript); // Remove the jQuery script
      document.body.removeChild(autocompleteScript); // Remove the Autocomplete script
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleAddSelection = () => {
    // Function to handle adding the selected drug and strength to the list
    if (selectedDrug && selectedStrength) {
      setSelectedItems([
        ...selectedItems,
        { drug: selectedDrug, strength: selectedStrength }, // Add new selection
      ]);
      setSelectedDrug(""); // Reset drug input
      setSelectedStrength(""); // Reset strength input
    }
  };

  return (
    <div>
      <Input
        type="text"
        id="rxterms"
        placeholder="Drug name"
        value={selectedDrug}
        onChange={(e) => setSelectedDrug(e.target.value)} // Update selected drug on input change
      />
      <Input
        type="text"
        id="drug_strengths"
        placeholder="Strength list"
        value={selectedStrength}
        onChange={(e) => setSelectedStrength(e.target.value)} // Update selected strength on input change
      />
      <Button onClick={handleAddSelection} className="mb-8">
        Add Selection
      </Button>{" "}
      {/* Button to add selection */}
      {selectedItems.length > 0 && (
        <div>
          <h3 className="font-bold">Selected Drugs and Dosages:</h3>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {item.drug} - {item.strength}{" "}
                {/* Display selected drug and strength */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DrugSearch; // Export the DrugSearch component
