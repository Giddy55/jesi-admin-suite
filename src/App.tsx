import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "@/components/auth/LoginPage";
import Dashboard from "@/pages/Dashboard";
import Schools from "@/pages/Schools";
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
                <div className="p-6">
                  <h1 className="text-3xl font-bold">Content & Curriculum</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-quality" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-3xl font-bold">AI Quality</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/compliance" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-3xl font-bold">Compliance</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-3xl font-bold">Analytics</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-3xl font-bold">Billing</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/support" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-3xl font-bold">Support & Communications</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/health" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-3xl font-bold">Platform Health</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-3xl font-bold">Settings</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
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
