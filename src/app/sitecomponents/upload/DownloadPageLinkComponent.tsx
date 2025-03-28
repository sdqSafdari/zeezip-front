"use client"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Check, Copy, Terminal} from "lucide-react";
import * as React from "react";
import {createDownloadPageLink} from "@/app/utils/LinkUtils";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {getClientDictionary} from "@/lib/ClientDictionaries";
import {cn} from "@/lib/utils";

export default function  DownloadPageLinkComponent({groupId,lang}:{groupId:string,lang:string}){
    const downloadPageLink = createDownloadPageLink(groupId);
    const [copied, setCopied] = useState(false);
    const clientDictionary= getClientDictionary(lang);
    const handleCopyToClipboard = () => {
            navigator.clipboard.writeText(downloadPageLink).then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
    }
    return (
        <div className='w-full'>
            <h6 className={cn('text-lg font-semibold leading-none tracking-tight mb-3',lang==='fa'?"font-persian rtl":"")}>{clientDictionary.publicShare.dropzone.downloadPageLink}</h6>
            <div className="w-full flex rounded-md overflow-hidden">
                <Input
                    type="text"
                    value={downloadPageLink}
                    readOnly
                    className="flex-grow rounded-r-none bg-secondary"
                />
                <Button size='icon' onClick={handleCopyToClipboard} className='w-1/4 bg-secondary text-green-600 hover:bg-green-700 hover:text-white rounded-l-none border-l border-green-400'>
                    {copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                    <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
                </Button>
            </div>
        </div>
    )
}