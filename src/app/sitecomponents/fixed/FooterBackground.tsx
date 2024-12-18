"use client"

import Lottie from 'react-lottie';
import animatedGradientBackground from '@/asset/lotties/gradient-blur.json';
export default function FooterBackground() {
    const defaultOptions={
        loop:true,
        autoplay:true,
        animationData:animatedGradientBackground,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
            className:'cursor-default'
        }
    }
    return (
        <div className='fixed bottom-0 left-0 right-0 z-0 overflow-hidden'>
            <Lottie options={defaultOptions} isClickToPauseDisabled={true}/>
        </div>
    )
}
