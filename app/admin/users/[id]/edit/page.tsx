"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import { getUserById, updateUser } from "@/lib/api";

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "user",
    profilePic: null as File | null,
  });

  useEffect(() => {
    if (params.id) {
      fetchUser(params.id as string);
    }
  }, [params.id]);

  const fetchUser = async (id: string) => {
    try {
      const result = await getUserById(id);
      if (result.success && result.data) {
        const user = result.data;
        setFormData({
          fullName: user.fullName || "",
          email: user.email || "",
          role: user.role || "user",
          profilePic: null,
        });
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("role", formData.role);
      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      const result = await updateUser(params.id as string, data);

      if (result.success) {
        alert("User updated successfully!");
        router.push("/admin/users");
      } else {
        alert("Failed to update user: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit User</h1>

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
          <label className="text-sm font-medium">Profile Picture</label>
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
        </div>

        <div className="flex gap-4 mt-4">
          <PrimaryBtn
            buttonName="Update User"
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

export default EditUserPage;
