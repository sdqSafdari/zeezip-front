
import Anonymous_SVG from "./icon.svg";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function SimpleSiteIntro() {
    return (
        <div className="container flex flex-col justify-center mx-auto px-4 py-8 md:bg-[url('https://cdn.prod.website-files.com/6600cac2bfd894b77d543d34/6602c6f51f0d426b79f21228_Pixels.webp')]">
            <div>
                <h1 className="text-4xl font-bold">PRIVATE &
                    <span className='text-green-700'> ANONYMOUS</span>
                    <Image className="ml-2 inline-block" src={Anonymous_SVG} alt={"Anonymity"} />
                </h1>
                <p className="text-4xl font-bold mb-6">File Sharing</p>
                <p className="text-4xl font-bold ">Encrypt & Zip your Files</p>
            </div>
            <div className="mt-32">
                <h1 className="text-4xl font-bold">Encrypt your Files &</h1>
                <p className="flex gap-2 text-4xl font-bold">Download from Link by
                    <Button className="text-lg rounded-none bg-gradient-to-r from-[#0f2939] to-[#3aa09c]">Creating an Account</Button>
                </p>
            </div>
        </div>
)
}