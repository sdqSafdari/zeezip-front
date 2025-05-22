const units = {
    en: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
    fa: ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت']
};
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
export function formatFileSizeWithLocale(bytes: number, locale: string){
    if (locale == 'en') {
        formatFileSize(bytes);
    } else if ( bytes == 0 ){
        return `0 ${units.fa[0]}`
    } else {
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(2);
        return ` ${size} ${units.fa[i]}`;
    }

}
export function formatUTCTimeToLocal(isoUTCTime) {
    // Create a Date object from the ISO UTC time string
    const date = new Date(isoUTCTime);

    // Format the date to the user's local time and locale
    const localizedTime = date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    });

    return localizedTime;
}
