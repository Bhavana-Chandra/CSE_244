import React from "react";
import { Link } from "react-router-dom";
import { scenarios } from "./scenarioData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const Scenarios: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Scenarios</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((s) => (
            <div key={s.id} className="border rounded-lg p-6 bg-card">
              <div className="text-sm text-muted-foreground mb-1">{s.realCase}</div>
              <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
              <p className="text-sm mb-4">{s.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded bg-muted">{s.theme}</span>
                <Link to={`/scenarios/${s.id}`}>
                  <Button>Play</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Scenarios;