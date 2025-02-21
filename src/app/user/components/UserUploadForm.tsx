"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {Check, Upload, X} from "lucide-react"
import UploadProgressBar from "@/app/sitecomponents/upload/UploadProgressBar";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosHeaders, AxiosRequestConfig} from "axios";
import {MutableRefObject, useRef, useState} from "react";
import {formatFileSize} from "@/app/utils/FileUtils";
import SuccessfulTick from "@/app/sitecomponents/upload/SuccessfulTick";
import DownloadPageLinkComponent from "@/app/sitecomponents/upload/DownloadPageLinkComponent";
import {
    createHttpClientCaptchaURL,
    createHttpClientStoreFilesURL,
    createHttpClientUserStoreFileURL
} from "@/app/utils/LinkUtils";
import CaptchaDto from "@/app/sitecomponents/CaptchaDto";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/hooks/use-toast";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import GeneralCaptchaComponent from "@/app/sitecomponents/upload/captcha/GeneralCaptchaComponent";
import CancellationButton from "@/app/sitecomponents/upload/CancellationButton";
import {file} from "@babel/types";
import {bool} from "prop-types";
import {Progress} from "@/components/ui/progress";

class FileWithProgress {
    file:File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    abortController: AbortController;

    constructor(file: File, progress: number, status: "pending" | "uploading" | "completed" | "error", abortController: AbortController) {
        this.file = file;
        this.progress = progress;
        this.status = status;
        this.abortController = abortController;
    }

    public isUploading():boolean{
     return this.status == 'uploading';
    }
    public isCompleted():boolean{
        return this.status== 'completed';
    }
}
export default function UserUploadForm() {
    const [files, setFiles] = React.useState<FileWithProgress[]>([]);
    const [filePath, setFilePath] = useState("/");
    const {toast} = useToast();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const queryClient = useQueryClient();
    function createAxiosRequestConfig(fileWithProgress:FileWithProgress):AxiosRequestConfig{
        const axiosRequestConfig :AxiosRequestConfig= {};
        fileWithProgress.status = 'uploading' as const;
        axiosRequestConfig.signal = fileWithProgress.abortController.signal;
        axiosRequestConfig.onUploadProgress= (progressEvent)=>{
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            const percentage = Math.round((current / total) * 100);
            setFiles(prevFiles =>
                prevFiles.map(f => {
                   if(f.file.name === fileWithProgress.file.name){
                       f.progress = percentage;
                   }
                   return f;
                })
            )
        };
        return axiosRequestConfig;
    }
    const uploadFilesMutation = useMutation({
        mutationFn: (fileWithProgress:FileWithProgress) => {
            console.log("sending a file");
            const formData: FormData = new FormData();
            formData.append("file-path",filePath);
            formData.append("file-data", fileWithProgress.file);
           return  axios.post(createHttpClientUserStoreFileURL()
               ,formData,
               createAxiosRequestConfig(fileWithProgress));

        },
        onSuccess: (responseEntity,fileWithProgress) => {
            const {data}=responseEntity;

            setFiles(prevFiles =>
                prevFiles.map(f => {
                   if( f.file.name === fileWithProgress.file.name){
                       f.status = 'completed';
                   }
                   return f;
                })
            )
            // pass data to FileMetadataTable
            queryClient.refetchQueries({queryKey:['userFiles']});
        },
        onError: (error,fileWithProgress) => {

            if (axios.isCancel(error)) {
                toast({
                    title: "Upload is cancelled!",
                    description: fileWithProgress.name,
                    className: 'text-green-700'
                })
            } else {
                toast({
                    title: `Error uploading File ${fileWithProgress.name}!`,
                    description: error.response.data?.message,
                    className: 'text-red-600'
                })
            }

        },
        onSettled:(data,error)=>{
            // Clean up the abort controller after each mutation
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileNames = new Set(files.map(file=>file.file.name));
            const filteredFiles:FileWithProgress[] = Array.from(event.target.files || []).filter(file => !fileNames.has(file.name)).map(sFile =>
                (new FileWithProgress(
                        sFile,
                        0,
                        'pending' as const,
                        new AbortController()
                    )
                ));
            console.log(JSON.stringify(filteredFiles));
            setFiles(prevFiles => [...prevFiles, ...filteredFiles])
        }
    }

    const handleRemoveFile = (fileToRemove: File) => {
        fileInputRef.current.value='';
        setFiles(prevFiles => prevFiles.filter(file => file.file !== fileToRemove))
    }


    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleUploadCancel = (fileWithProgress:FileWithProgress) => {
        fileWithProgress.abortController.abort();
        fileWithProgress.status = 'pending' as const;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(JSON.stringify(files));
        if (files.filter(fileWithProgress=>fileWithProgress.status == 'pending').length === 0) return;

        for (const file of files) {
            uploadFilesMutation.mutate(file);
        }
    }
    const totalSize = files.filter(fileWithProgress=>fileWithProgress.status == 'pending').reduce((acc, file) => acc + file.file.size, 0);

    return (
        <Card className="w-full md:w-1/3 md:basis-2/5 border-[#7f7669] bg-transparent my-8">
            <CardHeader>
                <CardTitle>Upload Box</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="flex flex-col items-center justify-center space-y-2">
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
                            className="w-full h-32 border-2 border-[#7f7669] border-dashed"
                            onClick={handleUploadClick}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                {files.length > 0 ?
                                    <>
                                        <Upload className='h-8 w-8 text-green-700'/>
                                        <span className="text-lg font-bold text-green-700">Upload More</span>
                                    </>
                                    :
                                    <>
                                        <Upload className="h-8 w-8"/>
                                        <span>Click to upload files</span>
                                    </>
                                }
                            </div>
                        </Button>
                            </>
                    </div>
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-medium">Selected Files:</h3>
                            <ul className="space-y-2">
                                {files.map((fileWithProgress, index) =>
                                (
                                    <li key={index} className="rounded-md bg-secondary p-2">
                                        <div className="flex items-start justify-between text-sm">
                                            <div className="flex flex-col">
                                                <span
                                                    className="font-medium truncate max-w-[200px]">{fileWithProgress.file.name}</span>
                                                <span
                                                    className="text-muted-foreground">{formatFileSize(fileWithProgress.file.size)}</span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant={fileWithProgress.isUploading() ? "destructive" : "ghost"}
                                                size="sm"
                                                onClick={() => fileWithProgress.status == 'uploading' ? handleUploadCancel(fileWithProgress)
                                                    : handleRemoveFile(fileWithProgress.file)
                                                }
                                                className={`h-6 w-6 p-0 my-auto ${fileWithProgress.isCompleted() ? 'border-2 border-green-700': ''}`}
                                            >{fileWithProgress.isCompleted()?
                                                <Check className="h-4 w-4 text-green-700"/>
                                                :
                                                <X className="h-4 w-4"/>
                                            }
                                                <span className="sr-only">Remove {fileWithProgress.file.name}</span>
                                            </Button>
                                        </div>
                                        <Progress value={fileWithProgress.progress} />
                                    </li>
                                )
                                )}
                                <Toaster />
                            </ul>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                        <div className='w-full'>
                                <div className='w-full flex space-x-1'>
                                    <Button type="submit"
                                            className="text-center p-2 flex-grow"
                                            disabled={totalSize<1}
                                    >
                                        {`Upload All: ${formatFileSize(totalSize)}`}
                                    </Button>
                                </div>
                        </div>
                </CardFooter>
            </form>
        </Card>
    )
}
