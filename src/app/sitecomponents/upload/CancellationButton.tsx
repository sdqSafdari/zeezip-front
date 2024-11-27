"use client"

import {Button} from "@/components/ui/button";
import {CircleX} from "lucide-react";

export default function CancellationButton({handleCancel}:{handleCancel:()=>void}){
    return (
        <div className='flex justify-center w-full'>
            <Button
                variant='outline'
                size='icon'
                className='w-1/5 rounded-full text-destructive my-2'
                onClick={handleCancel}
            >
                <CircleX className="h-10 w-10"/>
            </Button>

        </div>
    );
}