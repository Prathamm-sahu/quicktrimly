"use client"

import axios from "axios";
import { Dashboard, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

async function getData(): Promise<Dashboard[]> {
  // Fetch data from API here.
  const userId = localStorage.getItem("userID")
  const { data } = await axios.get(`/api/tinyurl/getAllUrls?userId=${userId}`)
  
  return data.allUrl;
}

export default function DemoPage() {
  const [data, setData] = useState<Dashboard[]>([]);

  const getAllData = async () => {
    const fetchedData = await getData();
    setData(fetchedData);
  }
  
  useEffect(() => {
    getAllData()
  }, [])

  return (
    <div className=" pl-52 pr-52 pt-28 space-y-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
