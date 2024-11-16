"use client"

import * as React from "react";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientCaptchaURL} from "@/app/utils/LinkUtils";
import {MutableRefObject, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {RotateCw} from "lucide-react";
import {Input} from "@/components/ui/input";
import CaptchaDto from "@/app/sitecomponents/CaptchaDto";
import Script from "next/script";
import {Turnstile} from "@marsidev/react-turnstile";
import {useTheme} from "next-themes";

export default function  TurnstileCloudflareCaptcha({setCaptcha,captchaNumber,uploading}:{setCaptcha:(captcha:CaptchaDto)=>void,captchaNumber:number,uploading:boolean}){

    const [captchaNumberLocal, setCaptchaNumberLocal] = useState(0);
    const {theme} = useTheme();
    const queryClient:QueryClient = useQueryClient();

    function refreshCaptcha(){
        queryClient.invalidateQueries({queryKey:['captcha']});
    }
    if (captchaNumberLocal < captchaNumber){
        refreshCaptcha();
        setCaptchaNumberLocal(captchaNumber);
    }
    function typeEnglishNumbersOnly(event){
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
    function setTurnstile(token){
        const captchaDto = new CaptchaDto();
        captchaDto.value=token;
        captchaDto.type="turnstile";
        setCaptcha(captchaDto);
    }

    return (
        <div className='my-2'>
            <Turnstile siteKey="0x4AAAAAAA0D2LsoeixH_q1t"
                       onSuccess={setTurnstile}
                       options={{size: 'flexible', theme: theme}}
            />
        </div>
    )
}

export function RawTurnstile({setCaptcha,captchaNumber,uploading}:{setCaptcha:(captcha:CaptchaDto)=>void,captchaNumber:number,uploading:boolean}) {
    return (
        <div className='my-2 flex justify-between'>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                async
                defer
            ></Script>
            <div
                className="cf-turnstile"
                data-sitekey="0x4AAAAAAA0D2LsoeixH_q1t"
                data-callback="setTurnstile"
            ></div>
        </div>
    );
}