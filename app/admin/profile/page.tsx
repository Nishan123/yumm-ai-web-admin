"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";
import { getUserData, updateAuthUserProfile, clearAuthData } from "@/lib/api";

const AdminProfilePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profilePic: null as File | null,
  });

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      router.push("/login");
      return;
    }

    // Check if user is admin
    if (userData.role !== "admin") {
      router.push("/user/profile");
      return;
    }

    setUser(userData);
    setFormData({
      fullName: userData.fullName || "",
      email: userData.email || "",
      profilePic: null,
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      const result = await updateAuthUserProfile(user.uid, data);

      if (result.success) {
        alert("Profile updated successfully!");
        // Update local user data
        const updatedUser = { ...user, ...result.data };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        alert(
          "Failed to update profile: " + (result.message || "Unknown error"),
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      clearAuthData();
      router.push("/login");
    }
  };

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Profile</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex items-center gap-6 mb-6 pb-6 border-b">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800">
              {user.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              buttonName="Update Profile"
              type="submit"
              loading={isSubmitting}
            />
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-medium">{user.uid}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Auth Provider</p>
            <p className="font-medium">{user.authProvider}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Subscribed</p>
            <p className="font-medium">
              {user.isSubscribedUser ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfilePage;
