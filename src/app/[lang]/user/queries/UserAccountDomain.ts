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
    getNextResetInBrowserLocale(){
      return this.#convertToBrowserLocal(this.planReset,30);
    }
    getPlanEndsInBrowserLocale(){
        if (this.planEnds) {
            return this.#convertToBrowserLocal(this.planEnds, 0);
        } else {
            return "Never";
        }
    }
    #convertToBrowserLocal(isoUTCtime:string,daysToAdd:number){
        // Create Date object from ISO string
        const utcTime = new Date(isoUTCtime);

        // Add days
        utcTime.setDate(utcTime.getDate() + daysToAdd);

        // Format for local display
        return utcTime.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        }); // Uses browser's locale and timezone
    }
}