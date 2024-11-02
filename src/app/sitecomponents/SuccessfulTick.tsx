"use client"

import Lottie from 'react-lottie';
import animatedGradientBackground from '@/asset/lotties/tick.json';
export default function SuccessfulTick({toggleUpload}:{toggleUpload:()=>void}) {
    const defaultOptions={
        loop:false,
        autoplay:true,
        animationData:animatedGradientBackground,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
            className:'cursor-default'
        }
    }
    return (
        <div className='w-1/2' onClick={()=>toggleUpload()}>
            <Lottie options={defaultOptions} isClickToPauseDisabled={true}/>
        </div>
    )
}