import {Suspense, useState} from "react";
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import SiteIntro from "@/app/sitecomponents/intro/SiteIntro";
import {useSearchParams} from "next/navigation";
import FileTableWithParam from "@/app/download/FileTableWithParam";

export default function Download() {
    return (
        <>
            <div className='flex justify-between my-2'>
                <HyperText text='ZEEZIP Project' className='text-3xl font-black text-green-600'/>
                <ThemeButton/>
            </div>
            <div className='flex gap-4 items-start flex-col-on-mobile'>
                <Suspense>
                    <FileTableWithParam/>
                </Suspense>
                <SiteIntro/>
            </div>
        </>
    );
}