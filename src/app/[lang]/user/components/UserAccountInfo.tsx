"use client"

import {useRef, useState} from "react"
import {
    AlertCircle,
    Calendar,
    CreditCard,
    Database,
    Download,
    HardDrive,
    Home, PlayCircle,
    RefreshCw,
    Settings, TrendingUp,
    User,
    Wifi
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {formatFileSize, formatFileSizeWithLocale} from "@/app/utils/FileUtils";
import useQuery_userAccount from "@/app/[lang]/user/queries/UserAccountInfoQuery";
import useQuery_userInfo from "@/app/[lang]/user/queries/UserInfoQuery";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import {useParams} from "next/navigation";
import {DEFAULT_LOCALE, formatUTCDateWithLocale, formatUTCTimeWithLocale} from "@/app/utils/TimeUtils";
import {Badge} from "@/components/ui/badge";
import {QueryClient, useQueryClient} from "@tanstack/react-query";
import {formatMessageBidi} from "@/app/utils/I18nUtils";

export default function UserAccountInfo() {
    const [activeTab, setActiveTab] = useState("overview")
    const queryClient:QueryClient = useQueryClient();
    const refreshButton = useRef(null);
    const {userAccount, userAccount_isFetching, userAccount_isError } = useQuery_userAccount();
    const {userInfo, userInfo_isFetching, userInfo_isError} = useQuery_userInfo();
    const params = useParams();

    if (userInfo_isFetching || userAccount_isFetching) {
        return (
            <div className='flex justify-center items-center h-full'>
                <LoadingSpinner/>
            </div>)
    }
    const locale:string = params.lang as string ?? DEFAULT_LOCALE;
    const handleRefresh = ()=>{
        refreshButton.current.disabled = true;
        queryClient.invalidateQueries({queryKey:['user',"userMetrics"]});
        setTimeout(() => refreshButton.current.disabled = false, 1000 * 10);
    }
    const calculatePercentage = (used: number, allowed: number) => {
        if (allowed === 0) return 0
        return Math.min((used / allowed) * 100, 100)
    }

    const volumePercentage = calculatePercentage(userAccount.usedVolume, userAccount.allowedResource.allowedVolume)
    const trafficPercentage = calculatePercentage(
        userAccount.usedTrafficResource.usedTraffic,
        userAccount.allowedResource.allowedTraffic,
    )
    const streamTrafficPercentage = calculatePercentage(
        userAccount.usedTrafficResource.usedStreamDownloadTraffic,
        userAccount.allowedResource.allowedStreamDownloadTraffic,
    )
    const streamsPercentage = calculatePercentage(
        userAccount.usedTrafficResource.downloadedNumberOfStreams,
        userAccount.allowedResource.allowedNumberOfStreamsToDownload,
    )

    const isVolumeWarning = volumePercentage > 80
    const isTrafficWarning = trafficPercentage > 80

    return (
        <div className="space-y-6">
            {/* Resource Usage Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Storage Volume</CardTitle>
                        <Database className="h-4 w-4 text-chart-1" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{formatFileSizeWithLocale(userAccount.usedVolume, locale)}</div>
                        <p className="text-xs text-muted-foreground">of {formatFileSizeWithLocale(userAccount.allowedResource.allowedVolume, locale)}</p>
                        <Progress
                            value={volumePercentage}
                            className="mt-3 h-2"
                            indicatorClassName={isVolumeWarning ? "bg-destructive" : "bg-chart-1"}
                        />
                        <p className="mt-2 text-xs text-muted-foreground">{volumePercentage.toFixed(1)}% used</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Traffic Usage</CardTitle>
                        <TrendingUp className="h-4 w-4 text-chart-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {formatFileSizeWithLocale(userAccount.usedTrafficResource.usedTraffic, locale)}
                        </div>
                        <p className="text-xs text-muted-foreground">of {formatFileSizeWithLocale(userAccount.allowedResource.allowedTraffic, locale)}</p>
                        <Progress
                            value={trafficPercentage}
                            className="mt-3 h-2"
                            indicatorClassName={isTrafficWarning ? "bg-destructive" : "bg-chart-2"}
                        />
                        <p className="mt-2 text-xs text-muted-foreground">{trafficPercentage.toFixed(1)}% used</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Stream Traffic</CardTitle>
                        <Download className="h-4 w-4 text-chart-3" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {formatFileSizeWithLocale(userAccount.usedTrafficResource.usedStreamDownloadTraffic, locale)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            of {formatFileSizeWithLocale(userAccount.allowedResource.allowedStreamDownloadTraffic, locale)}
                        </p>
                        <Progress value={streamTrafficPercentage} className="mt-3 h-2" indicatorClassName="bg-chart-3" />
                        <p className="mt-2 text-xs text-muted-foreground">{streamTrafficPercentage.toFixed(1)}% used</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Streams Downloaded</CardTitle>
                        <PlayCircle className="h-4 w-4 text-chart-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {userAccount.usedTrafficResource.downloadedNumberOfStreams}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            of {userAccount.allowedResource.allowedNumberOfStreamsToDownload}
                        </p>
                        <Progress value={streamsPercentage} className="mt-3 h-2" indicatorClassName="bg-chart-4" />
                        <p className="mt-2 text-xs text-muted-foreground">{streamsPercentage.toFixed(1)}% used</p>
                    </CardContent>
                </Card>
            </div>

            {/* Warnings */}
            {(isVolumeWarning || isTrafficWarning) && (
                <Card className="border-destructive/50 bg-destructive/5">
                    <CardContent className="flex items-start gap-3 pt-6">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">Resource Usage Warning</p>
                            <p className="text-sm text-muted-foreground">
                                {isVolumeWarning && "Storage volume is above 80%. "}
                                {isTrafficWarning && "Traffic usage is above 80%. "}
                                Consider upgrading your plan or managing your resources.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Active Subscriptions */}
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-5 w-5" />
                        Active Subscriptions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {userAccount.subscriptions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No active subscriptions</p>
                    ) : (
                        <div className="space-y-4">
                            {userAccount.subscriptions.map((subscription, index) => (
                                <div key={index} className="rounded-lg border border-border/50 bg-muted/20 p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-foreground">{subscription.planCode}</h4>
                                                <Badge variant="secondary" className="text-xs">
                                                    Priority {subscription.precedence}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {formatMessageBidi(locale, '{0} - {1}',formatUTCDateWithLocale(subscription.planStartTime, locale), formatUTCDateWithLocale(subscription.planEndsTime, locale))}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Volume Allowance</p>
                                            <p className="text-sm font-medium text-foreground">
                                                {formatFileSizeWithLocale(subscription.allowedResource.allowedVolume, locale)}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Traffic Allowance</p>
                                            <p className="text-sm font-medium text-foreground">
                                                {formatFileSizeWithLocale(subscription.allowedResource.allowedTraffic, locale)}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Stream Traffic</p>
                                            <p className="text-sm font-medium text-foreground">
                                                {formatFileSizeWithLocale(subscription.allowedResource.allowedStreamDownloadTraffic, locale)}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Stream Downloads</p>
                                            <p className="text-sm font-medium text-foreground">
                                                {subscription.allowedResource.allowedNumberOfStreamsToDownload} streams
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recently Expired Subscriptions */}
            {userAccount.recentlyExpiredSubscriptions.length > 0 && (
                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            Recently Expired Subscriptions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {userAccount.recentlyExpiredSubscriptions.map((subscription, index) => (
                                <div key={index} className="rounded-lg border border-border/50 bg-muted/10 p-4 opacity-60">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-foreground">{subscription.planCode}</h4>
                                                <Badge variant="outline" className="text-xs">
                                                    Expired
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {formatUTCDateWithLocale(subscription.planStartTime, locale)} - {formatUTCDateWithLocale(subscription.planEndsTime, locale)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Authorities */}
            {userAccount.authorities.length > 0 && (
                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle className="text-foreground">Authorities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {userAccount.authorities.map((authority, index) => (
                                <Badge key={index} variant="secondary">
                                    {authority}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
