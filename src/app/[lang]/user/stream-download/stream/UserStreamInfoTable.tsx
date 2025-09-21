"use client"

import {useEffect, useMemo, useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {Play, Clock, User, ExternalLink, Crown, Folder} from "lucide-react"
import {formatFileSize} from "@/app/utils/FileUtils";
import {formatMessage, formatMessageBidi} from "@/app/utils/I18nUtils";
import useQuery_userAccount from "@/app/[lang]/user/queries/UserAccountInfoQuery";
import * as React from "react";
import {getClientDashboardDictionary} from "@/lib/ClientDashboardDictionary";
import {StreamFormat, StreamModel} from "@/app/[lang]/user/stream-download/stream/StreamDto";
import {formatSeconds} from "@/app/utils/TimeUtils";
import entry from "next/dist/server/typescript/rules/entry";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import {Input} from "@/components/ui/input";
import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosRequestConfig} from "axios";
import {createHttpClientStreamDownloadURL, createHttpClientStreamInfoURL} from "@/app/utils/LinkUtils";
import {toast} from "@/hooks/use-toast";

interface StreamDownloadDto {
    stream: StreamModel
    selectedEntries: {entryId:string,formatId:string}[]
    storagePath: string

}

export default function UserStreamInfoTable({ streamModel, lang }: {streamModel : StreamModel, lang?: string}) {
    const [showUpgradeAlert, setShowUpgradeAlert] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false);
    const [storagePath, setStoragePath] = useState(streamModel.title ? `/${streamModel.title}` : "/");
    const [selectedFormats, setSelectedFormats] = useState<Map<String, StreamFormat>>(new Map());
    const queryClient:QueryClient = useQueryClient();

    const clientDashboardDictionary = getClientDashboardDictionary(lang);
    const {
        userAccount,
        userAccount_isFetching,
        userAccount_isError,
        userAccount_isPending
    } = useQuery_userAccount();

    const downloadStreamMutation = useMutation({
        mutationFn: (streamDownloadDto: StreamDownloadDto) => {
            return axios.post(createHttpClientStreamDownloadURL(), streamDownloadDto, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                } as AxiosRequestConfig
            )
                .then(response => response.data);
        },
        onSuccess: (responseBody) => {
            setIsDownloading(true);
            queryClient.invalidateQueries({queryKey:['user','streamHistory']});
        },
        onError: error => {
            toast({
                title: clientDashboardDictionary.stream.event.downloadFailed,
                description: error.response.data?.title,
                className: 'text-red-600'
            })
            setIsDownloading(false);
        }
    });


    useEffect(() => {// imitate component did mount class-component-lifecycle method
        const initialSelections = new Map<string, StreamFormat>();

        for (const entry of streamModel.entries) { // auto select - first format
            //rely on backend sort
            initialSelections.set(entry.id, entry.formats[0]);
        }
        setSelectedFormats(initialSelections)
    }, [streamModel.id]) // Only depend on playlist ID to avoid infinite loops

    const totalsize = useMemo(() => {
        return selectedFormats.values()
            .map(format=>format.bytes)
            .reduce((prev,curr)=>prev+curr,0);
    },[selectedFormats]);

    if (userAccount_isPending) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingSpinner/>
            </div>)
    }
    const entryReleaseDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }
    const handleFormatSelect = (entryId: string, format: StreamFormat) => {
        setSelectedFormats((prev) => {
            const newMap = new Map(prev); //clone map
            const prevFormat = newMap.get(entryId);
            if (prevFormat?.id === format.id){
                newMap.delete(entryId);
            } else {
                newMap.set(entryId, format);
            }
            return newMap;
        })
    }
    const handleDownload = () => {
        setIsDownloading(true);
        const selectedEntries = Array.from(selectedFormats, ([entryId, format]) => ({
            entryId: entryId,
            formatId: format.id,
        }));
        const downloadDto = {
            stream: streamModel,
            selectedEntries: selectedEntries,
            storagePath: storagePath
        }
        downloadStreamMutation.mutate(downloadDto);
    }

    const hiddenTracksCount = streamModel.playlistCount - streamModel.entries.length;
    const userAllowedStreamDownloadTraffic = userAccount.allowedStreamDownloadTraffic - userAccount.usedStreamDownloadTraffic;
    const userAllowedNumberOfStreams = userAccount.allowedNumberOfStreamsToDownload - userAccount.downloadedNumberOfStreams;
    const isUserStreamDownloadTrafficLimitReached = totalsize > userAllowedStreamDownloadTraffic ;
    const isUserNumberOfStreamsLimitReached = selectedFormats.size > userAllowedNumberOfStreams;
    const userAllowedToDownload = (!isUserStreamDownloadTrafficLimitReached) &&
        (!isUserNumberOfStreamsLimitReached);

    return (
        <div className="max-w-4xl mx-auto space-y-6 direction-ltr">
            {/* Playlist Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl mb-2">{streamModel.title}</CardTitle>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <Badge variant="secondary">{streamModel.playlistCount} tracks</Badge>
                            </div>
                        </div>
                        <Button variant="default" size="sm" onClick={() => window.open(streamModel.url, "_blank")}>
                            <ExternalLink className="w-4 h-4 mr-2"/>
                            View Original
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            {/* Track List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Play className="w-5 h-5"/>
                        Tracks
                        <Badge variant="secondary" className="ml-2">
                            Showing {streamModel.entries.length} of {streamModel.playlistCount}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {streamModel.entries.map((entry, index) => {
                            const selectedFormat = selectedFormats.get(entry.id)
                            return (
                                <div
                                    key={entry.id}
                                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors
                                            hover:bg-purple-50 dark:hover:bg-purple-950/20 border-purple-100`}
                                >
                                    {/* Track Number */}
                                    <div
                                        className="w-8 text-center text-muted-foreground font-mono pt-1">{index + 1}</div>

                                    {/* Thumbnail */}
                                    <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                        <img
                                            src={entry.thumbnail || "/placeholder.svg"}
                                            alt={entry.title}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>

                                    {/* Track Info */}
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div>
                                            <h3 className="font-medium truncate">{entry.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <User className="w-3 h-3"/>
                                                <span className="truncate">{entry.artist || entry.uploader}</span>
                                            </div>
                                        </div>

                                        {/* Track available formats */}
                                        <div className="flex flex-wrap gap-1">
                                            {entry.formats?.map((format, formatIndex) => {
                                                const isSelected = selectedFormat?.id === format.id;
                                                return (
                                                    <Badge
                                                        key={formatIndex}
                                                        variant={isSelected ? "default" : "outline"}
                                                        className={`text-xs cursor-pointer transition-colors ${
                                                             isSelected
                                                                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                                                                    : "border-purple-200 text-purple-700 hover:bg-purple-50"
                                                                }`}
                                                        onClick={() => handleFormatSelect(entry.id, format)}
                                                    >
                                                        {format.fileExtension.toUpperCase()} • {formatFileSize(format.bytes)} • {`${format.abr}kbps`}
                                                        {isSelected && " ✓"}
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Duration and Date */}
                                    <div className="flex flex-col items-end gap-1 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3"/>
                                            {formatSeconds(entry.duration)}
                                        </div>
                                        <div className="hidden md:block">{entryReleaseDate(entry.releaseDate)}</div>
                                    </div>

                                        {/* External Link */}
                                        <Button variant="ghost" size="sm"
                                                onClick={() => window.open(entry.webpageUrl, "_blank")}>
                                            <ExternalLink className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                );
                            }
                        )}
                    </div>

                    <div className={`mt-6 p-6 border-2 border-dashed border-muted-foreground/20 rounded-lg text-center ${lang=="fa" ? "rtl" : ""}`}>
                        {
                            hiddenTracksCount > 0 && <>
                                <Crown className="w-8 h-8 mx-auto mb-3 text-amber-600"/>
                                <h3 className="font-semibold mb-2">{formatMessage(clientDashboardDictionary.stream.moreTracks, String(hiddenTracksCount))}</h3>
                                <p className="text-muted-foreground mb-4">
                                    {formatMessage(clientDashboardDictionary.stream.wholePlaylist, String(streamModel.playlistCount))}
                                </p>
                            </>
                        }
                        {isUserStreamDownloadTrafficLimitReached &&
                            <li className="flex items-center justify-center text-sm bg-destructive rounded-md p-3 m-4 md:text-base">
                                <span className="font-medium truncate">{formatMessageBidi(lang, clientDashboardDictionary.stream.trafficLimitReached, formatFileSize(userAllowedStreamDownloadTraffic))}</span>
                            </li>
                            }
                        {isUserNumberOfStreamsLimitReached &&
                            <li className="flex items-center justify-center text-sm bg-destructive rounded-md p-3 m-4 md:text-base">
                                <span className="font-medium truncate">{formatMessageBidi(lang, clientDashboardDictionary.stream.numberLimitReached, String(userAllowedNumberOfStreams))}</span>
                            </li>
                            }
                        <div className='flex flex-col justify-center gap-4'>
                            <div className="flex items-center gap-2 direction-ltr">
                                <Folder className="w-4 h-4 text-muted-foreground"/>
                                <Input
                                    type="text"
                                    placeholder="Storage path"
                                    value={storagePath}
                                    disabled={!userAllowedToDownload || isDownloading}
                                    onChange={(e) => setStoragePath(e.target.value)}
                                    className={"border-purple-200 focus:border-purple-400"}
                                />
                            </div>
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 md:text-base"
                                    disabled={!userAllowedToDownload || isDownloading}
                                    onClick={handleDownload}
                            >
                                {formatMessageBidi(lang, clientDashboardDictionary.stream.downloadToCloud, formatFileSize(totalsize))}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
