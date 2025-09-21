export class StreamModel {
    url: string
    id: string
    title: string
    description: string
    playlistCount: number
    entries: StreamEntry[]
    authenticationTag: string
}

export class StreamEntry {
    id: string
    title: string
    thumbnail: string
    uploader: string
    releaseDate: string
    duration: number
    artist: string | null
    album: string
    webpageUrl: string
    formats: StreamFormat[]
}

export class StreamFormat {
    id: string ;
    resolution: string;
    width: number;
    height: number;
    bytes: number;
    isSizeApproximate: boolean;
    fileExtension: string;
    protocol: string;
    tbr: number;
    vbr: number;
    abr: number;
}