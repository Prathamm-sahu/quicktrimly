"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { toast } from "sonner"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Dashboard = {
  id: string
  originalUrl: string
  tinyUrl: string
  totalVists: number
}

const deleteUrl = async (shortUrl: string) => {
  try {
    await axios.delete(`/api/tinyurl/delete?miniUrl=${shortUrl}`)
    toast.success("Url Deleted Successfull")
  } catch (error: any) {
    toast.error(error.messsage)
  }
} 

 
export const columns: ColumnDef<Dashboard>[] = [
  {
    accessorKey: "originalUrl",
    header: "Original Url",
  },
  {
    accessorKey: "tinyUrl",
    header: "Tiny Url",
  },
  {
    accessorKey: "totalVists",
    header: "Total Visits",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dashboard = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => deleteUrl(dashboard.tinyUrl)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
