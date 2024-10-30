'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {formatFileSize} from "@/app/utils/FileUtils";

interface FileMetadata{
    name:string;
    size:number;
    lastModified:string;
}
export default function UserTable() {
    const queryClient = useQueryClient()
    console.log("UserTable re-render!")
    const {data}:{data:FileMetadata[]} = useQuery({
        queryKey: ['fileData'],
        queryFn: ({queryKey}) => {
            const {groupId} = queryClient.getQueryData(['files_']);
            return fetch(`/bff/file/metadata/${groupId}`).then(res => res.json());
        }
    });
    const tempData = data ? data : [] ;
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const totalPages =  Math.ceil(tempData.length / itemsPerPage) ;
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentFiles =  tempData.slice(startIndex, endIndex);

    return (
        <>
            <div className="w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentFiles.map((fileMetadata) => (
                            <TableRow key={fileMetadata.name}>
                                <TableCell>{fileMetadata.name}</TableCell>
                                <TableCell>{formatFileSize(fileMetadata.size)}</TableCell>
                                <TableCell>{fileMetadata.lastModified}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">
                            Showing {startIndex + 1}-{Math.min(endIndex, tempData.length)} of {tempData.length}
                        </p>
                        <Select
                            value={itemsPerPage.toString()}
                            onValueChange={(value) => setItemsPerPage(Number(value))}
                        >
                            <SelectTrigger className="w-[70px]">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeftIcon className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRightIcon className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}