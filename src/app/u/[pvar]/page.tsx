"use client"
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import SiteIntro from "@/app/sitecomponents/intro/SiteIntro";
import FileTableWithParam from "@/app/u/[pvar]/FileTableWithParam";
import Link from "next/link";

export default function u({params}) {
    const {pvar} = params;
    return (
        <>
            <div className='flex justify-between my-2'>
                <h2 className='text-3xl font-black text-green-600'><Link href='/'> ZeeZIP </Link>
                    <span className='text-sm'>because freedom is everything</span>
                </h2>
                <ThemeButton/>
            </div>
            <div className='flex gap-4 items-start flex-col-on-mobile my-8'>
                <FileTableWithParam groupId={pvar}/>
                <SiteIntro/>
            </div>
        </>
    );
}