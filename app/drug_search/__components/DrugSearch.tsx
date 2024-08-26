"use client"; // Indicates that this component is a client-side component in Next.js
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"; // Importing React hooks
import { Input } from "@/components/ui/input"; // Importing a custom Input component

const DrugSearch = () => {
  const [selectedDrug, setSelectedDrug] = useState<string>("");
  const [selectedStrength, setSelectedStrength] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<
    { drug: string; strength: string }[]
  >([]);

  useEffect(() => {
    const cssLink = document.createElement("link");
    cssLink.href =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink);

    const jqueryScript = document.createElement("script");
    jqueryScript.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    document.body.appendChild(jqueryScript);

    const autocompleteScript = document.createElement("script");
    autocompleteScript.src =
      "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.js";
    document.body.appendChild(autocompleteScript);

    jqueryScript.onload = () => {
      autocompleteScript.onload = () => {
        new (window as any).Def.Autocompleter.Prefetch("drug_strengths", []);
        new (window as any).Def.Autocompleter.Search(
          "rxterms",
          "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS"
        );

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
              setSelectedDrug(selectedDrug);
              setSelectedStrength("");
            }

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
      document.head.removeChild(cssLink);
      document.body.removeChild(jqueryScript);
      document.body.removeChild(autocompleteScript);
    };
  }, []);

  const handleAddSelection = () => {
    if (selectedDrug && selectedStrength) {
      setSelectedItems([
        ...selectedItems,
        { drug: selectedDrug, strength: selectedStrength },
      ]);
      setSelectedDrug("");
      setSelectedStrength("");
    }
  };

  const handleDeleteSelection = (index: number) => {
    // Function to handle deleting a selected drug and strength
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newSelectedItems);
  };

  return (
    <div>
      <Input
        type="text"
        id="rxterms"
        placeholder="Drug name"
        value={selectedDrug}
        onChange={(e) => setSelectedDrug(e.target.value)}
      />
      <Input
        type="text"
        id="drug_strengths"
        placeholder="Strength list"
        value={selectedStrength}
        onChange={(e) => setSelectedStrength(e.target.value)}
      />
      <Button onClick={handleAddSelection} className="mb-8">
        Add Selection
      </Button>
      {selectedItems.length > 0 && (
        <div>
          <h3 className="font-bold">Selected Drugs and Dosages:</h3>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {item.drug} - {item.strength}{" "}
                <Button
                  onClick={() => handleDeleteSelection(index)}
                  className="ml-2 mb-5"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DrugSearch; // Export the DrugSearch component
