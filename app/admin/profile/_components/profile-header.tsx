"use client";

interface ProfileHeaderProps {
  user: {
    fullName: string;
    email: string;
    profilePic?: string;
    role: string;
  };
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-6 mb-6 pb-6 border-b">
      <img
        src={user.profilePic || "/next.svg"}
        alt={user.fullName}
        className="w-24 h-24 rounded-full object-cover bg-gray-200"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/next.svg";
        }}
      />
      <div>
        <h2 className="text-2xl font-bold">{user.fullName}</h2>
        <p className="text-gray-600">{user.email}</p>
        <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800">
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
