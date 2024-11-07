"use client"
import {useState} from "react";
import FileMetadataTable from '@/app/sitecomponents/FileMetadataTable';
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "@tanstack/react-query";
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import SiteIntro from "@/app/sitecomponents/SiteIntro";
import {useSearchParams} from "next/navigation";

export default function Download() {
    const [groupId,setGroupId] = useState(null);
    const queryClient:QueryClient = useQueryClient();
    const readonlyURLSearchParams = useSearchParams();
    const queryParamGroupId = readonlyURLSearchParams.get('groupId');
    return (
        <>
            <div className='relative h-16 mt-1'>
                <span className='absolute left-1/2 transform -translate-x-1/2'>
                    <HyperText text='ZEEZIP Project' className='text-3xl font-black text-green-600'/>
                </span>
                <span className='absolute right-0'>
                    <ThemeButton/>
                </span>
            </div>
            <div className='flex gap-4 items-start flex-col-on-mobile'>
                <div className='w-full sm:w-1/4 sm:basis-1/4 border-2 rounded-md p-4'>
                    <h6 className='text-2xl font-semibold leading-none tracking-tight mb-3'>Download Box</h6>
                    <FileMetadataTable groupId={queryParamGroupId}/>
                </div>
                <SiteIntro/>
            </div>
        </>
    );
}