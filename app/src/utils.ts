import axios from 'axios'
import type { ProjectsResponse } from './types'

export async function checkToken(): Promise<Boolean> {
    try {
        await axios.get('/auth/verify')
    } catch (error) {
        console.log(error)
        return false
    }
    return true
}

export async function registerNewProject() {
    try {
        await axios.post('/')
    } catch (error) {
        console.log(error)
    }
}

export async function fetchAllProjets() {
    try {
        const req = await axios.get('/api/projects')
        return req.data
    } catch (error) {
        console.log(error)
    }
}

export async function fetchProject(id: number) {
    try {
        const req = await axios.get(`/api/project/${id}`)
        return req.data
    } catch (error) {
        console.log(error)
    }
}

export async function addProject(project: ProjectsResponse) {
    try {
        const req = await axios.post('/api/protected/createproject', {
            title: project.title,
            content: project.content,
            year: project.year,
            status: project.status,
            repository: project.repository,
            techs: project.techs,
        })
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProject(id: number) {
    try {
        const req = await axios.delete(`/api/protected/deleteproject/${id}`)
        return req.data
    } catch (error) {
        console.log(error)
    }
}

export async function getLogs() {
    try {
        const req = await axios.get('http://localhost:4000/api/protected/logs')
        return req.data
    } catch (error) {
        console.log(error)
    }
}
