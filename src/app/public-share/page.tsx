import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import ThemeButton from "@/app/sitecomponents/fixed/ThemeButton";
import UploadForm from "@/app/sitecomponents/upload/UploadForm";
import SimpleSiteIntro from "@/app/sitecomponents/intro/SimpleSiteIntro";
import WebsiteIntro from "@/app/sitecomponents/intro/WebsiteIntro";
import openBSD from "../../../public/openbsd.svg?url";


export default function Home() {
    return (
        <>
            <div className='min-h-screen pb-8 relative'>
                <div className='flex justify-between my-2'>
                    <h2 className='text-3xl font-black text-green-700'><Link href='/public'> ZeeZIP </Link>
                        <Image className="inline-block" src={openBSD} alt="secure"/>
                    </h2>
                    <div className="flex items-start gap-4 my-auto">
                        <Button className="border-2 rounded-full bg-transparent font-bold text-green-700 border-green-700 transform transition-transform duration-300 hover:bg-transparent hover:scale-110">
                            <Link href={"/loginf"} >sign in | sign up</Link>
                        </Button>
                        <ThemeButton/>
                    </div>
                </div>
                <div className='flex gap-4 items-start flex-col-on-mobile'>
                    <UploadForm />
                    <SimpleSiteIntro />
                </div>
                <div className='h-4 w-full bg-green-700 absolute bottom-0'></div>
            </div>
            <WebsiteIntro />
        </>
    );
}
