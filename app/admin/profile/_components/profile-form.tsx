"use client";

import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";

interface ProfileFormProps {
  formData: {
    fullName: string;
    email: string;
    profilePic: File | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      profilePic: File | null;
    }>
  >;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

const ProfileForm = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
  );
};

export default ProfileForm;
