"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  BarChart,
  ChefHat,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Icon,
  Bug,
} from "lucide-react";
import { getUserData } from "@/lib/api";
import path from "path";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  const menuItems = [
    { name: "Home", icon: Home, path: "/admin" },
    { name: "Analytics", icon: BarChart, path: "/admin/analytics" },
    { name: "Recipes", icon: ChefHat, path: "/admin/recipes" },
    { name: "Users", icon: Users, path: "/admin/users" },

    {
      name: "Push Notification",
      icon: Bell,
      path: "/admin/push-notification",
    },
    {
      name: "Bug Reports",
      icon: Bug,
      path: "/admin/bug-reports",
    },
    { name: "Deleted Users", icon: Users, path: "/admin/delete-users" },
  ];

  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? "80px" : "260px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 flex flex-col relative"
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4">
        {!isCollapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Yumm AI
          </motion.h1>
        )}
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl mx-auto"
          >
            🍳
          </motion.div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium text-sm"
                >
                  {item.name}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Section at Bottom */}
      <div className="border-t border-gray-200 dark:border-zinc-800 p-3">
        {user && (
          <button
            onClick={() => router.push("/admin/profile")}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200`}
          >
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
            ) : (
              <UserCircle className="w-8 h-8 shrink-0 text-gray-700 dark:text-gray-300" />
            )}
            {!isCollapsed && (
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            )}
          </button>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </motion.div>
  );
};

export default Sidebar;
