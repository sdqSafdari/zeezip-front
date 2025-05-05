"use client"

import {ReactNode, useState} from "react";
import DeleteDirectoryModal from "@/app/[lang]/user/components/DeleteDirectoryModal";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Download, MoreVertical, Trash2} from "lucide-react";
import {UserFileMetadata} from "@/app/[lang]/user/components/UserFilesTable";

export default function FileActions({userFile,relativePath,handleFileDelete,handleDownload}:{userFile:UserFileMetadata,relativePath:string,handleDownload:(string)=>void,handleFileDelete:(string)=>void}):ReactNode{
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    if (userFile.directory){
        return (
            <>
                <DeleteDirectoryModal relativePath={userFile.id}
                                      onOpenChange={setShowDeleteDialog}
                                      open={showDeleteDialog}/>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                                setShowDeleteDialog(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4"/>
                        </Button>
            </>
        );
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => {
                            // Handle single file download
                            handleDownload(userFile.id);
                        }}
                    >
                        <Download className="mr-2 h-4 w-4"/>
                        Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => {
                            // Handle single file delete
                            handleFileDelete(userFile.id);
                        }}
                    >
                        <Trash2 className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );

}
