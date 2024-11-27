"use client"
import TurnstileCloudflareCaptcha from "@/app/sitecomponents/upload/captcha/TurnstileCloudflareCaptcha";
import CaptchaWithBase64 from "@/app/sitecomponents/upload/captcha/CaptchaWithBase64";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import * as React from "react";
import {useState} from "react";
import CaptchaDto from "@/app/sitecomponents/CaptchaDto";

export default function GeneralCaptchaComponent({setCaptcha,captchaNumber}:{setCaptcha:(captcha:CaptchaDto)=>void,captchaNumber:number}){
    const [cloudflareCaptcha, setCloudflareCaptcha] = useState(true);
    return (
        <div>
            {cloudflareCaptcha ?
                <TurnstileCloudflareCaptcha setCaptcha={setCaptcha} captchaNumber={captchaNumber} />
                :
                <CaptchaWithBase64 setCaptcha={setCaptcha} captchaNumber={captchaNumber} />
            }
            <div className='flex gap-2 items-start my-2'>
                <Switch id="captcha-mode" checked={cloudflareCaptcha}
                        onCheckedChange={setCloudflareCaptcha}
                        className="data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-secondary"/>
                <Label htmlFor="captcha-mode" className='my-auto text-sm'>Cloudflare Captcha</Label>
            </div>
        </div>
    );
}