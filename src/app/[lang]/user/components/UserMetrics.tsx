"use client"

import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserInfoURL, createHttpClientUserMetricsURL} from "@/app/utils/LinkUtils";
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

export default function UserMetrics({userAccount,isFetching,isError}:{userAccount:UserAccountDomain,isFetching:boolean,isError:boolean}){
    const tryResetPlan = useMutation_tryResetPlan();
    const refreshButtonRef:MutableRefObject<undefined | HTMLButtonElement> = useRef();
    const params = useParams();

    const locale:string= params.lang ?? 'en';
    const clientDashboardDictionary = getClientDashboardDictionary(locale);
    const userMetric = userAccount;

    return(
      <div className='hidden md:flex items-start justify-start gap-4'>
          <div className={locale === "fa" ? "font-persian rtl" : ""}>
              <Card>
                  <CardHeader>
                      <CardTitle>{clientDashboardDictionary.metrics.storage}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          {isFetching ?
                              <>
                                  <Skeleton className="h-2 w-full"/> {/* Skeleton for Progress */}
                                  <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "used" text */}
                                  <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "free" text */}
                              </>
                              :
                              <>
                                  <Progress value={Math.floor(userMetric.usedVolume * 100 / userMetric.allowedVolume)}
                                            className={`h-2 w-full ${locale=='fa' && 'scale-x-[-1]'}`}/>
                                  <div>{`${formatFileSizeWithLocale(userMetric.usedVolume,locale)} ${clientDashboardDictionary.metrics.used}`}</div>
                                  <div>{`${formatFileSizeWithLocale(userMetric.allowedVolume - userMetric.usedVolume,locale)} ${clientDashboardDictionary.metrics.free}`}</div>
                              </>
                          }
                      </div>
                  </CardContent>
              </Card>
          </div>
          <div className={locale === "fa" ? "font-persian rtl" : ""}>
              <Card>
                  <CardHeader>
                      <CardTitle>{clientDashboardDictionary.metrics.traffic}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          {isFetching ?
                              <>
                                  <Skeleton className="h-2 w-full"/> {/* Skeleton for Progress */}
                                  <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "used" text */}
                                  <Skeleton className="h-4 w-1/2"/> {/* Skeleton for "free" text */}
                              </>
                              :
                              <>
                                  <Progress value={Math.floor(userMetric.usedTraffic * 100 / userMetric.allowedTraffic)}
                                            className={`h-2 w-full ${locale=='fa' && 'scale-x-[-1]'}`}/>
                                  <div>{`${formatFileSizeWithLocale(userMetric.usedTraffic,locale)} ${clientDashboardDictionary.metrics.used}`}</div>
                                  <div>{`${formatFileSizeWithLocale(userMetric.allowedTraffic - userMetric.usedTraffic,locale)} ${clientDashboardDictionary.metrics.remained}`}</div>
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