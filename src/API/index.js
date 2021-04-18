const axios = require('axios')

const api = axios.create({
    baseURL : 'https://my-json-server.typicode.com/donut1531/Numerical-Method'
})

const get_Root_of_equation = () => api.get('/root_of_equation')
const get_Matrix = () => api.get('/matrix')
const get_Matrix_Interpolation = () => api.get('/interpolation')
const get_Matrix_Regression = () => api.get('/regression')
const all_Api = {
    get_Root_of_equation,
    get_Matrix,
    get_Matrix_Interpolation,
    get_Matrix_Regression
}
export default all_Api