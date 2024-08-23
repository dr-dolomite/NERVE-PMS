// app/drug_search/__components/DrugSearch.tsx
"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";

const DrugSearch = () => {
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
            const strengths =
              autocomp.getSelectedItemData()[0].data["STRENGTHS_AND_FORMS"];
            if (strengths) {
              (window as any)
                .$("#drug_strengths")[0]
                .autocomp.setListAndField(strengths, "");
            }
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
    </div>
  );
};

export default DrugSearch;
