"use client"

import FileMetadataTable from "@/app/sitecomponents/FileMetadataTable";

export default function FileTableWithParam({groupId}:{groupId:string}) {

    return (
            <FileMetadataTable groupId={groupId}/>
    );

}