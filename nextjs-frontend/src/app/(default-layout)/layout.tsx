import { ROUTE_PATHS } from "@/components/views/route";
import UserContextProvider from "@/contexts/UserContextProvider";
import { API_PATHS } from "@/services/api/paths";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("accessToken")?.value;

  let user = null;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_API_URL}${API_PATHS.AUTH.ROOT}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    user = data?.user;
  } catch (e) { }

  return <UserContextProvider value={{ user }}>{children}</UserContextProvider>;
}
