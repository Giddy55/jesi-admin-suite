import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "@/components/auth/LoginPage";
import Dashboard from "@/pages/Dashboard";
import Schools from "@/pages/Schools";
import ContentCurriculum from "@/pages/ContentCurriculum";
import AIQuality from "@/pages/AIQuality";
import Compliance from "@/pages/Compliance";
import Analytics from "@/pages/Analytics";
import Billing from "@/pages/Billing";
import Support from "@/pages/Support";
import PlatformHealth from "@/pages/PlatformHealth";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schools" 
            element={
              <ProtectedRoute>
                <Schools />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/content" 
            element={
              <ProtectedRoute>
                <ContentCurriculum />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-quality" 
            element={
              <ProtectedRoute>
                <AIQuality />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/compliance" 
            element={
              <ProtectedRoute>
                <Compliance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/support" 
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/health" 
            element={
              <ProtectedRoute>
                <PlatformHealth />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
