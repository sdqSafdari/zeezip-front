"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileIcon, MoreVertical, ChevronLeft, ChevronRight, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useCallback } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserFilesListURL} from "@/app/utils/LinkUtils";
import {formatFileSize, formatUTCTimeToLocal} from "@/app/utils/FileUtils";

interface UserFileMetadata{
    id:string;
    name:string;
    lastModified:string;
    size:number;
    directory:boolean;
}

export default function UserFilesTable() {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())

    const {data, status}:{data:UserFileMetadata[],status:string} = useQuery({
        queryKey: ["userFiles"],
        queryFn: context => {
            return axios.get(createHttpClientUserFilesListURL()).then(res => res.data);
        },
        staleTime: Infinity,
        retry: 2
    });
    console.log(JSON.stringify(data));
    const userFiles:UserFileMetadata[] = status=='isPending'?[]:data;

    const totalFiles = userFiles.length;
    const totalPages = Math.ceil(totalFiles / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentFiles = userFiles.slice(startIndex, endIndex)

    const isAllCurrentPageSelected = currentFiles.every((file) => selectedFiles.has(file.id))
    const isSomeCurrentPageSelected = currentFiles.some((file) => selectedFiles.has(file.id))
    const selectedCount = selectedFiles.size

    const toggleAll = useCallback(() => {
        if (isAllCurrentPageSelected) {
            // Remove all current page files from selection
            setSelectedFiles((prev) => {
                const next = new Set(prev)
                currentFiles.forEach((file) => next.delete(file.id))
                return next
            })
        } else {
            // Add all current page files to selection
            setSelectedFiles((prev) => {
                const next = new Set(prev)
                currentFiles.forEach((file) => next.add(file.id))
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
    }, [selectedFiles])

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

    return (
        <Card className='border-[#7f7669] my-8'>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <CardTitle className='text-green-700'>Private Storage</CardTitle>
                        {selectedCount > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8">
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
                    <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">
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
                            <TableHead>Name</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userFiles.map((file) => (
                            <TableRow key={file.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedFiles.has(file.id)}
                                        onCheckedChange={() => toggleFile(file.id)}
                                        aria-label={`Select ${file.name}`}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center">
                                        <FileIcon className="mr-2 h-4 w-4" />
                                        {file.name}
                                    </div>
                                </TableCell>
                                <TableCell>{formatFileSize(file.size)}</TableCell>
                                <TableCell>{formatUTCTimeToLocal(file.lastModified)}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    // Handle single file download
                                                    console.log("Downloading file:", file.id)
                                                }}
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    // Handle single file delete
                                                    console.log("Deleting file:", file.id)
                                                }}
                                                className="text-destructive focus:text-destructive"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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

