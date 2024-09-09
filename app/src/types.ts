export interface ProjectsResponse {
    id: number,
    title: String,
    content: String,
    year?: Date,
    status?: String,
    techs?: number[],
}