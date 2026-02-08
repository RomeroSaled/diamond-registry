import { useState } from "react";
import { PersonForm } from "@/components/PersonForm";
import { PersonTable } from "@/components/PersonTable";

type View = "form" | "table";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("form");

  return (
    <>
      {currentView === "form" ? (
        <PersonForm onViewRegistros={() => setCurrentView("table")} />
      ) : (
        <PersonTable onNewRegistro={() => setCurrentView("form")} />
      )}
    </>
  );
};

export default Index;
