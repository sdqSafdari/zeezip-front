

export class StreamHistoryDomain{
    createdAt: string;
    state:string;
    streamUri:string;
    streamId:string;
    title:string;
    description:string;
    playlistCount:number;
    entries:StreamEntryHistoryModel[];// not really converted to class instance use @type decorator

    isDownloading() {
        return this.state === 'NEW' || this.state === 'IN_PROGRESS';
    }
}

export class StreamEntryHistoryModel{
    state:string;
    progress:string;
    streamEntryId:string;
    title:string;
    thumbnail:string;
    releaseDate:string;
    duration:number;
    trackNumber:number;
    artist:string;
    album:string;
    webpageUrl:string;
    format:StreamFormatHistoryModel;
    constructor() {
    }
}

export class StreamFormatHistoryModel {
    bytes: number;

    extension: string;

    resolution: string

    protocol: string;

    abr: string;

    vbr: string;

    tbr: string;
}
