export default class UserAccountDomain{
    accountPlan:string;
    usedVolume:number;
    usedTraffic:number;
    allowedVolume:number;
    allowedTraffic:number;
    usedStreamDownloadTraffic:number;
    allowedStreamDownloadTraffic:number;
    planEnds:string;
    planReset:string;

    isVolumeLimitReached(totalSize:number):boolean{
        return this.usedVolume+totalSize>this.allowedVolume;
    }
    isTrafficLimitReached(totalSize:number):boolean{
        return this.usedTraffic+totalSize>this.allowedTraffic;
    }
}