"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {formatFileSize, formatFileSizeWithLocale} from "@/app/utils/FileUtils";
import {Button} from "@/components/ui/button";
import {RotateCw} from "lucide-react";
import {MutableRefObject, useRef} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import UserAccountDomain from "@/app/[lang]/user/queries/UserAccountDomain";
import useMutation_tryResetPlan from "@/app/[lang]/user/queries/UserPlanResetMutation";
import {useParams} from "next/navigation";
import {getClientDashboardDictionary} from "@/lib/ClientDashboardDictionary";
import useQuery_userAccount from "@/app/[lang]/user/queries/UserAccountInfoQuery";

export default function UserStreamMetrics(){
    const tryResetPlan = useMutation_tryResetPlan();
    const refreshButtonRef:MutableRefObject<undefined | HTMLButtonElement> = useRef();
    const params = useParams();
    const {userAccount,
        userAccount_isFetching,
        userAccount_isError,
        userAccount_isPending} = useQuery_userAccount();

    const locale:string= params.lang as string ?? 'en';
    const clientDashboardDictionary = getClientDashboardDictionary(locale);
    const userMetric = userAccount;

    return(
        <div className='hidden md:flex items-start justify-start gap-4'>
            <div className={locale === "fa" ? "font-persian rtl" : ""}>
                <Card>
                    <CardHeader>
                        <CardTitle>{clientDashboardDictionary.metrics.stream}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {userAccount_isFetching ?
                                <>
                                    <Skeleton className="h-2 w-full"/> {/* Skeleton for Progress */}
                                    <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "used" text */}
                                    <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "free" text */}
                                </>
                                :
                                <>
                                    <Progress value={Math.floor(userMetric.usedStreamDownloadTraffic * 100 / userMetric.allowedStreamDownloadTraffic)}
                                              className={`h-2 w-full ${locale=='fa' && 'scale-x-[-1]'}`}/>
                                    <div>{`${formatFileSizeWithLocale(userMetric.usedStreamDownloadTraffic,locale)} ${clientDashboardDictionary.metrics.used}`}</div>
                                    <div>{`${formatFileSizeWithLocale(userMetric.allowedStreamDownloadTraffic - userMetric.usedStreamDownloadTraffic,locale)} ${clientDashboardDictionary.metrics.free}`}</div>
                                </>
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className={locale === "fa" ? "font-persian rtl" : ""}>
                <Card>
                    <CardHeader>
                        <CardTitle>{clientDashboardDictionary.metrics.numberOfStream}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {userAccount_isFetching ?
                                <>
                                    <Skeleton className="h-2 w-full"/> {/* Skeleton for Progress */}
                                    <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "used" text */}
                                    <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "free" text */}
                                </>
                                :
                                <>
                                    <Progress value={Math.floor(userMetric.downloadedNumberOfStreams * 100 / userMetric.allowedNumberOfStreamsToDownload)}
                                              className={`h-2 w-full ${locale=='fa' && 'scale-x-[-1]'}`}/>
                                    <div>{`${userMetric.downloadedNumberOfStreams} ${clientDashboardDictionary.metrics.used}`}</div>
                                    <div>{`${userMetric.allowedNumberOfStreamsToDownload - userMetric.downloadedNumberOfStreams} ${clientDashboardDictionary.metrics.remained}`}</div>
                                </>
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Button type="button"
                        variant="outline"
                        ref={refreshButtonRef as MutableRefObject<HTMLButtonElement>}
                        className='flex items-center justify-center rounded-full p-0 h-[2.4rem] w-[2.4rem] hover:text-green-700'
                        onClick={()=>refreshMetrics(refreshButtonRef,tryResetPlan)}
                >
                    <RotateCw className='h-[1.2rem] w-[1.2rem]'/>
                </Button>
            </div>
        </div>
    );
}
function refreshMetrics(refreshButtonRef,tryResetPlan){
    refreshButtonRef.current.disabled = true;
    tryResetPlan.mutate();
    setTimeout(() => refreshButtonRef.current.disabled = false, 1000 * 10);
}