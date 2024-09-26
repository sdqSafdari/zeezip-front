"use client"
import UserDataTable from "@/app/UserDataTable";
import {useState} from "react";

export default function Home() {
    const [re, setRe] = useState(0);
  return (
      <>
          <h2>Hello Project! </h2>
          <UserDataTable key={re}/>
          <button className="border" onClick={() => setRe(re+1)}>refresh</button>
      </>
  );
}
