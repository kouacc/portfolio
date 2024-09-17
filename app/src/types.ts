export interface ProjectsResponse {
    id: number,
    title: String,
    content: String,
    year?: Date,
    status?: String,
    repository?: String,
    techs?: number[],
    created: Date,
    modified: Date,
}

export interface ProjectPreviewResponse {
    title: String,
    content: String,
    year?: Date,
    status?: String,
    techs?: number[]
}