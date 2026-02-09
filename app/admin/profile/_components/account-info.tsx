"use client";

interface AccountInfoProps {
  user: {
    uid: string;
    authProvider: string;
    createdAt: string;
    isSubscribedUser: boolean;
  };
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
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
          <p className="font-medium">{user.isSubscribedUser ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
