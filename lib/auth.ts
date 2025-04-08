import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export function getAuthSession() {
  return getServerSession(authOptions);
}
