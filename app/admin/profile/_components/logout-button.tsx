"use client";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button
        onClick={onLogout}
        className="w-full py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
