export function createDownloadPageLink(groupId:string,lang:string){
    if (!window)
        return "";
    const baseURL:string=window.location.origin;
    return `${baseURL}/${lang}/u/${groupId ?? "1"}`;
}
export function createDirectDownloadLink(fileId:string):string {
    if (!window)
        return "";
    const baseURL:string=window.location.origin;
    return `${baseURL}/bff/public/file/download/${fileId}`;
}
export function getStaticServerSideBaseURL(){
    /*
    const requestHeaders = headers(); // this will make a server-component dynamic-rendered and may have performance implications
    const beforeProxyHost = requestHeaders.get('X-Forwarded-Host');
     */
    return 'https://zzip.ir';
}

export function createDirectDownloadLinkZip(groupId:string):string{
    if (!window)
        return "";
    const baseURL:string=window.location.origin;
    return `${baseURL}/bff/public/file/download/zip/${groupId}`;
}
export function createDirectUserFileDownloadLink(relativeFileId:string):string{
    if (!window)
        return "";
    const baseURL:string=window.location.origin;
    return `${baseURL}${createHttpClientUserFileURL()}?id=${encodeURIComponent(relativeFileId)}`;
}

export function createHttpClientListFilesMetadataURL(groupId:string):string{
    return `/bff/public/file/metadata/${groupId}`;
}

export function createHttpClientStoreFilesURL():string{
    return "/bff/public/file/store";
}

export function createHttpClientUserStoreFileURL():string{
    return "/bff/private/file/store";
}

export function createHttpClientCaptchaURL():string{
    return "/bff/captcha/string";
}

export function createHttpClientUserInfoURL():string{
    return "/protected/iam/info"
}
export function createHttpClientUserFilesListURL(): string {
    return "/bff/private/file/list";
}
export function createHttpClientUserFileURL(): string{
    return `/bff/private/file`;
}
export function createHttpClientUserMetricsURL(): string{
    return '/protected/iam/account/info';
}
export function createHttpClientTryResetPlanURL():string{
    return '/protected/iam/account/try-reset';
}
export function createHttpClientUserDirURL():string{
    return '/bff/private/dir';
}