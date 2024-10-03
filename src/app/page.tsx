"use client"
import UserDataTable from "@/app/UserDataTable";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient:QueryClient = new QueryClient();
export default function Home() {
    const [re, setRe] = useState(0);
  return (
      <>
          <QueryClientProvider client={queryClient}>
          <h2>Hello Project! </h2>
          <UserDataTable querykey={0}/>
          <button className="border" onClick={() => {invalidateUserDataQuery();}}>refresh</button>
              {queryClient.getQueryCache().getAll().map((value,index,array)=> <h2 key={value.queryHash}>{JSON.stringify(value)}</h2>)}
          </QueryClientProvider>
      </>
  );
}
function invalidateUserDataQuery(){
    queryClient.refetchQueries({queryKey: ['userData']});
    //queryClient.invalidateQueries({queryKey: ['userData']})
}
