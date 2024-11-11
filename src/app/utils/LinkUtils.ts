export function createDownloadPageLink(groupId:string){
    const baseURL:string=window.location.origin;
    return `${baseURL}/download?groupId=${groupId ?? "1"}`;
}
export function createDirectDownloadLink(fileId:string):string {
    const baseURL:string=window.location.origin;
    return `${baseURL}/bff/public/file/download/${fileId}`;
}

export function createDirectDownloadLinkZip(groupId:string):string{
    const baseURL:string=window.location.origin;
    return `${baseURL}/bff/public/file/download/zip/${groupId}`;
}

export function createHttpClientListFilesMetadataURL(groupId:string):string{
    return `/bff/public/file/metadata/${groupId}`;
}

export function createHttpClientStoreFilesURL():string{
    return "/bff/public/file/store";
}