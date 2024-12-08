
import Anonymous_SVG from "./icon.svg";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function SimpleSiteIntro() {
    return (
        <div className="container flex flex-col justify-center mx-auto px-4 py-8 relative">
            {/*<Image className="absolute inset-0 z-0 opacity-45" height={124} width={1440} src="/images/Pixels.webp" alt="pixel" />*/}
            <div>
                <h1 className="text-2xl md:text-4xl font-bold">PRIVATE &
                    <span className='text-green-700'> ANONYMOUS</span>
                    <Image className="ml-2 inline-block" src={Anonymous_SVG} alt={"Anonymity"} />
                </h1>
                <p className="text-2xl md:text-4xl font-bold mb-6">File Sharing</p>
                <p className="text-2xl md:text-4xl font-bold ">Encrypt & Zip your Files</p>
            </div>
            <div className="mt-32">
                <h1 className="text-xl md:text-3xl font-bold">Encrypt your Files &</h1>
                <p className="flex gap-2 text-xl md:text-3xl font-bold">
                    <span className="my-auto">Download from Link by</span>
                    <Button className="bg-gradient-to-r from-[#0f2939] to-[#3aa09c] md:text-lg">Creating an Account</Button>
                </p>
            </div>
        </div>
)
}