"use client"
import {useState} from "react";
import FileMetadataTable from '@/app/sitecomponents/FileMetadataTable';
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import {Button} from "@/components/ui/button";
import { RotateCw } from 'lucide-react';

export default function Home() {
    const [re, setRe] = useState(0);
    const queryClient:QueryClient = useQueryClient();
    return (
        <>
            <div className='flex justify-between items-center'>
                <span className='mx-auto'>
                <HyperText text='ZEEZIP Project' className='text-3xl font-black text-green-600'/>
                    </span>
                <ThemeButton/>
            </div>
            <div className='flex justify-end'>
                <div className='basis-1/4 border-2 rounded-md p-4'>
                    <Button
                        className='rounded-full'
                        variant="ghost"
                        size='icon'
                        onClick={() => {
                            invalidateUserDataQuery(queryClient);
                        }}>
                        <RotateCw className="h-4 w-4"/>
                    </Button>
                    <FileMetadataTable/>
                </div>
            </div>
        </>
    );
}

function invalidateUserDataQuery(queryClient: QueryClient) {
    queryClient.refetchQueries({queryKey: ['fileData']});
    //queryClient.invalidateQueries({queryKey: ['userData']})
}
