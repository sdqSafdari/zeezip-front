"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FolderPlus} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useRef, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosRequestConfig} from "axios";
import {createHttpClientUserDirURL} from "@/app/utils/LinkUtils";

class CreateDirectoryDto{
    relativePath:string;
    directoryName:string;

    constructor(relativePath: string, directoryName: string) {
        this.relativePath = relativePath;
        this.directoryName = directoryName;
    }
}
export default function MakeDirectoryModal({relativePath}){
    const [newFolderName, setNewFolderName] = useState<string>(null);
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
    const inputRef = useRef(null);
    const queryClient = useQueryClient();

    const relativePathRevised= relativePath ? relativePath : "";
    const createDirectoryMutation = useMutation({
        mutationFn:(createDirectoryDto:CreateDirectoryDto)=>{
            return axios.post(createHttpClientUserDirURL(),createDirectoryDto,{headers:{
                "Content-Type":"application/json"
                }} as AxiosRequestConfig
            )
                .then(response=>response.data);
        },
        onSuccess:(responseData)=>{
            setIsNewFolderDialogOpen(false);
            queryClient.invalidateQueries({queryKey:['user']})
        }
    });

    function handleCreateFolder() {
        const createDirectoryDto = new CreateDirectoryDto(relativePathRevised,newFolderName);
        createDirectoryMutation.mutate(createDirectoryDto);
    }

    return (
        <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-yellow-600 border-2">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>
                    Enter a name for your new folder. Click create when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        value={newFolderName}
                        ref={inputRef}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onPaste={(e) => setNewFolderName(inputRef.current.value)}
                        className="col-span-3"
                        placeholder="My Folder"
                        autoFocus
                    />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit"
                        onClick={handleCreateFolder}
                        disabled={newFolderName==null || newFolderName.trim().length==0}
                >
                    Create
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>);
}