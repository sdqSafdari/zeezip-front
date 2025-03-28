"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import UploadProgressBar from "@/app/sitecomponents/upload/UploadProgressBar";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosHeaders, AxiosRequestConfig} from "axios";
import {MutableRefObject, useRef, useState} from "react";
import {formatFileSize} from "@/app/utils/FileUtils";
import SuccessfulTick from "@/app/sitecomponents/upload/SuccessfulTick";
import DownloadPageLinkComponent from "@/app/sitecomponents/upload/DownloadPageLinkComponent";
import {createHttpClientCaptchaURL, createHttpClientStoreFilesURL} from "@/app/utils/LinkUtils";
import CaptchaDto from "@/app/sitecomponents/CaptchaDto";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/hooks/use-toast";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import GeneralCaptchaComponent from "@/app/sitecomponents/upload/captcha/GeneralCaptchaComponent";
import CancellationButton from "@/app/sitecomponents/upload/CancellationButton";
import {getClientDictionary} from "@/lib/ClientDictionaries";
import {cn} from "@/lib/utils";

class UploadProperties{
    formData:FormData;
    captcha:CaptchaDto;
}
export default function UploadForm({lang}:{lang? : string}) {
    const [files, setFiles] = React.useState<File[]>([])
    const [uploading, setUploading] = React.useState(false)
    const [uploadProgress, setUploadProgress] = useState(0 );
    const [successfulUpload,setSuccessfulUpload] = useState(false);
    const [captcha, setCaptcha] = useState<CaptchaDto>(null);
    const [captchaNumber, setCaptchaNumber] = useState<number>(0);
    const [groupId, setGroupId] = useState(null);
    const abortControllerRef = useRef<AbortController|null>(null);
    const {toast} = useToast();
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const clientDictionary = getClientDictionary(lang);
    const queryClient = useQueryClient();
    let limit_violated = false;
    function createAxiosRequestConfig(captcha:CaptchaDto):AxiosRequestConfig{
        const axiosRequestConfig :AxiosRequestConfig= {};
        abortControllerRef.current = new AbortController();
        axiosRequestConfig.headers = captcha?.buildHttpHeaders();
        axiosRequestConfig.signal = abortControllerRef.current?.signal;
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
            console.error("upload error!");
            if (axios.isCancel(error)) {
                toast({
                    title: "Upload is cancelled!",
                    className: 'text-green-700'
                })
            } else {
                toast({
                    title: clientDictionary.publicShare.event.uploadFailed,
                    description: error.response.data?.message,
                    className: 'text-red-600'
                })
            }
            setUploading(false);
            setUploadProgress(0);
            setCaptchaNumber(captchaNumber+1);
            setCaptcha(null);
        },
        onSettled:(data,error)=>{
            // Clean up the abort controller after each mutation
            abortControllerRef.current=null;
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

    const handleCancel = () => {
        abortControllerRef.current?.abort();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (files.length === 0) return;
        if (limit_violated) return;
        if (!captcha){
            toast({
                title: clientDictionary.publicShare.event.completeTheCaptcha,
                className:`text-red-600 text-2xl font-bold ${lang==='fa'?"font-persian rtl":""}`
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
        <Card className="w-full border-2 border-dashed border-primary/20 bg-background/50">
            <CardHeader className="text-center">
                {uploading?
                    <CardTitle className="text-2xl text-primary">{clientDictionary.publicShare.dropzone.uploading}</CardTitle>
                    : successfulUpload ?
                        <CardTitle className="text-2xl text-green-700">{clientDictionary.publicShare.dropzone.successfulUpload}</CardTitle>
                        :
                        <>
                            <CardTitle className="text-2xl">{clientDictionary.publicShare.dropzone.title}</CardTitle>
                            <CardDescription>{clientDictionary.publicShare.dropzone.subtitle}</CardDescription>
                        </>
                }
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
                        <div
                            className="w-full h-32"
                        >
                            <div className="flex flex-col items-center space-y-2 cursor-pointer hover:text-primary"
                                 onClick={handleUploadClick}>
                                {files.length > 0 ?
                                    <>
                                        <Upload className='h-8 w-8'/>
                                        <span className="text-lg font-bold">{clientDictionary.publicShare.dropzone.uploadMore}</span>
                                    </>
                                    :
                                    <>
                                        <Upload className="h-8 w-8"/>
                                        <span className="text-lg font-medium">{clientDictionary.publicShare.dropzone.clickToSelectFiles}</span>
                                    </>
                                }
                            </div>
                        </div>
                            </> }
                    </div>
                    {files.length > 0 && (
                        <div className="space-y-2 direction-ltr">
                            <h3 className="font-medium">{clientDictionary.publicShare.dropzone.selectedFiles}</h3>
                            <ul className="space-y-2 text-left">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-start justify-between text-sm rounded-md bg-secondary p-2">
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
                                            <span className="font-medium">{clientDictionary.publicShare.event.limitReached200Mb}</span>
                                    </li>
                                    :<></>}
                                <Toaster />
                            </ul>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="direction-ltr text-left">
                    { successfulUpload ? <DownloadPageLinkComponent groupId={groupId} lang={lang}/> :
                        <div className='w-full'>
                            {uploading ? null :
                                <GeneralCaptchaComponent setCaptcha={setCaptcha} captchaNumber={captchaNumber}/>
                            }
                            {uploading ?
                                <div className='w-full flex space-x-1'>
                                    <Button type="button"
                                            className={cn("text-center p-2 flex-grow",lang==='fa'?"font-persian rtl":"")}
                                            disabled
                                    >
                                        {`${clientDictionary.publicShare.dropzone.uploading} ${formatFileSize(totalSize)}`}
                                    </Button>
                                    <CancellationButton handleCancel={handleCancel} lang={lang}/>
                                </div>
                                :
                                <div>
                                    <Button type="submit"
                                            className="w-full text-center"
                                            disabled={files.length === 0 || uploading || limit_violated}
                                    >
                                        {`${clientDictionary.publicShare.dropzone.upload} (${formatFileSize(totalSize)})`}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground mt-4">{clientDictionary.publicShare.dropzone.maxSize}</p>
                                </div>
                            }
                        </div>
                    }
                </CardFooter>
            </form>
        </Card>
    )
}
