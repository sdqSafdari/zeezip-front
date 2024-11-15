"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import UploadProgressBar from "@/app/sitecomponents/UploadProgressBar";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosHeaders, AxiosRequestConfig} from "axios";
import {MutableRefObject, useState} from "react";
import {formatFileSize} from "@/app/utils/FileUtils";
import SuccessfulTick from "@/app/sitecomponents/SuccessfulTick";
import DownloadPageLinkComponent from "@/app/sitecomponents/DownloadPageLinkComponent";
import {createHttpClientCaptchaURL, createHttpClientStoreFilesURL} from "@/app/utils/LinkUtils";
import CaptchaWithBase64 from "@/app/sitecomponents/CaptchaWithBase64";
import CaptchaDto from "@/app/sitecomponents/CaptchaDto";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/hooks/use-toast";
import TurnstileCloudflareCaptcha from "@/app/sitecomponents/TurnstileCloudflareCaptcha";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";

class UploadProperties{
    formData:FormData;
    captcha:CaptchaDto;
}
export default function UploadForm() {
    const [files, setFiles] = React.useState<File[]>([])
    const [uploading, setUploading] = React.useState(false)
    const [uploadProgress, setUploadProgress] = useState(0 );
    const [successfulUpload,setSuccessfulUpload] = useState(false);
    const [captcha, setCaptcha] = useState<CaptchaDto>(null);
    const [captchaNumber, setCaptchaNumber] = useState<number>(0);
    const [cloudflareCaptcha, setCloudflareCaptcha] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const {toast} = useToast();
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient();
    let limit_violated = false;
    function createAxiosRequestConfig(captcha:CaptchaDto):AxiosRequestConfig{
        const axiosRequestConfig :AxiosRequestConfig= {};
        axiosRequestConfig.headers = captcha?.buildHttpHeaders();
        axiosRequestConfig.onUploadProgress= (progressEvent)=>{
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            const percentage = Math.round((current / total) * 100);
            setUploadProgress(percentage);
        };
        return axiosRequestConfig;
    }
    const uploadFilesMutation = useMutation({
        mutationFn: (uploadProperties:UploadProperties) => {
           return  axios.post(createHttpClientStoreFilesURL()
               ,uploadProperties.formData,
               createAxiosRequestConfig(uploadProperties.captcha));

        },
        onSuccess: responseEntity => {
            const {data}=responseEntity;
            setUploading(false);
            setFiles([]);
            setUploadProgress(0);
            setCaptchaNumber(captchaNumber+1);
            setCaptcha(null);
            // pass data to FileMetadataTable
            queryClient.setQueryData(['files_'],(oldData)=>{return {groupId:data.groupId}});
            queryClient.refetchQueries({queryKey:['fileData']});
            setGroupId(data.groupId);
            setSuccessfulUpload(true);
        },
        onError: error => {
            toast({
                title: "Error uploading File[s]!",
                description: error.response.data?.message,
                className:'text-red-600'
            })
            setUploading(false);
            setUploadProgress(0);
            setCaptchaNumber(captchaNumber+1);
            setCaptcha(null);
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileNames = new Set(files.map(file=>file.name));
            const filteredFiles = Array.from(event.target.files || []).filter(file=>!fileNames.has(file.name));
            setFiles(prevFiles => [...prevFiles, ...filteredFiles])
        }
    }

    const handleRemoveFile = (fileToRemove: File) => {
        fileInputRef.current.value='';
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove))
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (files.length === 0) return;
        if (limit_violated) return;
        if (!captcha){
            toast({
                title: "Please complete the CAPTCHA!",
                className:'text-red-600'
            })
            return;
        }

        setUploading(true);

        const formData:FormData = new FormData();
        files.forEach(file=>formData.append("files",file))
        const uploadProperties = new UploadProperties();
        uploadProperties.formData = formData;
        uploadProperties.captcha = captcha;
        uploadFilesMutation.mutate(uploadProperties);
    }

    const totalSize = files.reduce((acc, file) => acc + file.size, 0)
    if (totalSize > 209_715_200){
         limit_violated = true;
    }
    return (
        <Card className="w-full sm:w-1/4 sm:basis-1/4  bg-transparent">
            <CardHeader>
                <CardTitle>Upload Files</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        {successfulUpload ? <SuccessfulTick toggleUpload={()=>setSuccessfulUpload(false)}/> :
                            uploading ? <UploadProgressBar progress={uploadProgress}/> :
                            <>
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                            id="file-upload"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="w-full h-32 border-dashed"
                            onClick={handleUploadClick}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                <Upload className="h-8 w-8" />
                                <span>Click to upload files</span>
                            </div>
                        </Button>
                            </> }
                    </div>
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-medium">Selected Files:</h3>
                            <ul className="space-y-2">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-start justify-between text-sm bg-secondary rounded-md p-2">
                                        <div className="flex flex-col">
                                            <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                                            <span className="text-muted-foreground">{formatFileSize(file.size)}</span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveFile(file)}
                                            disabled={uploading}
                                            className="h-6 w-6 p-0 my-auto"
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Remove {file.name}</span>
                                        </Button>
                                    </li>
                                ))}
                                {limit_violated ?
                                    <li className="flex items-center justify-center text-lg bg-destructive rounded-md p-3">
                                            <span className="font-medium truncate max-w-[200px]">200MB limit reached!</span>
                                    </li>
                                    :<></>}
                                <Toaster />
                            </ul>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    { successfulUpload ? <DownloadPageLinkComponent groupId={groupId}/> :
                        <div className='w-full'>
                            <div>
                                {cloudflareCaptcha ?
                                    <TurnstileCloudflareCaptcha setCaptcha={setCaptcha} captchaNumber={captchaNumber} uploading={uploading}/>
                                    :
                                    <CaptchaWithBase64 setCaptcha={setCaptcha} captchaNumber={captchaNumber} uploading={uploading}/>
                                }
                                <div className='flex gap-2 items-start my-2'>
                                    <Switch id="captcha-mode" checked={cloudflareCaptcha}
                                            onCheckedChange={setCloudflareCaptcha}/>
                                    <Label htmlFor="captcha-mode" className='my-auto text-sm'>Cloudflare Captcha</Label>
                                </div>
                            </div>
                    <Button type="submit"
                            className="w-full"
                            disabled={files.length === 0 || uploading || limit_violated}
                    >
                        {uploading ? "Uploading..." : `Upload (${formatFileSize(totalSize)})`}
                    </Button>
                        </div>
                    }
                </CardFooter>
            </form>
        </Card>
    )
}
