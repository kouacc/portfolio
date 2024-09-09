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