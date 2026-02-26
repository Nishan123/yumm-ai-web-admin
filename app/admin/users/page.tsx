import { Metadata } from "next";
import { UserContainer } from "./_components/user-container";

export const metadata: Metadata = {
  title: "Manage Users | Yumm AI Admin",
  description: "Manage out application users from the admin panel",
};

export default function AdminUsersPage() {
  return <UserContainer />;
}
