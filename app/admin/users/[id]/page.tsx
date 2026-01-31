"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUserById } from "@/lib/api";

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchUser(params.id as string);
    }
  }, [params.id]);

  const fetchUser = async (id: string) => {
    try {
      const result = await getUserById(id);
      if (result.success && result.data) {
        setUser(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading user details...</div>;
  }

  if (!user) {
    return <div className="p-8">User not found</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Details</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start gap-8 mb-8">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt={user.fullName}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">User ID</h3>
            <p className="text-gray-900">{user.uid}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Auth Provider
            </h3>
            <p className="text-gray-900">{user.authProvider}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Subscribed
            </h3>
            <p className="text-gray-900">
              {user.isSubscribedUser ? "Yes" : "No"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Created At
            </h3>
            <p className="text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Allergenic Ingredients
            </h3>
            <p className="text-gray-900">
              {user.allergenicIngredients &&
              user.allergenicIngredients.length > 0
                ? user.allergenicIngredients.join(", ")
                : "None"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/admin/users/${user._id}/edit`)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
