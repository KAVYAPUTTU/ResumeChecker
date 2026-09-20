//if frontend needs to communicate with the backend then we need a pakage called axios
import axios from "axios"

//to avoid repeted tasks like 
//const response = await axios.post('http://localhost:3000/api/auth/register'
// setting withCredentials: true
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
export async function register({ username, email, password }) {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register',
            {
                username, email, password
            }, {
            //"Send my cookies along with this request."
            withCredentials: true
        })

        return response.data
    } catch (error) {
        console.log(error);

    }

}

export async function login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })

        return response.data
    } catch (error) {
        console.log(error);

    }
}

export async function logout() {
    try {
        const response = await axios.get('/api/auth/logout')

        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function getme() {
    try {
        const response = await axios.get('/api/auth/get-me',)

        return response.data
    } catch (error) {
        console.log(error);
    }
}