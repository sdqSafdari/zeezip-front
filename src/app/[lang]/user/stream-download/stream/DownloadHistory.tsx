"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Clock, CheckCircle, XCircle, AlertCircle, Cloud } from "lucide-react"
import {StreamHistoryDomain} from "@/app/[lang]/user/queries/StreamHistoryDomain";
import {formatSeconds} from "@/app/utils/TimeUtils";
import {formatFileSize} from "@/app/utils/FileUtils";


const getStateIcon = (state: string) => {
    switch (state) {
        case "PENDING":
            return <Clock className="w-4 h-4 text-yellow-500" />
        case "IN_PROGRESS":
            return <Download className="w-4 h-4 text-blue-500 animate-pulse" />
        case "ERROR":
            return <XCircle className="w-4 h-4 text-red-500" />
        case "WAIT_CLOUD_STORAGE":
            return <Cloud className="w-4 h-4 text-orange-500" />
        case "FINISHED":
            return <CheckCircle className="w-4 h-4 text-green-500" />
        default:
            return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
}

const getStateBadgeColor = (state: string, isPremium: boolean) => {
    const baseClasses = "text-xs font-medium"
    switch (state) {
        case "PENDING":
            return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`
        case "IN_PROGRESS":
            return `${baseClasses} ${isPremium ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`
        case "ERROR":
            return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`
        case "WAIT_CLOUD_STORAGE":
            return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`
        case "FINISHED":
            return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
        default:
            return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`
    }
}

export function DownloadHistory({downloadHistory, onBack}: { downloadHistory: StreamHistoryDomain[], onBack?: ()=>void}) {
    const isPremium = true;
    if (downloadHistory.length === 0){
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                {onBack &&
                    <Button variant="ghost" className='border-2 border-primary' onClick={onBack}>
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Back to Playlist
                    </Button>
                }
                <h2 className={`text-2xl font-bold ${isPremium ? "text-purple-600 dark:text-purple-400" : ""}`}>
                    Download History
                </h2>
            </div>

            <div className="space-y-6">
                {downloadHistory.map((stream, streamIndex) => (
                    <Card key={stream.streamId} className={isPremium ? "border-purple-200 dark:border-purple-800" : ""}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <CardTitle className="flex items-center gap-2">
                                        {getStateIcon(stream.state)}
                                        {stream.title}
                                    </CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>Created: {new Date(stream.createdAt).toLocaleString()}</span>
                                        <span>•</span>
                                        <span>{stream.playlistCount} tracks</span>
                                    </div>
                                </div>
                                <Badge className={getStateBadgeColor(stream.state, isPremium)}>
                                    {stream.state.replace(/_/g, " ")}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {stream.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">{stream.description}</p>
                            )}

                            <div className="space-y-3">
                                <h4 className="font-medium">Track Downloads</h4>
                                {stream.entries.map((entry, entryIndex) => (
                                    <div key={entry.streamEntryId}
                                         className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                                        <img
                                            src={entry.thumbnail || "/placeholder.svg"}
                                            alt={entry.title}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {getStateIcon(entry.state)}
                                                <h5 className="font-medium truncate">{entry.title}</h5>
                                                <Badge className={getStateBadgeColor(entry.state, isPremium)}>
                                                    {entry.state.replace(/_/g, " ")}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>{entry.artist}</span>
                                                <span>•</span>
                                                <span>{formatSeconds(entry.duration)}</span>
                                                <span>•</span>
                                                <span>
                            {entry.format.extension.toUpperCase()} • {formatFileSize(entry.format.bytes)} • {`${entry.format.abr}kbps`}
                          </span>
                                            </div>
                                            {entry.state === "IN_PROGRESS" && (
                                                <div className="mt-2">
                                                    <Progress
                                                        value={Number.parseInt(entry.progress)}
                                                        className={`h-2 ${isPremium ? "[&>div]:bg-purple-600" : ""}`}
                                                    />
                                                    <span
                                                        className="text-xs text-muted-foreground">{entry.progress}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
