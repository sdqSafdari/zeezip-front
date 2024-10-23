"use client"
import {useEffect, useState} from "react";
import {QueryClient, QueryClientProvider, useMutation, useQueryClient} from "@tanstack/react-query";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";

export default function UploadProgressBar({progress}:{progress:number}) {

    return (
        <>  
            <AnimatedCircularProgressBar max={100} value={progress} min={0}  gaugePrimaryColor="rgb(79 70 229)"  gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"/>
        </>
    );
}
