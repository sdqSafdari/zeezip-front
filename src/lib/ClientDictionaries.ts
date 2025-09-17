import Client_EN from "./dictionaries/client_en.json";
import Client_FA from "./dictionaries/client_fa.json";

export type ClientDictionary = {
    publicStream: {
        loadStream: string
        inputUrl: string
        event: {
            infoExtractionFailed: string
        }

    }
    publicShare: {
        dropzone: {
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
            downloadPageLink: string
        }
        event: {
            uploadFailed: string
            uploadCanceled: string
            completeTheCaptcha: string
            limitReached200Mb: string
        }
    },
    errorFallback: {
        unauthorized: {
            title: string
            description: string
            instruction: string
        },
        general: {
            title: string
            description: string
            instruction: string
            tryAgain: string
        }
    }
}

const clientDictionaries = {
    en: Client_EN as ClientDictionary,
    fa: Client_FA as ClientDictionary
}
export const getClientDictionary = (locale: string)=>{
    return clientDictionaries[locale as keyof typeof clientDictionaries] || clientDictionaries.en ;
}