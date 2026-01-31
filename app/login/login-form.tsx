"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import { login, setupAuth } from "@/lib/api";

const LoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await login(email, password);

      if (result.success && result.data) {
        // Check if user has admin role BEFORE setting up auth
        if (result.data.user.role !== "admin") {
          setError("Access denied. Admin privileges required.");
          return;
        }

        // Setup auth and store credentials (only for admin users)
        setupAuth(result.data.token, result.data.user);

        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 flex-1 py-5">
      <div className="flex flex-col gap-5">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <PrimaryBtn buttonName="Log in" type="submit" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default LoginForm;
