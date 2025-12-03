"use client";

import { authClient } from "@/lib/auth-client";
import {
  SidebarBody,
  SidebarBrand,
  SidebarFooter,
  SidebarLink,
  SidebarNav,
  SidebarUser,
  UpgradeProButton,
  NAV_ITEMS,
} from "./components";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Sidebar() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const logOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully logged out");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <SidebarBody>
      <SidebarBrand />

      <SidebarNav title="Main">
        {NAV_ITEMS.map((item) => (
          <SidebarLink key={item.href} {...item} />
        ))}
      </SidebarNav>

      <SidebarFooter>
        <UpgradeProButton />
        <SidebarUser
          name={data?.user.name || "Jon Doe"}
          email={data?.user.email || "jon123@gmail.com"}
          avatar={
            data?.user.image || data?.user.name?.charAt(0).toUpperCase() || "J"
          }
          onLogout={() => logOut()}
        />
      </SidebarFooter>
    </SidebarBody>
  );
}

export default Sidebar;
