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
import {AlertTriangle, Check, ChevronLeftIcon, ChevronRightIcon, CloudDownload, Copy, FileArchive} from "lucide-react"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {formatFileSize} from "@/app/utils/FileUtils";
import axios from "axios";
import {Alert, AlertDescription} from "@/components/ui/alert";

interface FileMetadata{
    id:string;
    name:string;
    size:number;
    lastModified:string;
}
export default function UserTable({groupId}:{groupId?:string|null}) {
    const queryClient = useQueryClient();
    const [isCopied, setIsCopied] = useState(false);

    const useQueryReturnedValue = useQuery({
        queryKey: ['fileData'],
        queryFn: ({queryKey}) => {
            const searchedGroupIdObj = groupId ? {groupId} : queryClient.getQueryData(['files_']) ;
            // const {groupId} = queryClient.getQueryData(['files_']);//necessary for re-rendering
            if (!searchedGroupIdObj)
                return null;// to prevent isStale=true and status=error
            return axios.get(`/bff/file/metadata/${searchedGroupIdObj.groupId}`).then(res=> res.data);
        },
        staleTime: Infinity,
        retry: false
    });
    console.log(JSON.stringify(useQueryReturnedValue));
    const {data,status}:{data:FileMetadata[],status:string} = useQueryReturnedValue;

    const groupIdObj = groupId ? {groupId} : queryClient.getQueryData(['files_']);
    const baseURL:string=window.location.origin;
    const createDirectDownloadLink = (fileId:string):string=>{
    return `${baseURL}/bff/file/download/${fileId}`;
    };
    const createZipDirectDownloadLink = ():string=>{
    return `${baseURL}/bff/file/download/zip/${groupIdObj.groupId}`;
    };

    const handleCopyLink = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        navigator.clipboard.writeText(createZipDirectDownloadLink()).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    const tempData = data && status === 'success' ? data : [] ;
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
                            <TableHead>Direct Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentFiles.map((fileMetadata) => (
                            <TableRow key={fileMetadata.id}>
                                <TableCell>{fileMetadata.name}</TableCell>
                                <TableCell>{formatFileSize(fileMetadata.size)}</TableCell>
                                <TableCell>
                                    <Button
                                    variant='link'
                                    size='icon'
                                    asChild
                                    className='hover:text-green-600'>
                                        <a href={createDirectDownloadLink(fileMetadata.id)} download>
                                            <CloudDownload />
                                        </a>
                                    </Button>
                                </TableCell>
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
                {status==='error'?
                    <Alert variant="destructive" className="w-3/4 mt-3">
                        <AlertTriangle className='h-4 w-4' />
                        <AlertDescription>No files available for download.</AlertDescription>
                    </Alert>
                    :
                    data && status === 'success' ?
                    <div className="mt-6 flex">
                        <div className="flex w-3/4 rounded-md overflow-hidden">
                            <Button
                                className="flex-grow text-green-600 bg-secondary hover:text-white hover:bg-green-700 text-lg rounded-r-none"
                            >
                                <a href={createZipDirectDownloadLink()} download>
                                    <FileArchive className="mr-2 h-4 w-4 inline"/>
                                    Download All
                                </a>
                            </Button>
                            <Button
                                onClick={handleCopyLink}
                                size='icon'
                                className="w-1/4 bg-secondary text-green-600 hover:bg-green-700 hover:text-white rounded-l-none border-l border-green-400"
                            >
                                {isCopied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                            </Button>
                        </div>
                    </div>
                    :<></>}
            </div>
        </>
    );
}