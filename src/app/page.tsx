"use client"
import {useState} from "react";
import FileMetadataTable from '@/app/sitecomponents/FileMetadataTable';
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import {Button} from "@/components/ui/button";
import { RotateCw } from 'lucide-react';
import UploadForm from "@/app/sitecomponents/UploadForm";
import TypingAnimation from "@/components/ui/typing-animation";
import SiteIntro from "@/app/sitecomponents/SiteIntro";

export default function Home() {
    const [show, setShow] = useState(false);
    const queryClient:QueryClient = useQueryClient();
    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <span className='mx-auto'>
                <HyperText text='ZEEZIP Project' className='text-3xl font-black text-green-600'/>
                    </span>
                <ThemeButton/>
            </div>
            <div className='flex gap-4 items-start'>
                <UploadForm />
                <SiteIntro />
                <div className='basis-1/4 border-2 rounded-md p-4'>
                   <h6 className='text-2xl font-semibold leading-none tracking-tight mb-3'>Download Box</h6>
                    <FileMetadataTable />
                </div>
            </div>
        </>
    );
}

function invalidateUserDataQuery(queryClient: QueryClient) {
    queryClient.refetchQueries({queryKey: ['fileData']});
    //queryClient.invalidateQueries({queryKey: ['userData']})
}
