import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Materi1Page from "./pages/Materi1Page";
import Materi2Page from "./pages/Materi2Page";
import Materi3Page from "./pages/Materi3Page";
import Materi4Page from "./pages/Materi4Page";
import GamesPage from "./pages/GamesPage";
import KesimpulanPage from "./pages/KesimpulanPage";
import EvaluasiPage from "./pages/EvaluasiPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/materi/1" element={<Materi1Page />} />
            <Route path="/materi/2" element={<Materi2Page />} />
            <Route path="/materi/3" element={<Materi3Page />} />
            <Route path="/materi/4" element={<Materi4Page />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/kesimpulan" element={<KesimpulanPage />} />
            <Route path="/evaluasi" element={<EvaluasiPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
