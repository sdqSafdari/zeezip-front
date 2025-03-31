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
    return "/protected/user/info"
}
export function createHttpClientUserFilesListURL(): string {
    return "/bff/private/file/list";
}
export function createHttpClientUserFileURL(): string{
    return `/bff/private/file`;
}
export function createHttpClientUserMetricsURL(): string{
    return '/protected/user/account/info';
}
export function createHttpClientUserDirURL():string{
    return '/bff/private/dir';
}