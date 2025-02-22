"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileIcon, MoreVertical, ChevronLeft, ChevronRight, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useCallback } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// This would typically come from your API
const allFiles = [
    { id: "1", name: "Document1.pdf", type: "PDF", size: "2.5 MB", modified: "2024-02-22" },
    { id: "2", name: "Image1.jpg", type: "Image", size: "1.8 MB", modified: "2024-02-21" },
    { id: "3", name: "Spreadsheet1.xlsx", type: "Spreadsheet", size: "4.2 MB", modified: "2024-02-20" },
    { id: "4", name: "Document2.pdf", type: "PDF", size: "1.5 MB", modified: "2024-02-19" },
    { id: "5", name: "Image2.jpg", type: "Image", size: "2.8 MB", modified: "2024-02-18" },
    { id: "6", name: "Spreadsheet2.xlsx", type: "Spreadsheet", size: "3.2 MB", modified: "2024-02-17" },
    { id: "7", name: "Document3.pdf", type: "PDF", size: "5.5 MB", modified: "2024-02-16" },
    { id: "8", name: "Image3.jpg", type: "Image", size: "1.2 MB", modified: "2024-02-15" },
    { id: "9", name: "Spreadsheet3.xlsx", type: "Spreadsheet", size: "2.7 MB", modified: "2024-02-14" },
    { id: "10", name: "Document4.pdf", type: "PDF", size: "3.5 MB", modified: "2024-02-13" },
    { id: "11", name: "Image4.jpg", type: "Image", size: "4.8 MB", modified: "2024-02-12" },
    { id: "12", name: "Spreadsheet4.xlsx", type: "Spreadsheet", size: "1.2 MB", modified: "2024-02-11" },
    { id: "13", name: "Document5.pdf", type: "PDF", size: "2.9 MB", modified: "2024-02-10" },
    { id: "14", name: "Image5.jpg", type: "Image", size: "3.8 MB", modified: "2024-02-09" },
    { id: "15", name: "Spreadsheet5.xlsx", type: "Spreadsheet", size: "2.2 MB", modified: "2024-02-08" },
]

export default function UserFilesTable() {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())

    const totalFiles = allFiles.length
    const totalPages = Math.ceil(totalFiles / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentFiles = allFiles.slice(startIndex, endIndex)

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
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Modified</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentFiles.map((file) => (
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
                                <TableCell>{file.type}</TableCell>
                                <TableCell>{file.size}</TableCell>
                                <TableCell>{file.modified}</TableCell>
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

