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

interface CaptchaResponse{
    captcha:string;
    key:string;
}
export default function  CaptchaWithBase64({setCaptcha,captchaNumber}:{setCaptcha:(captcha:CaptchaDto)=>void,captchaNumber:number}){
    const captchaContainerElement:MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const captchaInputElement :MutableRefObject<HTMLInputElement>= useRef<HTMLInputElement>(null);
    const [captchaNumberLocal, setCaptchaNumberLocal] = useState(0);
    const queryClient:QueryClient = useQueryClient();

    function refreshCaptcha(){
        queryClient.refetchQueries({queryKey:['captcha']});
    }
    if (captchaNumberLocal < captchaNumber){
        refreshCaptcha();
        setCaptchaNumberLocal(captchaNumber);
    }
    const {data}:{data:CaptchaResponse} = useQuery({
        queryKey:['captcha'],
        queryFn:(queryContext)=>{
            if (!captchaContainerElement.current){
                return null;
            }
            const captchaWidth:number = Math.round(captchaContainerElement.current?.clientWidth /3 );
            return axios.get(createHttpClientCaptchaURL(),{params:{width:captchaWidth,height:captchaContainerElement.current?.clientHeight}}).then(res=>res.data);
        },
        staleTime:Infinity,
        retry:false
    })
    function setNewCaptcha(value:string){
        if (value.length < 3)
            return;
        const captchaDto = new CaptchaDto();
        captchaDto.value = value;
        captchaDto.key = data.key;
        setCaptcha(captchaDto);
    }

    return (
        <div ref={captchaContainerElement} className='my-2 flex justify-between'>
            <img src={data?.captcha} className='rounded-md' alt='captcha'/>
            <Button
                size='icon'
                type="button"
                onClick={() => refreshCaptcha()}
                className='rounded-full bg-transparent text-green-700'>
                <RotateCw />
            </Button>
            <Input ref={captchaInputElement}
                   className='w-1/4'
                   onChange={()=>setNewCaptcha(captchaInputElement.current.value)}
                   maxLength='3'
            />
        </div>
    )
}