"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const DrugSearch = () => {
  const [selectedDrug, setSelectedDrug] = useState<string>("");
  const [selectedStrength, setSelectedStrength] = useState<string>("");

  useEffect(() => {
    // Load external CSS
    const cssLink = document.createElement("link");
    cssLink.href =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink);

    // Load jQuery
    const jqueryScript = document.createElement("script");
    jqueryScript.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    document.body.appendChild(jqueryScript);

    // Load the Autocomplete library
    const autocompleteScript = document.createElement("script");
    autocompleteScript.src =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.js";
    document.body.appendChild(autocompleteScript);

    // Initialize autocomplete once the scripts are loaded
    jqueryScript.onload = () => {
      autocompleteScript.onload = () => {
        // Initialize drug_strengths autocomplete
        new (window as any).Def.Autocompleter.Prefetch("drug_strengths", []);

        // Initialize rxterms autocomplete
        new (window as any).Def.Autocompleter.Search(
          "rxterms",
          "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS"
        );

        // Set up event listener for list selections
        (window as any).Def.Autocompleter.Event.observeListSelections(
          "rxterms",
          function () {
            const drugField = (window as any).$("#rxterms")[0];
            const autocomp = drugField.autocomp;
            const selectedDrug = drugField.value;
            const strengths =
              autocomp.getSelectedItemData()[0].data["STRENGTHS_AND_FORMS"];

            if (strengths) {
              (window as any)
                .$("#drug_strengths")[0]
                .autocomp.setListAndField(strengths, "");

              // Set selected drug and strength
              setSelectedDrug(selectedDrug);
              setSelectedStrength(""); // Reset selected strength when new drug is selected
            }

            // Event listener for selecting a specific strength
            (window as any).Def.Autocompleter.Event.observeListSelections(
              "drug_strengths",
              function () {
                const strengthField = (window as any).$("#drug_strengths")[0];
                const selectedStrength = strengthField.value;
                setSelectedStrength(selectedStrength);
              }
            );
          }
        );
      };
    };

    return () => {
      // Cleanup the appended elements when the component unmounts
      document.head.removeChild(cssLink);
      document.body.removeChild(jqueryScript);
      document.body.removeChild(autocompleteScript);
    };
  }, []);

  return (
    <div>
      <Input type="text" id="rxterms" placeholder="Drug name" />
      <Input type="text" id="drug_strengths" placeholder="Strength list" />
      {selectedDrug && selectedStrength && (
        <div>
          <h3>Selected Drug:</h3>
          <p>{selectedDrug}</p>
          <h3>Dosage Strength:</h3>
          <p>{selectedStrength}</p>
        </div>
      )}
    </div>
  );
};

export default DrugSearch;
