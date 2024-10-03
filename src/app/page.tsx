"use client"
import UserDataTable from "@/app/UserDataTable";
import {useState} from "react";
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";

export default function Home() {
    const [re, setRe] = useState(0);
    const queryClient:QueryClient = useQueryClient();
    return (
      <>
          <h2>Hello Project! </h2>
          <UserDataTable querykey={0}/>
          <button className="border" onClick={() => {invalidateUserDataQuery(queryClient);}}>refresh</button>
              {queryClient.getQueryCache().getAll().map((value,index,array)=> <h2 key={value.queryHash}>{JSON.stringify(value)}</h2>)}
      </>
  );
}
function invalidateUserDataQuery(queryClient:QueryClient){
    queryClient.refetchQueries({queryKey: ['userData']});
    //queryClient.invalidateQueries({queryKey: ['userData']})
}
