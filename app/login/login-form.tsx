"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import { handleLogin } from "@/lib/actions";
import { setAuthToken, setUserData } from "@/lib/api/common/storage";

const LoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await handleLogin({ email, password });

    if (result.success && result.data) {
      // Store auth data on client side
      setAuthToken(result.data.token);
      setUserData(result.data.user);

      document.cookie = `authToken=${result.data.token}; path=/; max-age=${30 * 24 * 60 * 60}`;
      router.push("/admin");
    } else {
      setError(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 flex-1 py-5">
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
