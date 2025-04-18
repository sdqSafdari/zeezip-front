"use client"

import {useEffect, useState} from "react"
import {AlertTriangle, MoreVertical, Trash2} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosRequestConfig} from "axios";
import {createHttpClientUserDirURL, createHttpClientUserFileURL} from "@/app/utils/LinkUtils";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import {toast, useToast} from "@/hooks/use-toast";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

interface DeleteDirectoryDialogProps {
    relativePath: string
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
    onOpenChange: (o:boolean) => void
    open:boolean
}

export default function DeleteDirectoryModal({
                                                 relativePath,
                                                 className,
                                                 onOpenChange,
                                                 open
                                             }: DeleteDirectoryDialogProps) {
    const queryClient:QueryClient = useQueryClient();

    const deleteDirectoryMutation = useMutation({
        mutationFn: (directory:string) => {
            return  axios.delete(createHttpClientUserDirURL(),{
                params: {path:directory}
            } as AxiosRequestConfig);
        },
        onSuccess:(responseEntity)=>{
            const {data} = responseEntity;
            queryClient.invalidateQueries({queryKey:['user']});
            onOpenChange(false);
            // toast({
            //     title: "Delete directory was successful!",
            //     description: `total size of ${data.totalDeletedSize}`,
            //     className: 'text-green-700'
            // })
        }});
    const handleDelete = () => {
        deleteDirectoryMutation.mutate(relativePath)
    }
    console.log(`Rerender delete directory modal ${open} ${relativePath}`)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Directory</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the directory{" "}
                        <span className="font-medium text-foreground">"{decodeURIComponent(relativePath)}"</span>? This action cannot be undone and all
                        contents will be permanently removed.
                    </DialogDescription>
                </DialogHeader>
                {deleteDirectoryMutation.isError?
                    <div className='flex justify-end' onClick={(event)=>deleteDirectoryMutation.reset()}>
                        <Alert variant="destructive" className="w-3/4">
                            <AlertTriangle className='h-4 w-4' />
                            <AlertDescription>Delete Directory Error!</AlertDescription>
                        </Alert>
                    </div>
                    : null
                }
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={deleteDirectoryMutation.isPending}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleteDirectoryMutation.isPending}>
                        {deleteDirectoryMutation.isPending ? <LoadingSpinner /> : "Delete Directory"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
