"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, User, ExternalLink, Crown } from "lucide-react"
import Image from "next/image"
import {StreamModel, StreamEntry} from "@/app/sitecomponents/stream/StreamDto";
import {formatFileSize} from "@/app/utils/FileUtils";
import {getClientDictionary} from "@/lib/ClientDictionaries";
import {formatMessage} from "@/app/utils/I18nUtils";
import Link from "next/link";


export default function StreamInfoTable({ streamModel, lang }: {streamModel : StreamModel, lang?: string}) {
    const [showUpgradeAlert, setShowUpgradeAlert] = useState(false)
    const clientDictionary = getClientDictionary(lang);

    const hiddenTracksCount = streamModel.playlistCount - streamModel.entries.length;

    const entryDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    const entryReleaseDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

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
                        {streamModel.entries.map((track, index) => (
                            <div
                                key={track.id}
                                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                            >
                                {/* Track Number */}
                                <div className="w-8 text-center text-muted-foreground font-mono">{index + 1}</div>

                                {/* Thumbnail */}
                                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                    <img
                                        src={track.thumbnail || "/placeholder.svg"}
                                        alt={track.title}
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium truncate">{track.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="w-3 h-3"/>
                                        <span className="truncate">{track.artist || track.uploader}</span>
                                    </div>
                                </div>

                                {/* Track available formats */}
                                <div className="flex flex-wrap gap-1">
                                    {track.formats?.map((format, formatIndex) => (
                                        <Badge
                                            key={formatIndex}
                                            variant="outline"
                                            className={`text-xs border-purple-200 text-purple-700 hover:bg-purple-50`}
                                        >
                                            {format.fileExtension.toUpperCase()} • {formatFileSize(format.bytes)} • {`${format.abr}kbps`}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Duration */}
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="w-3 h-3"/>
                                    {entryDuration(track.duration)}
                                </div>

                                {/* Release Date */}
                                <div
                                    className="hidden md:block text-sm text-muted-foreground">{entryReleaseDate(track.releaseDate)}</div>

                                {/* External Link */}
                                <Button variant="ghost" size="sm"
                                        onClick={() => window.open(track.webpageUrl, "_blank")}>
                                    <ExternalLink className="w-4 h-4"/>
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-6 border-2 border-dashed border-muted-foreground/20 rounded-lg text-center">
                        {
                            hiddenTracksCount > 0 && <>
                                <Crown className="w-8 h-8 mx-auto mb-3 text-amber-600"/>
                                <h3 className="font-semibold mb-2">{formatMessage(clientDictionary.publicStream.moreTracks, String(hiddenTracksCount))}</h3>
                                <p className="text-muted-foreground mb-4">
                                    {formatMessage(clientDictionary.publicStream.wholePlaylist, String(streamModel.playlistCount))}
                                </p>
                            </>
                        }
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                            <Link href={`/${lang}/login`}>{clientDictionary.publicStream.loginToDownload}</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
