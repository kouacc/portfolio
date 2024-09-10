import axios from 'axios'

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

export async function fetchProject(id: number) {
    try {
        return await axios.get(`/api/project/${id}`)
    } catch (error) {
        console.log(error)
    }
}