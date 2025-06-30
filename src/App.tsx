import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import Conversation from "./pages/Conversation";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { ConversationHistory } from "./components/ConversationHistory";
import { UserPreferences } from "./components/UserPreferences";
import { Dashboard } from "./components/Dashboard";
import PersonalDevelopment from './pages/PersonalDevelopment';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/conversation" element={<Conversation />} />
                  <Route path="/result" element={<Result />} />
                  <Route path="/history" element={<ConversationHistory />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/personal-development" element={<PersonalDevelopment />} />
                  <Route path="/preferences" element={<UserPreferences />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
