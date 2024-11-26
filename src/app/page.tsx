
import ThemeButton from '@/app/sitecomponents/ThemeButton';
import HyperText from "@/components/ui/hyper-text";
import UploadForm from "@/app/sitecomponents/UploadForm";
import WebsiteIntro from "@/app/sitecomponents/intro/WebsiteIntro";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className='flex justify-between my-2'>
                <h2 className='text-3xl font-black text-green-600'><Link href='/'> ZeeZIP </Link>
                    <span className='text-sm'>because freedom is everything</span>
                </h2>
                <ThemeButton/>
            </div>
            <div className='flex gap-4 items-start flex-col-on-mobile'>
                <UploadForm />
                <WebsiteIntro />
            </div>
        </>
    );
}
