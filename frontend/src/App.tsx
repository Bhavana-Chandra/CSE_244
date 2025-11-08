import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Scenarios from "./pages/Scenarios";
import ScenarioDetail from "./pages/ScenarioDetail";
import GamesHub from "./pages/GamesHub";
import MemoryMatch from "./pages/MemoryMatch";
import SpinLearn from "./pages/SpinLearn";
import GrowingTreeGame from "./games/GrowingTree/index";
import RightsVsDuties from "./pages/RightsVsDuties";
import CrosswordChallenge from "./pages/CrosswordChallenge";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import QuickLinks from "./pages/QuickLinks";
import NotFound from "./pages/NotFound";
import ConstitutionalChatbot from "./components/ConstitutionalChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GameProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/scenarios" element={<Scenarios />} />
              <Route path="/scenarios/:id" element={<ScenarioDetail />} />
              <Route path="/games" element={<GamesHub />} />
              <Route path="/memory-match" element={<MemoryMatch />} />
              <Route path="/spin-learn" element={<SpinLearn />} />
              <Route path="/growing-tree" element={<GrowingTreeGame />} />
              <Route path="/rights-duties" element={<RightsVsDuties />} />
              <Route path="/crossword" element={<CrosswordChallenge />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/quick-links" element={<QuickLinks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ConstitutionalChatbot />
        </TooltipProvider>
      </GameProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
