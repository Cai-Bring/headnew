import axios from '@/utiles/myaxios.js'

export const postList = (params) => {
    return axios({
        url: '/post',
        params
    })
}

// 获取评论数据
export const getCommentList = (id, params) => {
    return axios({
        url: `/post_comment/${id}`,
        params
    })
}

// 搜索文章
export const searchArticle = (params) => {
    return axios({
        url: `/post_search`,
        params
    })
}