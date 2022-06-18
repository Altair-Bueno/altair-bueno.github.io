export interface Resume {
    title?: string
    content?: Content
    links?: Object,
}

export interface Content {
    description: string,
    keypoints: string[]
}
