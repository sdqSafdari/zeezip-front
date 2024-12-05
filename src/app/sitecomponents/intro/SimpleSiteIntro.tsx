
import Anonymous_SVG from "./icon.svg";
import Image from "next/image";

export default function SimpleSiteIntro() {
    return (
        <div className="container flex flex-col justify-center mx-auto px-4 py-8 bg-[url('https://cdn.prod.website-files.com/6600cac2bfd894b77d543d34/6602c6f51f0d426b79f21228_Pixels.webp')]">
            <div>
                <h1 className="text-4xl font-bold">ANONYMOUS &
                    <span className='text-green-700'> PRIVATE</span>
                    <Image className="ml-2 inline-block" src={Anonymous_SVG} alt={"Anonymity"} />
                </h1>
                <p className="text-4xl font-bold mb-6">File Sharing</p>
                <p className="text-4xl font-bold ">Encrypt & Zip your Files</p>
            </div>
        </div>
    )
}