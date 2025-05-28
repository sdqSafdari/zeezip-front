"use client"

import {useRef, useState} from "react"
import { Calendar, CreditCard, Download, HardDrive, Home, RefreshCw, Settings, User, Wifi } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {formatFileSize} from "@/app/utils/FileUtils";
import useQuery_userAccount from "@/app/[lang]/user/queries/UserAccountInfoQuery";
import useQuery_userInfo from "@/app/[lang]/user/queries/UserInfoQuery";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import useMutation_tryResetPlan from "@/app/[lang]/user/queries/UserPlanResetMutation";
import {useParams} from "next/navigation";
import {DEFAULT_LOCALE} from "@/app/utils/TimeUtils";

export default function UserAccountInfo() {
    const [activeTab, setActiveTab] = useState("overview")
    const tryResetPlan = useMutation_tryResetPlan();
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
    const locale:string = params.lang ?? DEFAULT_LOCALE;
    const handleRefresh = ()=>{
        refreshButton.current.disabled = true;
        tryResetPlan.mutate();
        setTimeout(() => refreshButton.current.disabled = false, 1000 * 10);
    }

    // Calculate percentages for progress bars
    const volumePercentage = Math.min(100, (userAccount.usedVolume / userAccount.allowedVolume) * 100)
    const trafficPercentage = Math.min(100, (userAccount.usedTraffic / userAccount.allowedTraffic) * 100)
    const streamPercentage = Math.min(
        100,
        (userAccount.usedStreamDownloadTraffic / userAccount.allowedStreamDownloadTraffic) * 100,
    )

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:gap-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">Account</h1>
                        <Button ref={refreshButton} variant="outline" size="sm" className="hidden md:flex" onClick={handleRefresh}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>

                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="billing">Billing</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Account Plan</CardTitle>
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{userAccount.accountPlan}</div>
                                        <p className="text-xs text-muted-foreground">Renews on {userAccount.getPlanEndsWithLocale(locale)}</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
                                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{formatFileSize(userAccount.usedVolume)}</div>
                                        <p className="text-xs text-muted-foreground">of {formatFileSize(userAccount.allowedVolume)} used</p>
                                        <Progress value={volumePercentage} className="mt-2" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Next Reset</CardTitle>
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl">{userAccount.getNextPlanResetWithLocale(locale)}</div>
                                        <p className="text-xs text-muted-foreground">Traffic limits will reset</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Traffic Usage</CardTitle>
                                        <CardDescription>Your network traffic consumption</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center">
                                                    <Wifi className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span>General Traffic</span>
                                                </div>
                                                <span>
                          {formatFileSize(userAccount.usedTraffic)} / {formatFileSize(userAccount.allowedTraffic)}
                        </span>
                                            </div>
                                            <Progress value={trafficPercentage} />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center">
                                                    <Download className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span>Stream Download</span>
                                                </div>
                                                <span>
                          {formatFileSize(userAccount.usedStreamDownloadTraffic)} /{" "}
                                                    {formatFileSize(userAccount.allowedStreamDownloadTraffic)}
                        </span>
                                            </div>
                                            <Progress value={streamPercentage} />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Summary</CardTitle>
                                        <CardDescription>Your account details and limits</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                                <p>{userInfo.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                <p>{userInfo.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Plan Ends</p>
                                                <p>{userAccount.getPlanEndsWithLocale(locale)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Plan Reset</p>
                                                <p>{userAccount.getNextPlanResetWithLocale(locale)}</p>
                                            </div>
                                        </div>
                                        <Button className="w-full">Upgrade Plan</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="billing" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Billing Information</CardTitle>
                                    <CardDescription>Manage your billing and subscription</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-blue-700">This section is under develop!</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
