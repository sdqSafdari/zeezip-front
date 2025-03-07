import {useMutation} from "@tanstack/react-query";
import axios, {AxiosRequestConfig} from "axios";
import {createHttpClientUserFileURL} from "@/app/utils/LinkUtils";
import {useState} from "react";

class DownloadingFile{
    id:string;
    progress:number;

    constructor(id: string) {
        this.id = id;
    }
}
export default function useDownloadBlob() {
    const [downloadings, setDownloadings] = useState(new Map<string,DownloadingFile>());
    const downloadMutation = useMutation({
        onMutate: (fileId: string) => {
            setDownloadings(prevState => {
                return prevState.set(fileId, new DownloadingFile(fileId));
            })
        },
        mutationFn: (fileId: string) => {
            return axios.get(createHttpClientUserFileURL(), {
                params: {id: fileId},
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setDownloadings(prevState => {
                        const downloadingFile = prevState.get(fileId);
                        if (downloadingFile) {
                            downloadingFile.progress = percentCompleted;
                            return prevState.set(fileId, downloadingFile);
                        } else {
                            return prevState;
                        }
                    });
                }
            } as AxiosRequestConfig)
        },
        onSuccess: (response) => {
            console.log("-----------successful download!----------")
            if (!window) {
                return;
            }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'file'; // Default filename
            if (contentDisposition && contentDisposition.includes('filename=')) {
                const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }
            console.log("----------" + filename);
            a.download = filename; // Set the desired file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        onSettled: (response, error, fileId) => {
            if (error) {
                console.error("+++++" + JSON.stringify(error));
            }
            setDownloadings(prevState => {
                prevState.delete(fileId);
                return prevState;
            });
        }
    });
    return {downloadMutation,downloadings};
}