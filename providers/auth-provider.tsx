"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
type User = {
  id: number;
  fullName: string;
  email: string;
  image: string;
  token: string;
  role: "admin" | "user";
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser).user);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Protected routes logic
    if (!isLoading) {
      // Allow access to auth pages when logged out
      if (!user && pathname.startsWith("/admin")) {
        router.push("/auth/login");

        toast({
          title: "Authentication required",
          description: "Please login to access this page",
          variant: "destructive",
        });
      }

      // Redirect from auth pages when logged in
      if (user && pathname.startsWith("/auth")) {
        router.push("/admin");
      }
    }
  }, [user, pathname, isLoading, router, toast]);

  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  console.log("apiend pint is ", apiEndpoint);

  const login = async (email: string, password: string) => {
    // const url = `${apiEndpoint}/api/users/login`;
    const url = `${apiEndpoint}/api/users/login`;
    try {
      setIsLoading(true);
      // const response = await fetch("https://dummyjson.com/auth/login", {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        toast({
          title: "Login failed",
          description: errorData.message || "Invalid credentials",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }

      const userData = await response.json();
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData));
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
      router.push("/admin");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Signup successful",
        description: "Your account has been created. You can now login.",
      });

      router.push("/auth/login");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
