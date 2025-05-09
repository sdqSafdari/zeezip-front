"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {FileIcon, MoreVertical, ChevronLeft, ChevronRight, Download, Trash2, Folder} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useCallback } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosRequestConfig} from "axios";
import {
    createHttpClientUserFileURL,
    createHttpClientUserFilesListURL,
    createHttpClientUserStoreFileURL, createDirectUserFileDownloadLink
} from "@/app/utils/LinkUtils";
import {formatFileSize, formatUTCTimeToLocal} from "@/app/utils/FileUtils";
import MakeDirectoryModal from "@/app/[lang]/user/components/MakeDirectoryModal";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import FileActions from "@/app/[lang]/user/components/FileActions";
import {cn} from "@/lib/utils";

export interface UserFileMetadata{
    id:string;
    name:string;
    lastModified:string;
    size:number;
    directory:boolean;
}

export default function UserFilesTable({relativePath, setRelativePath}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
    const queryClient:QueryClient = useQueryClient();
    const {data, status, isPlaceholderData,isFetching, isSuccess}:{data:UserFileMetadata[],status:string} = useQuery({
        queryKey: ['user',"userFiles",relativePath],
        queryFn: context => {
            return axios.get(createHttpClientUserFilesListURL(),
                {params:{path:relativePath}} as AxiosRequestConfig)
                .then(res => res.data);
        },
        staleTime: Infinity,
        retry: 2,
        placeholderData:keepPreviousData // for paginated requests, when queryKey effects queryFn
    });
    const deleteFileMutation = useMutation({
        mutationFn: (fileId:string) => {
            console.log("deleting a file");
            return  axios.delete(createHttpClientUserFileURL(),{
                params: {id:fileId}
            } as AxiosRequestConfig);
        },
    onError:(error,fileId)=>{
            console.error(JSON.stringify(error))
    },
    onSuccess:(data,fileId)=>{
        queryClient.invalidateQueries({queryKey:['user',"userFiles",getParentRelativePath(fileId)]});
        queryClient.invalidateQueries({queryKey:['user',"userMetrics"]});
    }});

    function handleDownload(relativeFileId:string){
        if (!document){
            return;
        }
        const directUserFileDownloadLink = createDirectUserFileDownloadLink(relativeFileId);
        const a = document.createElement('a');
        a.href = directUserFileDownloadLink;
        a.download="file";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }

    const userFiles:UserFileMetadata[] = isSuccess ? data: [];

    const totalFiles = userFiles.length;
    const totalPages = Math.ceil(totalFiles / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentFiles = userFiles.slice(startIndex, endIndex)
    const currentFilesWithoutDirs = currentFiles.filter(file=>!file.directory);

    const isAllCurrentPageSelected = currentFilesWithoutDirs.length==0 ? false  :currentFilesWithoutDirs.every((file) => selectedFiles.has(file.id))
    const isSomeCurrentPageSelected = currentFiles.some((file) => selectedFiles.has(file.id))
    const selectedCount = selectedFiles.size

    const toggleAll = useCallback(() => {
        if (isAllCurrentPageSelected) {
            // Remove all current page files from selection
            setSelectedFiles((prev) => {
                const next = new Set(prev)
                currentFilesWithoutDirs.forEach((file) => next.delete(file.id))
                return next
            })
        } else {
            // Add all current page files to selection
            setSelectedFiles((prev) => {
                const next = new Set(prev)
                currentFilesWithoutDirs.forEach((file) => next.add(file.id))
                return next
            })
        }
    }, [currentFiles, isAllCurrentPageSelected])

    const toggleFile = useCallback((fileId: string) => {
        setSelectedFiles((prev) => {
            const next = new Set(prev)
            if (next.has(fileId)) {
                next.delete(fileId)
            } else {
                next.add(fileId)
            }
            return next
        })
    }, [])

    const handleBulkDelete = useCallback(() => {
        // Implement bulk delete logic here
        console.log("Deleting files:", Array.from(selectedFiles))
        // After successful deletion, clear selection
        setSelectedFiles(new Set())
    }, [selectedFiles])

    const handleBulkDownload = useCallback(() => {
        // Implement bulk download logic here
        console.log("Downloading files:", Array.from(selectedFiles))
    }, [selectedFiles]);

    const handleFileDelete = (fileId:string)=>{
        deleteFileMutation.mutate(fileId);
    }
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function getParentRelativePath(relativePath:string){
        if (relativePath.endsWith('/')){
            return relativePath.substring(0,relativePath.slice(0,-1).lastIndexOf('/')+1);
        } else {
            return relativePath.substring(0,relativePath.lastIndexOf('/')+1);
        }
    }

    return (
        <Card className='border-[#7f7669] my-8'>
            <CardHeader>
                <div className="flex items-end justify-between">
                    <div className="flex items-end justify-start gap-4">
                        <CardTitle className='text-green-700 text-base md:text-lg'>Private Storage</CardTitle>
                        <div className={selectedCount > 0 ? "hidden lg:block" : ""}>
                            <MakeDirectoryModal relativePath={relativePath}/>
                        </div>
                        {selectedCount > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 border-2">
                                        Actions ({selectedCount})
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={handleBulkDownload}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleBulkDelete} className="text-destructive focus:text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row items-end space-x-2 text-sm">
            <span className="text-muted-foreground text-sm md:text-base">
              Showing {startIndex + 1}-{Math.min(endIndex, totalFiles)} of {totalFiles}
            </span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(value) => {
                                setPageSize(Number(value))
                                setCurrentPage(1)
                            }}
                        >
                            <SelectTrigger className="h-8 w-[110px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 per page</SelectItem>
                                <SelectItem value="10">10 per page</SelectItem>
                                <SelectItem value="20">20 per page</SelectItem>
                                <SelectItem value="50">50 per page</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={isAllCurrentPageSelected}
                                    indeterminate={!isAllCurrentPageSelected && isSomeCurrentPageSelected}
                                    onCheckedChange={toggleAll}
                                    aria-label="Select all files"
                                />
                            </TableHead>
                            <TableHead>Name(location: {decodeURIComponent(relativePath)})</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {relativePath!='/'?
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center">
                                            <div className='cursor-pointer flex'
                                                 onClick={event => setRelativePath(getParentRelativePath(relativePath))}>
                                                <Folder className="mr-2 h-4 w-4 text-blue-700"/>
                                                ..
                                            </div>
                                    </div>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            :null
                        }
                        {isFetching?
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                    <LoadingSpinner/>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            :
                            userFiles.filter(file=>file.directory || file.size > 0).map((file) => (
                            <TableRow key={file.id}>
                                <TableCell>
                                    {file.directory?null:
                                    <Checkbox
                                        checked={selectedFiles.has(file.id)}
                                        onCheckedChange={() => toggleFile(file.id)}
                                        aria-label={`Select ${file.name}`}
                                    />
                                    }
                                </TableCell>
                                <TableCell className="font-medium w-1/2 whitespace-normal break-all overflow-hidden">
                                    <div className="flex items-center">
                                        {file.directory?
                                            <div className='cursor-pointer flex' onClick={event => setRelativePath(file.id)}>
                                                <Folder className="mr-2 h-4 w-4 text-blue-700 flex-shrink-0"/>
                                                {file.name}
                                            </div>
                                            :
                                            <div className='flex'>
                                                <FileIcon className="mr-2 h-4 w-4 flex-shrink-0"/>
                                                {file.name}
                                            </div>
                                        }
                                    </div>
                                </TableCell>
                                <TableCell>{file.directory?"":formatFileSize(file.size)}</TableCell>
                                <TableCell>{file.directory?"":formatUTCTimeToLocal(file.lastModified)}</TableCell>
                                <TableCell>
                                    <FileActions handleDownload={handleDownload}
                                                 handleFileDelete={handleFileDelete}
                                                 relativePath={relativePath}
                                                 userFile={file}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between px-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        {selectedCount > 0 ? <span>{selectedCount} file(s) selected</span> : <span>No files selected</span>}
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={previousPage} disabled={currentPage === 1}>
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

