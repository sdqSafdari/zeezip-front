"use client"

import Navbar from "@/app/sitecomponents/fixed/Navbar";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default function Login() {
    return (
        <>
            <div className='relative z-10 mx-4 h-screen overflow-hidden'>
                <Navbar />
                <VideoComponent />
                <div className="flex items-end justify-end">
                    <div className="relative w-3/4 h-screen bg-secondary">
                        <FlickeringGrid
                            className="absolute z-0 inset-0 size-full"
                            squareSize={4}
                            gridGap={6}
                            color="#15803D"
                            maxOpacity={0.5}
                            flickerChance={0.01}
                        />
                        <div className="h-screen w-full flex flex-col justify-center items-center">
                            <div className="w-1/2 h-1/4 rounded-md border-2 border-green-700">
                                <p>google login</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
function VideoComponent(){
    return(
        <video autoPlay={true} muted={true} loop={true} playsInline={true} className="absolute left-0 -z-10 object-cover h-screen w-screen">
            <source src="/videos/flames.mp4" type="video/mp4"/>
        </video>
    );
}
