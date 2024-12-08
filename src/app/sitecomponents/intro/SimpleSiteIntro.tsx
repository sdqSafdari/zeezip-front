
import Anonymous_SVG from "./icon.svg";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {BorderBeam} from "@/components/ui/border-beam";

export default function SimpleSiteIntro() {
    return (
        <div className="container flex flex-col justify-center mx-auto px-4 py-8 relative">
            {/*<Image className="absolute right-0 z-0 dark:text-green-700" width={400} height={400} src="/images/geometry-bg.svg" alt="pixel" />*/}
            <div>
                <h1 className="text-2xl md:text-4xl font-bold">PRIVATE &
                    <span className='text-green-700'> ANONYMOUS</span>
                    <Image className="ml-2 inline-block" src={Anonymous_SVG} alt={"Anonymity"} />
                </h1>
                <p className="text-2xl md:text-4xl font-bold mb-6">File Sharing</p>
                <p className="text-2xl md:text-4xl font-bold ">Get Download-Link & Zip your files for Free</p>
            </div>
            <div className="mt-32">
                <h1 className="text-xl md:text-3xl font-bold">Get your personal space &</h1>
                <p className="flex gap-2 text-xl md:text-3xl font-bold">
                    <span className="my-auto">Store download-link content by</span>
                    <Button className="bg-gradient-to-r from-[#0f2939] to-[#3aa09c] md:text-lg relative">
                        <span>Creating an Account</span>
                        <BorderBeam size={100} borderWidth={2} duration={10} colorFrom="#15803D"/>
                        </Button>
                </p>
            </div>
        </div>
)
}