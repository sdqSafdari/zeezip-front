"use client"
import {useState} from "react";
import FileMetadataTable from '@/app/sitecomponents/FileMetadataTable';
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";

export default function Home() {
    const [re, setRe] = useState(0);
    const queryClient:QueryClient = useQueryClient();
    return (
      <>
          <h2>Hello Project! </h2>
          <div className='flex justify-end'>
              <div className='basis-1/4 border-2 rounded-md mr-4'>
                  <FileMetadataTable/>
                  <button className="border" onClick={() => {
                      invalidateUserDataQuery(queryClient);
                  }}>refresh
                  </button>
              </div>
          </div>
      </>
  );
}
function invalidateUserDataQuery(queryClient:QueryClient){
    queryClient.refetchQueries({queryKey: ['fileData']});
    //queryClient.invalidateQueries({queryKey: ['userData']})
}
