"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { userDetail, userMatchPercentage } from "@/services/api/auth";
import { Skeleton } from "@/components/ui/skeleton";

export function ShowSwipePage() {
  const [page, setPage] = useState("YourSet");
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["user", "22"],
    queryFn: async () => await userDetail("22"),
  });

  const { isFetching: isFetchingMatch, data: responseMatch } = useQuery({
    queryKey: ["user-match", "22"],
    queryFn: async () => await userMatchPercentage("22"),
  });

  const user = data?.data;
  const userMatch = responseMatch?.data;

  return (
    <section className=" mx-auto max-w-[430px] py-3">
      <div className=" flex flex-col overflow-auto gap-2 flex flex-col">
        <div className="flex justify-center items-center gap-2.5">
          <Button
            onClick={() => setPage("YourSet")}
            className={
              page === "YourSet"
                ? "bg-[#1E938B] text-white hover:text-white"
                : "bg-[#F7F7F7] text-dark hover:text-white"
            }
          >
            Your Set
          </Button>
          <Button
            onClick={() => setPage("PeopleForYou")}
            className={
              page === "PeopleForYou"
                ? "bg-[#1E938B] text-white hover:text-white"
                : "bg-[#F7F7F7] text-dark hover:text-white"
            }
          >
            People For You
          </Button>
        </div>
        {page === "YourSet" && (
          <div className="flex bg-[#F7F7F7] rounded-xl pr-3 pl-1 py-0.5">
            <Icon
              icon="fluent:calendar-sync-20-regular"
              className="h-6 w-6 mr-2"
            />
            <span>Sunday, 28 July 2024</span>
          </div>
        )}
        <p className="font-bold">Basic filter based your Preferences</p>
        <div className="flex gap-1.5">
          <button className="bg-[#F7F7F7] p-1.5  rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 18.6049C22 18.8038 21.921 18.9946 21.7803 19.1353C21.6397 19.2759 21.4489 19.3549 21.25 19.3549H16.15C15.983 19.9778 15.6151 20.5282 15.1034 20.9207C14.5918 21.3132 13.9649 21.526 13.32 21.526C12.6751 21.526 12.0482 21.3132 11.5366 20.9207C11.0249 20.5282 10.657 19.9778 10.49 19.3549H2.75C2.55109 19.3549 2.36032 19.2759 2.21967 19.1353C2.07902 18.9946 2 18.8038 2 18.6049C2 18.406 2.07902 18.2153 2.21967 18.0746C2.36032 17.9339 2.55109 17.8549 2.75 17.8549H10.49C10.657 17.2321 11.0249 16.6817 11.5366 16.2892C12.0482 15.8966 12.6751 15.6839 13.32 15.6839C13.9649 15.6839 14.5918 15.8966 15.1034 16.2892C15.6151 16.6817 15.983 17.2321 16.15 17.8549H21.25C21.4489 17.8549 21.6397 17.9339 21.7803 18.0746C21.921 18.2153 22 18.406 22 18.6049ZM22 5.39493C22 5.59384 21.921 5.78461 21.7803 5.92526C21.6397 6.06591 21.4489 6.14493 21.25 6.14493H18.8C18.633 6.76781 18.2651 7.31817 17.7534 7.7107C17.2418 8.10323 16.6149 8.31598 15.97 8.31598C15.3251 8.31598 14.6982 8.10323 14.1866 7.7107C13.6749 7.31817 13.307 6.76781 13.14 6.14493H2.75C2.65151 6.14493 2.55398 6.12553 2.46299 6.08784C2.37199 6.05015 2.28931 5.9949 2.21967 5.92526C2.15003 5.85562 2.09478 5.77294 2.05709 5.68194C2.0194 5.59095 2 5.49342 2 5.39493C2 5.29644 2.0194 5.19891 2.05709 5.10792C2.09478 5.01692 2.15003 4.93424 2.21967 4.8646C2.28931 4.79496 2.37199 4.73971 2.46299 4.70202C2.55398 4.66433 2.65151 4.64493 2.75 4.64493H13.14C13.307 4.02205 13.6749 3.47169 14.1866 3.07916C14.6982 2.68663 15.3251 2.47388 15.97 2.47388C16.6149 2.47388 17.2418 2.68663 17.7534 3.07916C18.2651 3.47169 18.633 4.02205 18.8 4.64493H21.25C21.3489 4.64359 21.447 4.66207 21.5386 4.69928C21.6302 4.73649 21.7134 4.79169 21.7833 4.8616C21.8532 4.93152 21.9084 5.01473 21.9457 5.10633C21.9829 5.19794 22.0013 5.29607 22 5.39493ZM22 11.9949C22.0013 12.0938 21.9829 12.1919 21.9457 12.2835C21.9084 12.3751 21.8532 12.4583 21.7833 12.5283C21.7134 12.5982 21.6302 12.6534 21.5386 12.6906C21.447 12.7278 21.3489 12.7463 21.25 12.7449H9.55C9.38296 13.3678 9.01509 13.9182 8.50342 14.3107C7.99176 14.7032 7.36489 14.916 6.72 14.916C6.07511 14.916 5.44824 14.7032 4.93658 14.3107C4.42491 13.9182 4.05704 13.3678 3.89 12.7449H2.75C2.55109 12.7449 2.36032 12.6659 2.21967 12.5253C2.07902 12.3846 2 12.1938 2 11.9949C2 11.796 2.07902 11.6053 2.21967 11.4646C2.36032 11.3239 2.55109 11.2449 2.75 11.2449H3.89C4.05704 10.6221 4.42491 10.0717 4.93658 9.67916C5.44824 9.28663 6.07511 9.07388 6.72 9.07388C7.36489 9.07388 7.99176 9.28663 8.50342 9.67916C9.01509 10.0717 9.38296 10.6221 9.55 11.2449H21.25C21.4489 11.2449 21.6397 11.3239 21.7803 11.4646C21.921 11.6053 22 11.796 22 11.9949Z"
                fill="#424242"
              />
            </svg>
          </button>
          <button className="bg-[#F7F7F7] p-1.5 rounded-2xl">Terdekat</button>
          <button className="bg-[#F7F7F7] p-1.5 rounded-2xl">
            Best Fit &gt; 75
          </button>
          <button className="bg-[#F7F7F7] p-1.5 rounded-2xl">
            90{`'`}s Kid
          </button>
        </div>
        <div
          className="flex-grow p-2 py-3 bg-white h-[560px] flex-wrap w-full flex flex-col content-end justify-between text-white"
          style={{
            backgroundImage: `url(${user?.picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isFetchingMatch ? (
            <Skeleton className="rounded-full w-16 h-16 self-end" />
          ) : (
            <div className="flex-col bg-[#1E938B] w-16 h-16 rounded-full self-end border border-4 border-[#39AAA2] flex justify-center items-center">
              <p className="text-white font-bold text-center">
                {userMatch?.matchPercentage}%
              </p>
            </div>
          )}

          <div className="w-full">
            <div className="flex flex-col justify-start items-start">
              <p className="bg-[#39AAA2] rounded-full text-[12px] p-1 mb-1">
                New here
              </p>
              <p className="font-bold text-xl">
                {user?.name}, {user?.age}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <div className="bg-[#67AD98] w-[46px] h-[46px] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M15 0C23.28 0 30 6.72 30 15C30 23.28 23.28 30 15 30C6.72 30 0 23.28 0 15C0 6.72 6.72 0 15 0ZM6 17.955H13.5L10.11 14.565C10.8051 13.7475 11.6694 13.0908 12.6432 12.6402C13.617 12.1895 14.677 11.9558 15.75 11.955C19.305 11.955 22.275 14.445 23.04 17.775L24.48 17.295C23.52 13.365 19.98 10.455 15.75 10.455C13.08 10.455 10.695 11.64 9.045 13.5L6 10.455V17.955Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div
                onClick={() => router.push("/chat")}
                className="bg-[#1E938B] p-2 rounded-full flex items-center justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M15 28.125C23.2838 28.125 30 22.2487 30 15C30 7.75125 23.2838 1.875 15 1.875C6.71625 1.875 0 7.75125 0 15C0 18.3 1.39313 21.3188 3.69375 23.625C3.51188 25.53 2.91188 27.6187 2.24813 29.1862C2.1 29.535 2.38688 29.925 2.76 29.865C6.99 29.1713 9.50437 28.1063 10.5975 27.5513C12.0333 27.9356 13.5136 28.1285 15 28.125ZM15 11.2369C18.12 8.02875 25.9219 13.6425 15 20.8594C4.07813 13.6406 11.88 8.02875 15 11.2369Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-white rounded text-black p-1.5">
              <p>What are you looking for?</p>
              <p>
                <b>{user?.shortBio}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="p-2 flex gap-2 flex-col">
          <div>
            {isFetchingMatch ? (
              <div className="flex flex-col gap-[4px] mb-[8px]">
                <Skeleton className="w-[30px] h-[24px]" />
                <Skeleton className="w-full h-[24px]" />
                <Skeleton className="w-full h-[24px]" />
              </div>
            ) : (
              <>
                <p className="font-bold">
                  {userMatch?.matchPercentage >= 50
                    ? "You're Match!"
                    : "Maybe, Skip!"}
                </p>
                <p className="pb-2">{userMatch?.reason}</p>
              </>
            )}
            <div className="">
              <p className="font-bold">About me</p>
              <p className="pb-2">{user?.about}</p>
            </div>
            <div className="">
              <p className="font-bold">About me</p>
              <p className="pb-2">{user?.about}</p>
            </div>
            <p className="font-bold">Interests</p>
            <p className="pb-2">{user?.interests}</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-content-start items-start">
                <p className="font-bold">Favorite interest</p>
                <p className="bg-[#F7F7F7] p-1 rounded-2xl">Philosphy</p>
              </div>
              <hr />
              <div className="flex gap-1.5">
                <p className="bg-[#F7F7F7] p-1 rounded-2xl">Cafe-hopping</p>
                <p className="bg-[#F7F7F7] p-1 rounded-2xl">Comedy</p>
                <p className="bg-[#F7F7F7] p-1 rounded-2xl">Rock</p>
                <p className="bg-[#F7F7F7] p-1 rounded-2xl">Coffee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
