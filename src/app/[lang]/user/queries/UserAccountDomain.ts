
export default class UserAccountDomain{
    usedVolume:number;
    authorities:string[];
    usedTrafficResource:UsedTrafficResource;
    allowedResource:AllowedResource;
    subscriptions:UserSubscription[];
    recentlyExpiredSubscriptions:UserSubscription[];

    isVolumeLimitReached(totalSize:number):boolean{
        return this.usedVolume+totalSize>this.allowedResource.allowedVolume;
    }
    isTrafficLimitReached(totalSize:number):boolean{
        return this.usedTrafficResource.usedTraffic+totalSize>this.allowedResource.allowedTraffic;
    }
}
export interface UsedTrafficResource {
    usedTraffic:number;
    usedStreamDownloadTraffic:number;
    downloadedNumberOfStreams:number;
}
export interface AllowedResource {
    allowedVolume:number;
    allowedTraffic:number;
    allowedStreamDownloadTraffic:number;
    allowedNumberOfStreamsToDownload:number;
}
export interface UserSubscription {
    planCode:string;
    precedence:number;
    allowedResource:AllowedResource;
    usedTrafficResource:UsedTrafficResource;
    planStartTime:string;
    planEndsTime:string;
}