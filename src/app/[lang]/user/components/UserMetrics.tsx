"use client"

import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserInfoURL, createHttpClientUserMetricsURL} from "@/app/utils/LinkUtils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {formatFileSize} from "@/app/utils/FileUtils";
import {Button} from "@/components/ui/button";
import {RotateCw} from "lucide-react";
import {MutableRefObject, useRef} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import UserAccountDomain from "@/app/[lang]/user/queries/UserAccountDomain";

export default function UserMetrics({userAccount,isFetching,isError}:{userAccount:UserAccountDomain,isFetching:boolean,isError:boolean}){
    const queryClient = useQueryClient();
    const refreshButtonRef:MutableRefObject<undefined | HTMLButtonElement> = useRef();

    const userMetric = userAccount;

    return(
      <div className='hidden md:flex items-start justify-start gap-4'>
          <div>
              <Card>
                  <CardHeader>
                      <CardTitle>Storage Overview</CardTitle>
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
                                            className="h-2 w-full"/>
                                  <div>{formatFileSize(userMetric.usedVolume)} used</div>
                                  <div>{formatFileSize(userMetric.allowedVolume - userMetric.usedVolume)} free</div>
                              </>
                          }
                      </div>
                  </CardContent>
              </Card>
          </div>
          <div>
              <Card>
                  <CardHeader>
                      <CardTitle>Traffic Overview</CardTitle>
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
                                            className="h-2 w-full"/>
                                  <div>{formatFileSize(userMetric.usedTraffic)} used</div>
                                  <div>{formatFileSize(userMetric.allowedTraffic - userMetric.usedTraffic)} remained</div>
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
function refreshMetrics(refreshButtonRef,queryClient){
    refreshButtonRef.current.disabled = true;
    queryClient.invalidateQueries({queryKey: ['user', 'userMetrics']});
    setTimeout(() => refreshButtonRef.current.disabled = false, 1000 * 10);
}