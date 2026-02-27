import { Metadata } from "next";
import { DeletedUserContainer } from "./_components/deleted-user-container";

export const metadata: Metadata = {
  title: "Deleted Users | Yumm AI Admin",
  description: "View records of deleted users",
};

export default function DeleteUsersPage() {
  return <DeletedUserContainer />;
}
