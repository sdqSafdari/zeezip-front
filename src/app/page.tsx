
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import UploadForm from "@/app/sitecomponents/upload/UploadForm";
import WebsiteIntro from "@/app/sitecomponents/intro/WebsiteIntro";
import Link from "next/link";
import Image from "next/image";
import openBSD from "../../public/openbsd.svg";
import SimpleSiteIntro from "@/app/sitecomponents/intro/SimpleSiteIntro";

/**
 * since keyword meta tag is outdated, you should use keyword strategy
 * keyword strategy: file sharing, free web space, online storage, share files, photo image music mp3 video sharing, dedicated hosting, enterprise sharing, file transfer, file hosting, internet file sharing,send file
 */
export default function Home() {
    return (
        <>
            <div className='flex justify-between my-2'>
                <h2 className='text-3xl font-black text-green-700'><Link href='/'> ZeeZIP </Link>
                    <Image className="inline-block" src={openBSD} alt="secure"/>
                </h2>
                <ThemeButton/>
            </div>
            <div className='flex gap-4 items-start flex-col-on-mobile'>
                <UploadForm />
                <SimpleSiteIntro />
            </div>
        </>
    );
}
