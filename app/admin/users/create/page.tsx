"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import { createUser } from "@/lib/api";

const CreateUserPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    profilePic: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      data.append("authProvider", "local");
      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      const result = await createUser(data);

      if (result.success) {
        alert("User created successfully!");
        router.push("/admin/users");
      } else {
        alert("Failed to create user: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New User</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white rounded-lg shadow-md p-8"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            placeholder="Full Name"
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Password</label>
          <Input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Confirm Password</label>
          <Input
            placeholder="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Profile Picture (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                profilePic: e.target.files?.[0] || null,
              })
            }
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500">
            Note: Using FormData even without image upload
          </p>
        </div>

        <div className="flex gap-4 mt-4">
          <PrimaryBtn
            buttonName="Create User"
            type="submit"
            loading={isSubmitting}
          />
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
