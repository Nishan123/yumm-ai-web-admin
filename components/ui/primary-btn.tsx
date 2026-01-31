import React from "react";
import { Loader2 } from "lucide-react";

interface PrimaryBtnProps {
  buttonName: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  buttonName,
  loading = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="bg-black dark:bg-white text-white dark:text-black w-full h-13.5 rounded-[40px] 
      font-medium tracking-wide transition-all duration-200 
      hover:bg-gray-800 dark:hover:bg-gray-200 
      active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
      flex items-center justify-center gap-2"
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {buttonName}
    </button>
  );
};

export default PrimaryBtn;
