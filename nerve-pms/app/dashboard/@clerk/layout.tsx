"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import {
    Bell,
    CircleUser,
    Home,
    Menu,
    Search,
    Calendar,
    FileText,
    Clipboard,
    Brain,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { signOut } from "next-auth/react";


const DashboardLayout = ({ children }: { children: ReactNode }) => {

    const pathname = usePathname();
    const logOut = () => {
        signOut();
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Brain className="h-6 w-6" />
                            <span className="text-xl antialiased">NERVE</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start lg:space-y-2 px-2 lg:py-6 py-2 text-lg font-medium lg:px-4">
                            <Link
                                href="/dashboard/home"
                                className={`flex items-center gap-3 rounded-lg antialiased px-3 lg:py-3 py-2 transition-all ${pathname == "/dashboard/home" ||
                                        pathname == "/dashboard/add-existing-user" ||
                                        pathname == "/dashboard/add-new-user" ||
                                        pathname == "/dashboard/add-patient-history" ||
                                        pathname == "/dashboard/add-patient-vitals" ||
                                        pathname == "/dashboard/add-followup"
                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "text-primary"}`}
                            >
                                <Home className="h-5 w-5" />
                                Dashboard
                            </Link>

                            <Link
                                href="/dashboard/records"
                                className={`flex items-center gap-3 rounded-lg antialiased px-3 lg:py-3 py-2 transition-all ${pathname.startsWith("/dashboard/records") ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "text-primary`"}`}
                            >
                                <FileText className="h-5 w-5" />
                                Records
                            </Link>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium space-y-2">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Brain className="h-6 w-6" />
                                    <span className="sr-only">NERVE</span>
                                </Link>
                                <Link
                                    href="/doctor/dashboard/patient"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname == "/doctor/dashboard/patient" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "text-primary`"}`}
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/doctor/records"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname == "/doctor/records" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "text-primary hover:bg-gray-500`"}`}
                                >
                                    <FileText className="h-5 w-5" />
                                    Records
                                </Link>
                                <Link
                                    href="/doctor/calendar"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname == "/doctor/calendar" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "text-primary`"}`}
                                >
                                    <Calendar className="h-5 w-5" />
                                    Calendar
                                    <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full background-pink hover:bg-[#f05c75]">
                                        6
                                    </Badge>
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search records..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                            {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
        // </RoleGate>
    );
};

export default DashboardLayout;
