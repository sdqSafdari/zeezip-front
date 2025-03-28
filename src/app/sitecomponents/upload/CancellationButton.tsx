"use client"

import {Button} from "@/components/ui/button";
import {CircleX} from "lucide-react";
import {getClientDictionary} from "@/lib/ClientDictionaries";

export default function CancellationButton({handleCancel,lang}:{handleCancel:()=>void,lang:string}){
    const clientDictionary = getClientDictionary(lang);
    return (
        <div>
            <Button
                type='button'
                variant='destructive'
                className='flex items-center space-x-2 '
                onClick={handleCancel}
            >
                <CircleX className="h-4 w-4"/>
                <span>{clientDictionary.publicShare.dropzone.cancel}</span>
            </Button>

        </div>
    );
}