"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {formatFileSize, formatFileSizeWithLocale} from "@/app/utils/FileUtils";
import {Button} from "@/components/ui/button";
import {RotateCw} from "lucide-react";
import {MutableRefObject, useRef} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import UserAccountDomain from "@/app/[lang]/user/queries/UserAccountDomain";
import {useParams} from "next/navigation";
import {getClientDashboardDictionary} from "@/lib/ClientDashboardDictionary";
import useQuery_userAccount from "@/app/[lang]/user/queries/UserAccountInfoQuery";
import {QueryClient, useQueryClient} from "@tanstack/react-query";

export default function UserStreamMetrics(){
    const queryClient:QueryClient = useQueryClient();
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
                                    <Progress value={Math.floor(userMetric.usedTrafficResource.usedStreamDownloadTraffic * 100 / userMetric.allowedResource.allowedStreamDownloadTraffic)}
                                              className={`h-2 w-full ${locale=='fa' && 'scale-x-[-1]'}`}/>
                                    <div>{`${formatFileSizeWithLocale(userMetric.usedTrafficResource.usedStreamDownloadTraffic,locale)} ${clientDashboardDictionary.metrics.used}`}</div>
                                    <div>{`${formatFileSizeWithLocale(userMetric.allowedResource.allowedStreamDownloadTraffic - userMetric.usedTrafficResource.usedStreamDownloadTraffic,locale)} ${clientDashboardDictionary.metrics.free}`}</div>
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
                                    <Progress value={Math.floor(userMetric.usedTrafficResource.downloadedNumberOfStreams * 100 / userMetric.allowedResource.allowedNumberOfStreamsToDownload)}
                                              className={`h-2 w-full ${locale=='fa' && 'scale-x-[-1]'}`}/>
                                    <div>{`${userMetric.usedTrafficResource.downloadedNumberOfStreams} ${clientDashboardDictionary.metrics.used}`}</div>
                                    <div>{`${userMetric.allowedResource.allowedNumberOfStreamsToDownload - userMetric.usedTrafficResource.downloadedNumberOfStreams} ${clientDashboardDictionary.metrics.remained}`}</div>
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
                        onClick={()=>refreshMetrics(refreshButtonRef,queryClient)}
                >
                    <RotateCw className='h-[1.2rem] w-[1.2rem]'/>
                </Button>
            </div>
        </div>
    );
}
function refreshMetrics(refreshButtonRef, queryClient){
    refreshButtonRef.current.disabled = true;
    queryClient.invalidateQueries({queryKey:['user',"userMetrics"]});
    setTimeout(() => refreshButtonRef.current.disabled = false, 1000 * 10);
}