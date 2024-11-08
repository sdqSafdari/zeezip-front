export function createDownloadPageLink(groupId:string){
    const baseURL:string=window.location.origin;
    return `${baseURL}/download?groupId=${groupId ?? "1"}`;
}