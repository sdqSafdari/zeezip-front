"use client"

import {Button} from "@/components/ui/button";
import {CircleX} from "lucide-react";

export default function CancellationButton({handleCancel}:{handleCancel:()=>void}){
    return (
        <div>
            <Button
                type='button'
                variant='destructive'
                className='flex items-center space-x-2 '
                onClick={handleCancel}
            >
                <CircleX className="h-4 w-4"/>
                <span>Cancel</span>
            </Button>


        </div>
    );
}