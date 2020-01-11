import axios from '@/utiles/myaxios.js'


export const getCateList = () => {
    return axios({
        url: '/category'
    })
}