"use server";

import Link from "next/link";

import {
  File,
  ListFilter,
  MoreHorizontal,
  UserRound,
  PlusCircle,
  Trash2Icon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { getPatients } from "@/data/get-patient-info"
import { deletePatientRecord } from "@/actions/delete-patient-record";
import DeletePatientIcon from "@/components/delete-patient-icon";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Patient {
  name: string;
  city: string;
  phone: string | null;
  patientStatus: string;
  lastUpdate: Date;
  lastVisit: Date | null;
  id: string;
}

const RecordsPage = async () => {

  const patients: Patient[] = await getPatients();

  const onDelete = (name: string) => {
    deletePatientRecord(name);
  }

  return (
    <div className="grid gap-y-8">
      <div>
        <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Patient&apos;s Records </h2>
      </div>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all" className="relative mr-auto w-full">
          <div className="flex flex-row" >
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger value="all" className="relative data-[state=active]:bg-none rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none " >All</TabsTrigger>
              <TabsTrigger value="active" className="relative data-[state=active]:bg-none rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none " >Recent</TabsTrigger>
              <TabsTrigger value="recent" className="relative data-[state=active]:bg-none rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none " >Active</TabsTrigger>
              <TabsTrigger value="archived" className="relative data-[state=active]:bg-none rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none ">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Recent
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Archived
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-7 gap-1 my-button-blue">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add New Record
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>List of Patients</CardTitle>
                <CardDescription>
                  Manage your patient records with ease.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Last Visit
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Last Update
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.name}>
                        <TableCell className="hidden sm:table-cell">
                          <Avatar className="hidden h-12 w-12 sm:flex">
                            <AvatarImage src="missing.png" alt="Avatar" />
                            <AvatarFallback>
                              <UserRound />
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium hover:underline">
                          <Link href={`/dashboard/records/view-patient-record/${patient.id}`}>
                            {patient.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {/* <Badge variant="outline">Recent</Badge> */}
                          {patient.city}
                        </TableCell>
                        <TableCell>
                          {/* <Badge variant="outline">Recent</Badge> */}
                          {patient.phone}
                        </TableCell>
                        <TableCell>
                          <Badge variant={patient.patientStatus === 'ACTIVE' ? 'default' : 'destructive'}>
                            {patient.patientStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {patient.lastVisit?.toLocaleDateString() ?? "N/A"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {patient.lastUpdate.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {/* TODO */}
                          <DeletePatientIcon patientName={patient.name} />
                        </TableCell>
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

    </div>
  )
}

export default RecordsPage