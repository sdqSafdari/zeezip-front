"use client"

import {useSearchParams} from "next/navigation";
import FileMetadataTable from "@/app/sitecomponents/FileMetadataTable";

export default function FileTableWithParam() {
    const readonlyURLSearchParams = useSearchParams();
    const queryParamGroupId = readonlyURLSearchParams.get('groupId');

    return (
        <div className='w-full sm:w-1/4 sm:basis-1/4 border-2 rounded-md p-4'>
            <h6 className='text-2xl font-semibold leading-none tracking-tight mb-3'>Download Box</h6>
            <FileMetadataTable groupId={queryParamGroupId}/>
        </div>
    );

}