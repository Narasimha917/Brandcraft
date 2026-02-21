import { Sparkles, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
  }, [dark]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // navigate to home after sign out
      navigate("/");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-card rounded-2xl px-6 py-3">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">BrandCraft</span>
        </button>
          <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/features/logo-concepts")}
            className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => navigate("/feedback")}
            className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            Feedback
          </button>
          <button
            onClick={() => navigate("/generate")}
            className="gradient-bg text-primary-foreground px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
            <button
              onClick={() => setDark(!dark)}
              title="Toggle theme"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-5 h-5" />
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
