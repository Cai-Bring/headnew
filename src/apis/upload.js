import axios from '@/utiles/myaxios.js'

export const uploadfiles = (data) => {
    return axios({
        method: 'post',
        url: '/upload',
        data
    })
}