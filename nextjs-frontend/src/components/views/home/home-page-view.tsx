"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTE_PATHS } from "../route";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setAccessToken } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

export default function HomePageView() {
  const router = useRouter();

  const { user } = useUserContext();

  return (
    <>
      <div className="mx-auto max-w-[430px] min-h-[100vh] flex flex-col justify-between overflow-hidden">
        <div className="flex justify-end p-[16px] pb-0 bg-[#38c474]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={
                    user?.picture
                      ? user?.picture
                      : "https://github.com/shadcn.png"
                  }
                  alt="provifle"
                />
                <AvatarFallback>
                  {user?.name?.slice(0, 2)?.toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() => {
                  setAccessToken("");
                  localStorage.clear();
                  router.push(ROUTE_PATHS.AUTH.SIGNIN);
                }}
              >
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Image
          src="/images/pages/home-1.png"
          alt="top-nav"
          width={430}
          height={200}
          loading="lazy"
          style={{ margin: "auto" }}
        />
        <div className="flex flex-row gap-[12px] flex-grow my-[32px] pl-[16px] pr-[8px]">
          <div className="flex flex-col">
            <p className="text-emerald-600 font-bold text-[16px]">
              Baru! coba random date di Grab
            </p>

            <p className="text-[12px] leading-0">
              Atur jalan-jalan & makan barengmu bersama orang baru.
            </p>
          </div>

          <Link href={ROUTE_PATHS.GRAB_MATCH.ROOT}>
            <div className="ml-[8px] min-w-[200px] flex flex-row justify-end items-end hover:opacity-80 transition-all duration-300 cursor-pointer">
              <Image
                src="/images/illustration-primary.svg"
                alt="top-nav"
                width={100}
                height={70}
                loading="lazy"
              />
              <div className="w-[120px] flex p-[10px] pl-[20px] pr-[12px] mb-[16px] bg-teal-600 rounded-r-[4px]">
                <p className="text-[16px] text-right font-bold text-white whitespace-nowrap">
                  Grab Match
                </p>
              </div>
            </div>
          </Link>
        </div>
        <Image
          className="pb-[32px]"
          src="/images/pages/home-2.png"
          alt="body"
          width={430}
          height={250}
          loading="lazy"
          style={{ margin: "auto" }}
        />
        <Image
          className="w-full sticky bottom-0"
          src="/images/pages/home-3.png"
          alt="footer"
          width={325}
          height={500}
          loading="lazy"
          style={{ margin: "auto" }}
        />
      </div>

      <Drawer
        open={!!localStorage.getItem("isOpenDrawer")}
        onClose={() => {
          localStorage.clear();
        }}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <Image
              alt="talent"
              src="/images/talent.jpg"
              width={150}
              height={150}
              className="mx-auto rounded-[20px]"
            />

            <p className="text-lg font-semibold leading-none tracking-tight mt-[24px] mb-[8px]">
              Congratulations your date are all set!
            </p>
            <p>
              Lucky them! Get ready for an amazing time and make sure to prepare
              for a memorable experience with Sakikoo in just 8 days away
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
