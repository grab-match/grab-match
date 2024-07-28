"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ROUTE_PATHS } from "../route";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useUserContext } from "@/contexts/UserContextProvider";

const OpenStreetMap = dynamic(() => import("@/components/shared/Map"), {
  ssr: false,
});
const ImageCapture = dynamic(
  () => import("@/components/shared/CameraCaputre"),
  {
    ssr: false,
  }
);

export default function GrabMatchPreferencesPageView() {
  const { user } = useUserContext();

  const [location, setLocation] = useState<any>(
    localStorage.getItem("location") ?? null
  );
  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const handleLocationSelect = async (latlng: any) => {
    setLocation(latlng);

    const address = await getAddressFromLatLng(latlng.lat, latlng.lng);
    setAddress(address);
  };

  const handleCapture = (capturedImage: string) => {
    setImage(capturedImage);
  };

  const getAddressFromLatLng = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    if (data) {
      localStorage.setItem("location", JSON.stringify({ lat, lng }));
    }
    return data.display_name;
  };

  return (
    <div className="mx-auto max-w-[430px] min-h-[100vh] flex flex-col overflow-hidden">
      <div className="flex flex-row justify-between bg-emerald-100 p-[16px] relative">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <Link href={ROUTE_PATHS.GRAB_MATCH.ROOT}>
              <Button variant="ghost" className="!w-fit !p-[8px] ml-[12px]">
                <Icon
                  icon="ic:round-arrow-back-ios-new"
                  className="text-teal-900"
                />
              </Button>
            </Link>
            <p className="text-[18px] text-teal-900 font-bold text-center">
              Set preferences
            </p>
          </div>
          <p className="max-w-[220px] text-[14px] text-teal-900 font-semibold ml-[16px]">
            Atur lokasi sampai kesukaanmu agar lebih mudah dan cepat dalam
            mencari GrabMatch!
          </p>
        </div>

        <Image
          alt="illustration"
          src="/images/illustration-primary.svg"
          width={130}
          height={130}
          className="absolute top-[30px] right-[16px] z-10"
        />
      </div>

      <div className="mt-[24px] px-[32px]">
        <h1 className="text-2xl text-teal-600 font-semibold my-[24px]">
          Hello <b>{user?.name || ""}</b>, <br />
          ready to match?
        </h1>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-teal-900 mb-2">
            What are you looking for?
          </h2>
          <div className="flex items-center bg-green-500 text-white p-2 rounded mb-4">
            <Icon
              icon="fluent:calendar-sync-20-regular"
              className="h-6 w-6 mr-2"
            />
            <span>Sunday, 28 July 2024</span>
          </div>
        </div>

        {/* Pickup Point */}
        <div className="mb-[24px]">
          <h2 className="text-xl font-bold text-teal-900 mb-2">Pickup Point</h2>
          <OpenStreetMap onLocationSelect={handleLocationSelect} />
          {location && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-teal-900">
                Selected Location
              </h3>
              <p className="text-teal-600">{address}</p>
            </div>
          )}
        </div>

        {/* Image Capture */}
        <div className="mb-[24px]">
          <div className="flex flex-row items-center justify-between border-[1px] border-solid border-teal-900 rounded-[8px] p-[8px]">
            <h2 className="text-xl font-bold text-teal-900">Recent Face</h2>
            <ImageCapture onCapture={handleCapture} />
          </div>
          {image && (
            <div>
              <img src={image} alt="Captured" className="w-full h-auto mt-2" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="mb-[24px]">
          <h2 className="text-xl font-bold text-teal-900 mb-2">
            Looks like you need to save your personal info first
          </h2>
          <p>This help your match candidate know you better</p>
          <div className="bg-white p-4 rounded shadow mb-4">
            <span className="font-bold text-teal-900">About me</span>
            <p className="text-teal-600">{user?.about || "-"}</p>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-[24px]">
          <h2 className="text-xl font-bold text-teal-900 mb-2">Interests</h2>
          <p className="text-teal-600">{user?.interests || "-"}</p>
        </div>

        {/* Save & Matchmaking */}
        <Link className="w-full" href={ROUTE_PATHS.SHOWSWIPE}>
          <Button className="bg-green-500 text-white w-full py-2 rounded mb-2">
            Save & Matchmaking
          </Button>
        </Link>
      </div>
    </div>
  );
}
