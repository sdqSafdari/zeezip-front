"use client"
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import SiteIntro from "@/app/sitecomponents/intro/SiteIntro";
import FileTableWithParam from "@/app/u/[pvar]/FileTableWithParam";

export default function u({params}) {
    const {pvar} = params;
    return (
        <>
            <div className='flex justify-between my-2'>
                <HyperText text='ZEEZIP PROJECT' className='text-3xl font-black text-green-600'/>
                <ThemeButton/>
            </div>
            <div className='flex gap-4 items-start flex-col-on-mobile'>
                    <FileTableWithParam groupId={pvar}/>
                <SiteIntro/>
            </div>
        </>
    );
}