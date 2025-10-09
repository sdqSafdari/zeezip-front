
export const DEFAULT_LOCALE:string = 'fa';

const timeOptions = {
    year: 'numeric',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Use 24-hour format (set to true for 12-hour format)
}

export function formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function formatUTCTimeWithLocale(isoUTCTime,locale){
    // Create a Date object from the ISO UTC time string
    const date = new Date(isoUTCTime);

    if (locale == 'fa'){
        const dateTimeFormat = new Intl.DateTimeFormat('fa-IR-u-nu-latn',timeOptions);
        const dateTimeFormatParts = dateTimeFormat.formatToParts(date);
        const timeParts = {
            day: dateTimeFormatParts.find(p=>p.type === 'day').value,
            month: dateTimeFormatParts.find(p=>p.type === 'month').value,
            year: dateTimeFormatParts.find(p=>p.type === 'year').value,
            weekday: dateTimeFormatParts.find(p=>p.type === 'weekday').value
        }
        const time = dateTimeFormatParts
            .filter(p=>['hour','minute','second','literal'].includes(p.type))
            .map(p=>p.value)
            .join('');
        return `${timeParts.weekday} ${timeParts.day} ${timeParts.month} ${timeParts.year} ${time}`;
    } else {
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }
}

export function formatUTCDateWithLocale(isoUTCTime,locale){
    // Create a Date object from the ISO UTC time string
    const date = new Date(isoUTCTime);

    if (locale == 'fa'){
        const dateTimeFormat = new Intl.DateTimeFormat('fa-IR-u-nu-latn',timeOptions);
        const dateTimeFormatParts = dateTimeFormat.formatToParts(date);
        const dateParts = {
            day: dateTimeFormatParts.find(p=>p.type === 'day').value,
            month: dateTimeFormatParts.find(p=>p.type === 'month').value,
            year: dateTimeFormatParts.find(p=>p.type === 'year').value,
            weekday: dateTimeFormatParts.find(p=>p.type === 'weekday').value
        }
        return `${dateParts.weekday}، ${toPersianDigits(dateParts.day)} ${dateParts.month} ${toPersianDigits(dateParts.year)}`;
    } else {
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

function toPersianDigits(str: string): string {
    return str.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

export function isWithinLastTwoHours(isoUTCTime: string): boolean {
    const date = new Date(isoUTCTime);         // parse ISO string
    const now = Date.now();                    // current timestamp (ms)
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;

    return date.getTime() >= twoHoursAgo && date.getTime() <= now;
}
