"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserData, clearAuthData, setUserData } from "@/lib/api";
import { handleUpdateProfile } from "@/lib/actions";
import ProfileHeader from "./_components/profile-header";
import ProfileForm from "./_components/profile-form";
import AccountInfo from "./_components/account-info";
import LogoutButton from "./_components/logout-button";

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

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    const result = await handleUpdateProfile(user.uid, data);

    if (result.success) {
      alert("Profile updated successfully!");
      const updatedUser = { ...user, ...result.data };
      setUserData(updatedUser);
      setUser(updatedUser);
    } else {
      alert(result.message || "Failed to update profile");
    }

    setIsSubmitting(false);
  };

  const onLogout = () => {
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
        <ProfileHeader user={user} />
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      <AccountInfo user={user} />
      <LogoutButton onLogout={onLogout} />
    </div>
  );
};

export default AdminProfilePage;
