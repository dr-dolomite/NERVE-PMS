"use client";
import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  UserRound,
  Activity,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import { useCurrentUser } from "@/hooks/use-current-user";


const Dashboard = ({ children }: { children: ReactNode }) => {

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const day = currentDate.toLocaleString('default', { weekday: 'long' });
  const year = currentDate.getFullYear();
  const dayOfMonth = currentDate.getDate();
  const user = useCurrentUser();
  

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col items-start">
          <h2 className="text-gray font-medium 2xl:text-lg text-md antialiased">
            Hi Doc {user?.name},
          </h2>
          <h1 className="text-primary font-semibold 2xl:text-2xl text-xl antialiased">
            Welcome Back!
          </h1>
        </div>

        <div className="flex flex-col items-end">
          <h2 className="text-gray font-medium 2xl:text-lg text-md  antialiased">
            Today is
          </h2>
          <h1 className="text-primary font-medium 2xl:text-lg text-md antialiased">
            {day} {month} {dayOfMonth}, {year}
          </h1>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0" className="rounded-xl">
          <div className="flex flex-row py-2 px-4 items-center">
            <div className="bg-[#D4F7F9] w-20 h-20 rounded-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" viewBox="0 0 22 40" fill="none">
                <path d="M6.25 15.5177V38.125C6.25 39.1605 7.08947 40 8.125 40C9.16053 40 10 39.1605 10 38.125V26.25C10 25.5596 10.5596 25 11.25 25C11.9404 25 12.5 25.5596 12.5 26.25V38.125C12.5 39.1605 13.3395 40 14.375 40C15.4105 40 16.25 39.1605 16.25 38.125V16.875C16.25 16.5298 16.5298 16.25 16.875 16.25C17.2202 16.25 17.5 16.5298 17.5 16.875L17.5 23.125C17.5 24.1605 18.3395 25 19.375 25C20.4105 25 21.25 24.1605 21.25 23.125L21.25 16.25C21.25 12.1079 17.8909 8.75 13.7487 8.75H6.8389C6.45079 8.75 6.06927 8.65964 5.72214 8.48607L4.8959 8.07295C4.19362 7.72181 3.75 7.00402 3.75 6.21885V1.875C3.75 0.839466 2.91053 0 1.875 0C0.839466 0 0 0.839466 0 1.875V7.08209C0 8.87038 1.01035 10.5052 2.60983 11.305L5 12.5001C5.80036 13.3004 6.25 14.3859 6.25 15.5177Z" fill="url(#paint0_linear_100_1334)" />
                <path d="M11.25 7.5C13.3211 7.5 15 5.82107 15 3.75C15 1.67893 13.3211 0 11.25 0C9.17893 0 7.5 1.67893 7.5 3.75C7.5 5.82107 9.17893 7.5 11.25 7.5Z" fill="url(#paint1_linear_100_1334)" />
                <defs>
                  <linearGradient id="paint0_linear_100_1334" x1="0" y1="0" x2="21.4286" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_100_1334" x1="0" y1="0" x2="21.4286" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="2xl:text-lg text-sm font-medium text-gray antialiased">
                  Patients Today
                </CardTitle>
                <CardTitle className="2xl:text-4xl text-2xl font-semibold mt-2 antialiased">
                  12 / 15
                </CardTitle>
              </CardHeader>

            </div>
          </div>
        </Card>

        <Card x-chunk="dashboard-01-chunk-1" className="rounded-xl">
          <div className="flex flex-row py-2 px-4 items-center">
            <div className="bg-[#D4F7F9] w-20 h-20 rounded-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M27.5 16.25C27.5 15.5596 28.0596 15 28.75 15H31.25C31.9404 15 32.5 15.5596 32.5 16.25V18.75C32.5 19.4404 31.9404 20 31.25 20H28.75C28.0596 20 27.5 19.4404 27.5 18.75V16.25Z" fill="url(#paint0_linear_100_1340)" />
                <path d="M20 16.25C20 15.5596 20.5596 15 21.25 15H23.75C24.4404 15 25 15.5596 25 16.25V18.75C25 19.4404 24.4404 20 23.75 20H21.25C20.5596 20 20 19.4404 20 18.75V16.25Z" fill="url(#paint1_linear_100_1340)" />
                <path d="M7.5 23.75C7.5 23.0596 8.05964 22.5 8.75 22.5H11.25C11.9404 22.5 12.5 23.0596 12.5 23.75V26.25C12.5 26.9404 11.9404 27.5 11.25 27.5H8.75C8.05964 27.5 7.5 26.9404 7.5 26.25V23.75Z" fill="url(#paint2_linear_100_1340)" />
                <path d="M15 23.75C15 23.0596 15.5596 22.5 16.25 22.5H18.75C19.4404 22.5 20 23.0596 20 23.75V26.25C20 26.9404 19.4404 27.5 18.75 27.5H16.25C15.5596 27.5 15 26.9404 15 26.25V23.75Z" fill="url(#paint3_linear_100_1340)" />
                <path d="M8.75 0C9.44036 0 10 0.559644 10 1.25V2.5H30V1.25C30 0.559644 30.5596 0 31.25 0C31.9404 0 32.5 0.559644 32.5 1.25V2.5H35C37.7614 2.5 40 4.73858 40 7.5V35C40 37.7614 37.7614 40 35 40H5C2.23858 40 0 37.7614 0 35V7.5C0 4.73858 2.23858 2.5 5 2.5H7.5V1.25C7.5 0.559644 8.05964 0 8.75 0ZM2.5 10V35C2.5 36.3807 3.61929 37.5 5 37.5H35C36.3807 37.5 37.5 36.3807 37.5 35V10H2.5Z" fill="url(#paint4_linear_100_1340)" />
                <defs>
                  <linearGradient id="paint0_linear_100_1340" x1="0" y1="0" x2="13.5532" y2="47.6224" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_100_1340" x1="0" y1="0" x2="13.5532" y2="47.6224" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_100_1340" x1="0" y1="0" x2="13.5532" y2="47.6224" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_100_1340" x1="0" y1="0" x2="13.5532" y2="47.6224" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                  <linearGradient id="paint4_linear_100_1340" x1="0" y1="0" x2="13.5532" y2="47.6224" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="2xl:text-lg text-sm font-medium text-gray antialiased">
                  Scheduled
                </CardTitle>
                <CardTitle className="2xl:text-4xl text-2xl font-semibold mt-2 antialiased">
                  5
                </CardTitle>
              </CardHeader>

            </div>
          </div>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2" className="rounded-xl">
          <div className="flex flex-row py-2 px-4 items-center">
            <div className="bg-[#D4F7F9] w-20 h-20 rounded-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M35 2.5H5C2.23858 2.5 0 4.73858 0 7.5C0 10.2614 2.23858 12.5 5 12.5L5 32.5C5 35.2614 7.23857 37.5 10 37.5H30C32.7614 37.5 35 35.2614 35 32.5V12.5C37.7614 12.5 40 10.2614 40 7.5C40 4.73858 37.7614 2.5 35 2.5ZM7.5 32.5L7.5 7.5H22.5V35H10C8.61929 35 7.5 33.8807 7.5 32.5ZM27.5 7.5L27.5 35H30C31.3807 35 32.5 33.8807 32.5 32.5V7.5H27.5Z" fill="url(#paint0_linear_100_1346)" />
                <defs>
                  <linearGradient id="paint0_linear_100_1346" x1="0" y1="2.5" x2="10.5622" y2="44.9144" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F80ED" />
                    <stop offset="1" stopColor="#1EBDD2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="2xl:text-lg text-sm font-medium text-gray antialiased">
                  Payment
                </CardTitle>
                <CardTitle className="2xl:text-4xl text-2xl font-semibold mt-2 antialiased">
                  ₱ 500
                </CardTitle>
              </CardHeader>

            </div>
          </div>
        </Card>
      </div>

      <div className="lg:mt-6 mt-4">
        <h1 className="text-xl font-semibold tracking-tight sm:grow-0 mb-4">
          Current Patient
        </h1>
        <Card x-chunk="dashboard-01-chunk-3" className="rounded-xl bg-white p-6 pt-8" >
          <CardContent className="2xl:grid 2xl:grid-cols-4 2xl:grid-flow-row flex flex-col gap-y-12 gap-6">
            <div className="lg:flex lg:flex-col lg:gap-y-8 flex flex-col 2xl:gap-4 gap-8">
              <div className="flex items-center gap-4 2xl:row-span-1">
                <Avatar className="hidden h-20 w-20 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="xl:text-2xl text-xl font-bold leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-md text-muted-foreground">
                    Patient ID: 123456
                  </p>
                </div>
              </div>

              <div className="2xl:row-span-4 2xl:text-md text-sm 2xl:mt-6">
                <ul className="text-dark-blue font-semibold xl:text-base text-md 2xl:leading-5 leading-4 grid 2xl:grid-cols-1 grid-cols-2 gap-4 grid-flow-row">
                  {/* <li>Status: <span className="text-muted-foreground font-normal ml-3">New Patient</span></li> */}
                  <li>Age: <span className="text-muted-foreground font-normal ml-3">25</span></li>
                  <li>Sex: <span className="text-muted-foreground font-normal ml-3">Female</span></li>
                  <li>City: <span className="text-muted-foreground font-normal ml-3">Iloilo City</span></li>
                  <li>Birthday: <span className="text-muted-foreground font-normal ml-3">January 1, 1996</span></li>
                  <li>Civil Status: <span className="text-muted-foreground font-normal ml-3">Single</span></li>
                  <li>Occupation: <span className="text-muted-foreground font-normal ml-3">Developer</span></li>
                  <li>Handedness: <span className="text-muted-foreground font-normal ml-3">Right</span></li>
                  <li>Religion: <span className="text-muted-foreground font-normal ml-3">Roman Catholic</span></li>
                  <li className="mt-6">Last Visit: <span className="text-muted-foreground font-normal ml-3">January 1, 2022</span></li>
                  <li>Next Visit: <span className="text-muted-foreground font-normal ml-3">January 1, 2023</span></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col 2xl:col-span-3 gap-6">
              <div className="grid md:grid-cols-2 md:gap-8 2xl:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-4" className="rounded-xl bg-[#EEFCFD]">
                  <CardHeader className="text-center">
                    <CardTitle className="text-md font-medium">
                      Heart Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row items-center justify-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" fill="none">
                      <path d="M2.94902 18C5.40472 21.6818 9.55714 25.7428 16 30C22.4429 25.7428 26.5953 21.6818 29.051 18H24C23.5911 18 23.2234 17.751 23.0715 17.3714L20.1579 10.0874L16.9615 21.2747C16.844 21.6859 16.4781 21.9769 16.0511 21.9987C15.624 22.0205 15.2303 21.7684 15.0715 21.3714L11.7775 13.1365L8.83205 17.5547C8.64658 17.8329 8.33435 18 8 18H2.94902Z" fill="url(#paint0_linear_100_1398)" />
                      <path d="M1.75828 16C-4.85274 3.36074 8.82028 -3.99897 15.6486 2.28617C15.7679 2.39594 15.8851 2.50987 16 2.62801C16.1149 2.50988 16.2321 2.39595 16.3513 2.28618C23.1797 -3.99899 36.8527 3.36073 30.2417 16H24.677L20.9285 6.62861C20.7697 6.23158 20.376 5.97946 19.9489 6.00131C19.5219 6.02315 19.156 6.31412 19.0385 6.72528L15.8421 17.9126L12.9285 10.6286C12.7906 10.2838 12.4729 10.0438 12.1036 10.0054C11.7342 9.96692 11.3739 10.1363 11.1679 10.4453L7.46482 16H1.75828Z" fill="url(#paint1_linear_100_1398)" />
                      <defs>
                        <linearGradient id="paint0_linear_100_1398" x1="0" y1="0" x2="9.61688" y2="36.0438" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2F80ED" />
                          <stop offset="1" stopColor="#1EBDD2" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_100_1398" x1="0" y1="0" x2="9.61688" y2="36.0438" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2F80ED" />
                          <stop offset="1" stopColor="#1EBDD2" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex flex-row items-center">
                      <div className="text-3xl font-semibold">80</div>
                      <div className="text-muted-foreground text-sm ml-1">bpm</div>
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-01-chunk-5" className="rounded-xl bg-[#EEFCFD]">
                  <CardHeader className="text-center">
                    <CardTitle className="text-md font-medium">
                      Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row items-center justify-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" fill="none">
                      <g clipPath="url(#clip0_100_1417)">
                        <path d="M15.8 -2.86102e-06C19.2276 -2.86102e-06 22.0258 2.69435 22.1922 6.08032L22.2 6.39971L22.2016 17.1648L22.2903 17.257C23.5637 18.6462 24.3647 20.4115 24.5557 22.3134L24.5888 22.7546L24.6 23.2C24.6 28.0602 20.6602 32 15.8 32C10.9399 32 7.00003 28.0602 7.00003 23.2C7.00003 21.112 7.7327 19.1395 9.02571 17.5824L9.3113 17.2552L9.39843 17.1632L9.40003 6.4C9.40003 3.08305 11.9234 0.355453 15.1551 0.0320932L15.4807 0.0078371L15.8 -2.86102e-06ZM15.8 3.2C14.113 3.2 12.7309 4.5054 12.6088 6.16123L12.6 6.40006L12.5996 18.549L12.0668 19.0259C10.8858 20.083 10.2 21.5843 10.2 23.2C10.2 26.2928 12.7072 28.8 15.8 28.8C18.8928 28.8 21.4 26.2928 21.4 23.2C21.4 21.7003 20.8092 20.299 19.7799 19.2602L19.5346 19.027L19.0023 18.5501L19 6.4C19 4.63269 17.5674 3.2 15.8 3.2ZM15.8 9.6C16.6837 9.6 17.4 10.3163 17.4 11.2L17.4013 19.5334C18.8133 20.151 19.8 21.5603 19.8 23.2C19.8 25.4091 18.0092 27.2 15.8 27.2C13.5909 27.2 11.8 25.4091 11.8 23.2C11.8 21.5597 12.7874 20.1499 14.2004 19.5326L14.2 11.2C14.2 10.3163 14.9164 9.6 15.8 9.6Z" fill="url(#paint0_linear_100_1417)" />
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_100_1417" x1="7.00003" y1="-2.86102e-06" x2="23.8097" y2="32.4855" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2F80ED" />
                          <stop offset="1" stopColor="#1EBDD2" />
                        </linearGradient>
                        <clipPath id="clip0_100_1417">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="flex flex-row items-center">
                      <div className="text-3xl font-semibold">36</div>
                      <div className="text-muted-foreground text-sm ml-1">c</div>
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-01-chunk-6" className="rounded-xl bg-[#EEFCFD]">
                  <CardHeader className="text-center">
                    <CardTitle className="text-md font-medium">
                      Blood Pressure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row items-center justify-center gap-x-3">

                    <div className="flex flex-row items-center">
                      <div className="text-3xl font-semibold">
                        120/80
                      </div>
                      <div className="text-muted-foreground text-sm ml-1">
                        mmHg
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-01-chunk-7" className="rounded-xl bg-[#EEFCFD]">
                  <CardHeader className="text-center">
                    <CardTitle className="text-md font-medium">
                      Weight
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row items-center justify-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 33 32" fill="none">
                      <g clipPath="url(#clip0_100_1437)">
                        <path d="M28.5556 1H4.44444C2.55 1 1 2.55 1 4.44444V28.5556C1 30.45 2.55 32 4.44444 32H28.5556C30.45 32 32 30.45 32 28.5556V4.44444C32 2.55 30.45 1 28.5556 1ZM16.5 16.5C13.6411 16.5 11.3333 14.1922 11.3333 11.3333C11.3333 8.47444 13.6411 6.16667 16.5 6.16667C19.3589 6.16667 21.6667 8.47444 21.6667 11.3333C21.6667 14.1922 19.3589 16.5 16.5 16.5Z" fill="url(#paint0_linear_100_1437)" />
                        <path d="M14.7778 10.4723H13.0555V12.1945H14.7778V10.4723Z" fill="url(#paint1_linear_100_1437)" />
                        <path d="M17.3612 10.4723H15.639V12.1945H17.3612V10.4723Z" fill="url(#paint2_linear_100_1437)" />
                        <path d="M19.9445 10.4723H18.2223V12.1945H19.9445V10.4723Z" fill="url(#paint3_linear_100_1437)" />
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_100_1437" x1="16.5" y1="1" x2="16.5" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2F80ED" />
                          <stop offset="1" stopColor="#1EBDD2" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_100_1437" x1="13.9167" y1="10.4723" x2="13.9167" y2="12.1945" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2F80ED" />
                          <stop offset="1" stopColor="#1EBDD2" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_100_1437" x1="16.5001" y1="10.4723" x2="16.5001" y2="12.1945" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2F80ED" />
                          <stop offset="1" stopColor="#1EBDD2" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_100_1437" x1="19.0834" y1="10.4723" x2="19.0834" y2="12.1945" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2F80ED" />
                          <stop offset="1" stopColor="#1EBDD2" />
                        </linearGradient>
                        <clipPath id="clip0_100_1437">
                          <rect width="32" height="32" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="flex flex-row items-center">
                      <div className="text-3xl font-semibold">55</div>
                      <div className="text-muted-foreground text-sm ml-1">kg</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {children}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
