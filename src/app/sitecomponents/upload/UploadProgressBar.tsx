"use client"
import {useEffect, useState} from "react";
import {QueryClient, QueryClientProvider, useMutation, useQueryClient} from "@tanstack/react-query";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import {useTheme} from "next-themes";

export default function UploadProgressBar({progress}:{progress:number}) {
    const secondaryGaugeColor = useTheme().theme === 'dark' ? 'rgba(29, 31, 33, 100)' : 'rgba(0, 0, 0, 0.1)'
    return (
        <>  
            <AnimatedCircularProgressBar max={100} value={progress} min={0}  gaugePrimaryColor="rgb(79 70 229)"  gaugeSecondaryColor={secondaryGaugeColor}/>
        </>
    );
}
