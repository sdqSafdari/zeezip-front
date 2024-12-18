"use client"


export default function Login() {
    return (
        <>
            <div className='relative z-10 mx-4 h-screen overflow-hidden'>
                <VideoComponent />
            </div>
        </>
    );
}
function VideoComponent(){
    return(
        <video autoPlay={true} muted={true} loop={true} playsInline={true} className="absolute left-0 z-0 object-cover h-screen w-screen">
            <source src="/videos/flames.mp4" type="video/mp4"/>
        </video>
    );
}
