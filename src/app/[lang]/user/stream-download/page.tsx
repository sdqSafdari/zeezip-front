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

export default function StreamDownloadPage() {
    const {userInfo,userInfo_isFetching,userInfo_isError,userInfo_isPending} = useQuery_userInfo();
    if (userInfo_isPending) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingSpinner/>
            </div>)
    }
    return (
        <DashboardLayout userInfo={userInfo}>
            <div className='pr-4'>
                <StreamDownload />
            </div>
        </DashboardLayout>
    );

}

function StreamDownload(){
    return (
        <div className="container max-w-5xl py-8 px-4 md:py-12">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Stream to Cloud Storage</h1>
                    <p className="text-muted-foreground">
                        Download video and audio streams directly to your cloud storage without using your device's bandwidth.
                    </p>
                </div>

                <Alert variant="destructive" className="border-yellow-500 bg-yellow-500/10 text-yellow-700">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Under Development</AlertTitle>
                    <AlertDescription>
                        This feature is currently under development. Our team is working hard to make it available soon.
                    </AlertDescription>
                </Alert>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Add Stream URL</CardTitle>
                                <CardDescription>Paste the URL of the video or audio stream you want to download</CardDescription>
                            </div>
                            <Badge variant="outline" className="gap-1">
                                <span className="h-2 w-2 rounded-full bg-yellow-500"></span> Coming Soon
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="https://example.com/stream/video.m3u8"
                                        className="flex-1"
                                    />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div>
                                                    <Button disabled className="whitespace-nowrap">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download to Cloud
                                                    </Button>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>This feature is coming soon</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <p className="text-sm text-muted-foreground">Supported formats: MP4, M3U8, HLS, DASH, and more</p>
                            </div>

                            <div className="rounded-lg border bg-muted/40 p-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <span>
                    Our system will process the stream and store it in your cloud storage without using your device's
                    bandwidth.
                  </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="how-it-works">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                        <TabsTrigger value="supported-services">Supported Services</TabsTrigger>
                    </TabsList>
                    <TabsContent value="how-it-works" className="mt-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="grid gap-8">
                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Link className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-medium">1. Paste Stream URL</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Paste the URL of the video or audio stream you want to download
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Play className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-medium">2. Process Stream</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Our servers process the stream without using your device's bandwidth
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Cloud className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-medium">3. Save to Cloud</h3>
                                            <p className="text-sm text-muted-foreground">
                                                The processed file is saved directly to your cloud storage
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <div className="bg-background px-4 text-sm text-muted-foreground">Benefits</div>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex items-start gap-2">
                                            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                                                <ArrowRight className="h-3 w-3 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">Save Bandwidth</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Download streams without using your device's internet connection
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                                                <ArrowRight className="h-3 w-3 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">Background Processing</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Continue browsing while we handle the download for you
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                                                <ArrowRight className="h-3 w-3 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">High-Quality Preservation</h4>
                                                <p className="text-sm text-muted-foreground">Maintain the original quality of the stream</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                                                <ArrowRight className="h-3 w-3 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">Direct Cloud Storage</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Files go straight to your cloud storage, saving device space
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/50 px-6 py-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <CloudUpload className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                    Development Status: Backend services are currently being built and tested
                  </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="supported-services" className="mt-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <h3 className="text-lg font-medium">Supported Stream Formats</h3>
                                        <div className="grid gap-2 md:grid-cols-2">
                                            <div className="flex items-center gap-2 rounded-md border p-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <Play className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">HLS (M3U8)</p>
                                                    <p className="text-sm text-muted-foreground">HTTP Live Streaming</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md border p-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <Play className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">DASH (MPD)</p>
                                                    <p className="text-sm text-muted-foreground">Dynamic Adaptive Streaming over HTTP</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md border p-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <Play className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">MP4 / MOV</p>
                                                    <p className="text-sm text-muted-foreground">Direct video links</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md border p-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <Play className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">MP3 / AAC / WAV</p>
                                                    <p className="text-sm text-muted-foreground">Audio streams</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        <h3 className="text-lg font-medium">Supported Cloud Storage</h3>
                                        <div className="grid gap-2 md:grid-cols-2">
                                            <div className="flex items-center gap-2 rounded-md border p-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <Cloud className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Your Account Storage</p>
                                                    <p className="text-sm text-muted-foreground">Default cloud storage</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md border p-3 opacity-50">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                    <Cloud className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Google Drive</p>
                                                    <p className="text-sm text-muted-foreground">Coming soon</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md border p-3 opacity-50">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                    <Cloud className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Dropbox</p>
                                                    <p className="text-sm text-muted-foreground">Coming soon</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md border p-3 opacity-50">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                    <Cloud className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">OneDrive</p>
                                                    <p className="text-sm text-muted-foreground">Coming soon</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/50 px-6 py-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                    Additional services and formats will be added after the initial release
                  </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="rounded-lg border bg-muted/40 p-4">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-medium">Development Timeline</h3>
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <p className="text-sm">
                                    <span className="font-medium">Phase 1:</span> UI Development - Completed
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                <p className="text-sm">
                                    <span className="font-medium">Phase 2:</span> Backend Services - In Progress
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                                <p className="text-sm">
                                    <span className="font-medium">Phase 3:</span> Integration & Testing - Upcoming
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                                <p className="text-sm">
                                    <span className="font-medium">Phase 4:</span> Launch - Upcoming
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
