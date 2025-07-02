
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Result from "./pages/Result";
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
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <Navigation />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/conversation" element={<Conversation />} />
                    <Route path="/result" element={<Result />} />
                    
                    {/* Protected Routes */}
                    <Route path="/history" element={
                      <ProtectedRoute>
                        <ConversationHistory />
                      </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/personal-development" element={
                      <ProtectedRoute>
                        <PersonalDevelopment />
                      </ProtectedRoute>
                    } />
                    <Route path="/preferences" element={
                      <ProtectedRoute>
                        <UserPreferences />
                      </ProtectedRoute>
                    } />
                    
                    {/* Admin Only Routes */}
                    <Route path="/admin" element={
                      <ProtectedRoute adminOnly>
                        <Admin />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
