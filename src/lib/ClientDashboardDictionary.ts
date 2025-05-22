import Client_EN from "./dictionaries/client_dashboard_en.json";
import Client_FA from "./dictionaries/client_dashboard_fa.json";

export type ClientDashboardDictionary = {
    upload: {
        box: {
            title: string
            subtitle: string
            maxSize: string
            clickToSelectFiles: string
            selectedFiles: string
            upload: string
            uploading: string
            cancel: string
            uploadMore: string
            successfulUpload: string
            uploadPath: string
        }
        event: {
            uploadFailed: string
            uploadCanceled: string
            completeTheCaptcha: string
            trafficLimitReached: string
            volumeLimitReached: string
        }
    }
    files: {

    }

}

const clientDictionaries = {
    en: Client_EN as ClientDashboardDictionary,
    fa: Client_FA as ClientDashboardDictionary
}
export const getClientDashboardDictionary = (locale: string)=>{
    return clientDictionaries[locale as keyof typeof clientDictionaries] || clientDictionaries.en ;
}
export function formatMessage(message:string, ...args){
    return message.replace(/{(\d+)}/g, (match, index) => args[index] || '');
}