
import ThemeButton from '@/app/sitecomponents/fixed/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import UploadForm from "@/app/sitecomponents/upload/UploadForm";
import WebsiteIntro from "@/app/sitecomponents/intro/WebsiteIntro";
import Link from "next/link";
import Image from "next/image";
import openBSD from "../../public/openbsd.svg?url";
import SimpleSiteIntro from "@/app/sitecomponents/intro/SimpleSiteIntro";
import {Button} from "@/components/ui/button";

/**
 * since keyword meta tag is outdated, you should use keyword strategy
 * keyword strategy: file sharing, free web space, online storage, share files, photo image music mp3 video sharing, dedicated hosting, enterprise sharing, file transfer, file hosting, internet file sharing,send file
 */
export default function Home() {
    return (
        <>
            <div className='min-h-screen pb-8 relative'>
            <div className='flex justify-between my-2'>
                <h2 className='text-3xl font-black text-green-700'><Link href='/'> ZeeZIP </Link>
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
