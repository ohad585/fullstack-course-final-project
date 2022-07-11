import {create} from "apisauce";

const apiClient = create({
    baseURL: 'http://10.200.203.38:3000',
    headers: { Accept: 'application/vnd.github.v3+json' },
 })
 export default apiClient