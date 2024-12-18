
import Anonymous_SVG from "./icon.svg";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {BorderBeam} from "@/components/ui/border-beam";

export default function SimpleSiteIntro() {
    return (
        <div className="container flex flex-col justify-center mx-auto px-4 py-8 relative">
            {/*<Image className="absolute right-0 z-0 dark:text-green-700" width={400} height={400} src="/images/geometry-bg.svg" alt="pixel" />*/}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">PRIVATE &
                    <span className='text-green-700'> ANONYMOUS</span>
                    <Image className="ml-2 inline-block" src={Anonymous_SVG} alt={"Anonymity"} />
                </h1>
                <p className="text-2xl md:text-3xl font-bold mb-6">File Sharing</p>
                <p className="text-2xl md:text-3xl font-bold ">Get Download-Link & Zip your files for Free</p>
            </div>
            <div className="mt-32">
                <h1 className="text-xl md:text-3xl font-bold">Get your personal space &</h1>
                <p className="flex gap-2 text-xl md:text-3xl font-bold">
                    <span className="my-auto mr-2">Store download-link content</span>
                    <Button
                        className="relative z-10 bg-transparent rounded-full shadow-[0_0_20px_5px_rgba(72,187,120,0.6)] hover:shadow-[0_0_30px_10px_rgba(72,187,120,0.8)] transition-shadow duration-300 border-2 text-green-700 hover:bg-transparent hover:text-tnormal font-bold md:text-xl">
                        <span>Plans</span>
                    </Button>
                </p>
            </div>
        </div>
)
}