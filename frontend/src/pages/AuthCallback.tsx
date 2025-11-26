import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the hash fragment from the URL (Supabase includes tokens here)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const error = hashParams.get("error");
        const errorDescription = hashParams.get("error_description");

        // Check for error in hash
        if (error) {
          console.error("Auth error:", error, errorDescription);
          navigate("/login?error=" + encodeURIComponent(errorDescription || error));
          return;
        }

        // Check for error in query params
        const queryError = searchParams.get("error");
        const queryErrorDescription = searchParams.get("error_description");
        if (queryError) {
          console.error("Auth error:", queryError, queryErrorDescription);
          navigate("/login?error=" + encodeURIComponent(queryErrorDescription || queryError));
          return;
        }

        // If we have tokens in the hash, Supabase will handle them automatically
        // We just need to wait for the session to be established
        if (accessToken || refreshToken) {
          // Wait a bit for Supabase to process the session
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user is now authenticated
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            // Success! Redirect to home
            navigate("/?verified=true");
          } else {
            // Session not established, redirect to login
            navigate("/login?error=verification_failed");
          }
        } else {
          // No tokens found, might be a password reset or other flow
          // Check if there's a type parameter
          const type = searchParams.get("type");
          
          if (type === "recovery") {
            // Password reset flow
            navigate("/auth/reset-password");
          } else {
            // Default: redirect to home
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error handling auth callback:", error);
        navigate("/login?error=callback_error");
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Verifying your email...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthCallback;

