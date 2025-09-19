"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, Cloud, CloudUpload, Download, Info, Link, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DashboardLayout from "@/app/[lang]/user/components/dashboard-layout";
import UserUploadForm from "@/app/[lang]/user/components/UserUploadForm";
import UserMetrics from "@/app/[lang]/user/components/UserMetrics";
import UserFilesTable from "@/app/[lang]/user/components/UserFilesTable";
import useQuery_userInfo from "@/app/[lang]/user/queries/UserInfoQuery";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import UserStreamSection from "@/app/[lang]/user/stream-download/stream/UserStreamSection";
import {useParams} from "next/navigation";

export default function StreamDownloadPage() {
    const {userInfo,userInfo_isFetching,userInfo_isError,userInfo_isPending} = useQuery_userInfo();
    const params = useParams();
    if (userInfo_isPending) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingSpinner/>
            </div>)
    }
    return (
        <DashboardLayout userInfo={userInfo}>
            <div className='pr-4'>
                <StreamDownload lang={params.lang}/>
            </div>
        </DashboardLayout>
    );

}

function StreamDownload({lang}){
    return (
        <div className="container py-8 px-4 md:py-12">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Stream to Cloud Storage</h1>
                    <p className="">
                        Download Musics from
                    </p>
                    <ul className='list-disc list-inside space-y-2'>
                        <li className="text-orange-500"><a href='https://soundcloud.com/discover'
                                                           target="_blank"//open in new tab
                                                           rel="noopener noreferrer">
                        SoundCloud</a></li>
                        <li className="text-blue-500"><a href='https://bandcamp.com/discover/ambient'
                                                         target="_blank"// open in new tab
                                                         rel="noopener noreferrer">
                        BandCamp</a></li>
                    </ul>
                    <p>
                        directly to your cloud storage without using your device's bandwidth.
                    </p>
                </div>
                <div className={`flex justify-center ${lang === "fa" ? "font-persian rtl" : ""}`}>
                    <div className='w-full md:w-1/2'>
                        <UserStreamSection lang={lang}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
