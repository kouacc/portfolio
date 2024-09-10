export interface ProjectsResponse {
    id: number,
    title: String,
    content: String,
    year?: Date,
    status?: String,
    techs?: number[],
}

export interface ProjectPreviewResponse {
    title: String,
    content: String,
    year?: Date,
    status?: String,
    techs?: number[]
}