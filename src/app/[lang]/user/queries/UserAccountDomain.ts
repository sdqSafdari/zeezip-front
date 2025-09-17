import {formatUTCTimeWithLocale} from "@/app/utils/TimeUtils";

export default class UserAccountDomain{
    accountPlan:string;
    usedVolume:number;
    usedTraffic:number;
    allowedVolume:number;
    allowedTraffic:number;
    usedStreamDownloadTraffic:number;
    allowedStreamDownloadTraffic:number;
    downloadedNumberOfStreams:number;
    allowedNumberOfStreamsToDownload:number;
    planEnds:string;
    planReset:string;
    nextPlanReset:string;

    isVolumeLimitReached(totalSize:number):boolean{
        return this.usedVolume+totalSize>this.allowedVolume;
    }
    isTrafficLimitReached(totalSize:number):boolean{
        return this.usedTraffic+totalSize>this.allowedTraffic;
    }
    getNextPlanResetWithLocale(locale:string){
      return formatUTCTimeWithLocale(this.nextPlanReset,locale);
    }
    getPlanEndsWithLocale(locale:string){
        if (this.planEnds) {
            return formatUTCTimeWithLocale(this.planEnds, locale);
        } else {
            return "Never";
        }
    }
}