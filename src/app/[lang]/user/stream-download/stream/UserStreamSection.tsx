"use client"

import {useMutation} from "@tanstack/react-query";
import axios, {AxiosRequestConfig} from "axios";
import {createHttpClientStreamInfoURL, createHttpClientUserDirURL} from "@/app/utils/LinkUtils";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {StreamModel} from "@/app/sitecomponents/stream/StreamDto";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import {Search} from "lucide-react";
import GeneralCaptchaComponent from "@/app/sitecomponents/upload/captcha/GeneralCaptchaComponent";
import * as React from "react";
import CaptchaDto from "@/app/sitecomponents/CaptchaDto";
import {getClientDictionary} from "@/lib/ClientDictionaries";
import {toast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";
import UserStreamInfoTable from "@/app/[lang]/user/stream-download/stream/UserStreamInfoTable";

interface StreamInfoRequest {
    url: string
}
export default function UserStreamSection({lang}:{lang? : string}) {
    const [currentStreamInfo, setCurrentStreamInfo] = useState<StreamModel>(null);
    const [streamUri, setStreamUri] = useState<String>(null);
    const [captcha, setCaptcha] = useState<CaptchaDto>(null);
    const [streamLoaded, setStreamLoaded] = useState<boolean>(false);
    const [captchaNumber, setCaptchaNumber] = useState<number>(0);
    const clientDictionary = getClientDictionary(lang);

    const getStreamInfoMutation = useMutation({
        mutationFn: (streamInfoRequest: StreamInfoRequest) => {
            return axios.post(createHttpClientStreamInfoURL(), streamInfoRequest, {
                    headers: {
                        "Content-Type": "application/json",
                        ...captcha?.buildHttpHeaders()
                    }
                } as AxiosRequestConfig
            )
                .then(response => response.data);
        },
        onSuccess: (responseBody) => {
            setCurrentStreamInfo(responseBody);
            setCaptcha(null);
            setStreamLoaded(true);
            setCaptchaNumber(captchaNumber+1);
        },
        onError: error => {
            toast({
                title: clientDictionary.publicStream.event.infoExtractionFailed,
                description: error.response.data?.title,
                className: 'text-red-600'
            })
            setCaptcha(null);
            setCaptchaNumber(captchaNumber+1);
        }
    });
    const  handleSubmit = function (formEvent) {
        formEvent.preventDefault();
        if (!captcha){
            toast({
                title: clientDictionary.publicShare.event.completeTheCaptcha,
                className:`text-red-600 text-2xl font-bold ${lang==='fa'?"font-persian rtl":""}`,
                duration: 5000
            })
            return;
        }
        const formData = new FormData(formEvent.currentTarget);
        const requestBody:StreamInfoRequest = { url : formData.get("uri") as string};
        getStreamInfoMutation.mutate(requestBody);
    }
    return (
        <>
            <Card className="mx-auto mb-3">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5"/>
                        {clientDictionary.publicStream.loadStream}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="url"
                            name="uri"
                            placeholder={clientDictionary.publicStream.inputUrl}
                            value={streamUri}
                            onChange={(e) => setStreamUri(e.target.value)}
                            className="flex-1"
                            disabled={getStreamInfoMutation.isPending || streamLoaded}
                        />
                        <Button type="submit" disabled={getStreamInfoMutation.isPending || streamLoaded || !streamUri ||!streamUri.trim()}>
                            {getStreamInfoMutation.isPending ? <LoadingSpinner/> : "Load"}
                        </Button>
                    </form>
                    {(streamLoaded || getStreamInfoMutation.isPending) ||
                        <GeneralCaptchaComponent setCaptcha={setCaptcha} captchaNumber={captchaNumber} switchEnabled={false}/>
                    }
                </CardContent>
            </Card>
            {currentStreamInfo &&
                <UserStreamInfoTable streamModel={currentStreamInfo} lang={lang}/>
            }
            <Toaster />
        </>);
}