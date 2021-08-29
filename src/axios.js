import axios from "axios"
const instance = axios.create({
    baseURL:"https://ancient-springs-49674.herokuapp.com"
})
export default instance;