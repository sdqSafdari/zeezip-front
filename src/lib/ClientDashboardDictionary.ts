import Client_EN from "./dictionaries/client_dashboard_en.json";
import Client_FA from "./dictionaries/client_dashboard_fa.json";

export type ClientDashboardDictionary = {
    stream: {
        loadStream: string
        inputUrl: string
        moreTracks: string
        wholePlaylist: string
        trafficLimitReached: string
        numberLimitReached: string
        downloadToCloud: string
        event: {
            infoExtractionFailed: string
            downloadFailed: string
        }

    }
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
    metrics: {
        storage: string
        traffic: string
        used: string
        free: string
        remained: string
    }
    files: {
        storage_L1: string
        storage_L2: string
        actions: {
            title: string
            download_zip: string
            deselect: string
        }
        newDir: {
            title: string
            modal_title: string
            description: string
        }
        showing: string
        showing_of: string
        showing_fileNumber: string


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