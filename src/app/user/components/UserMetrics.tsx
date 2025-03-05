"use client"

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserInfoURL, createHttpClientUserMetricsURL} from "@/app/utils/LinkUtils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {formatFileSize} from "@/app/utils/FileUtils";

interface UserMetricsResponse{
    accountPlan:string;
    usedVolume:number;
    usedTraffic:number;
    allowedVolume:number;
    allowedTraffic:number;
    planEnds:string;
    planReset:string;

}
export default function UserMetrics(){
    const {data,status}:{data:UserMetricsResponse,status:string} = useQuery({
        queryKey: ['userMetrics'], // used as cache key
        queryFn: ({queryKey}) => {
            return axios.get(createHttpClientUserMetricsURL()).then(res=> res.data);
        },
        staleTime: 3*60*1000,
        retry: 3 // retry the failed queries
    });
    if (status==='pending'){
        return null;//TODO write pending component
    }
    const userMetric:UserMetricsResponse = data;

    return(
      <div className='hidden md:flex items-start justify-between'>
          <div>
              <Card>
                  <CardHeader>
                      <CardTitle>Volume Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          <Progress value={Math.floor(userMetric.usedVolume*100/userMetric.allowedVolume)} className="h-2 w-full" />
                              <div>{formatFileSize(userMetric.usedVolume)} used</div>
                              <div>{formatFileSize(userMetric.allowedVolume-userMetric.usedVolume)} free</div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    );
}