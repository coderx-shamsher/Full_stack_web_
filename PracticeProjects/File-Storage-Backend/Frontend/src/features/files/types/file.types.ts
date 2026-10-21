export type FileTypes =  "Folder" | "PDF" | "Image" | "Excel" | "Text";

export interface FileItem {
    id : number,
    name : string,
    type : FileTypes,
    size : string,
    modified : string
}

