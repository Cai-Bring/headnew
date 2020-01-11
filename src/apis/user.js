import axios from '@/utiles/myaxios.js'

// 点击登录
export const login = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
// 点击注册
export const register = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}
// 进入个人中心页面，根据id获取用户详情
export const getuseid = (id) => {
    return axios({
        url: `/user/${id}`,
        // 自定义的请求头，用于提供授权谁
        // headers:{后台规定的key:token}
        // headers: { 'Authorization': localStorage.getItem('key') }
    })
}

// 根据id编辑个人内容
export const uploadbyid = (id, data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}

// 搜查文章
export const getarticleid = (id) => {
    return axios({
        url: `/post/${id}`
    })
}

// 关注用户
export const followUser = (id) => {
    return axios({
        url: `/user_follows/${id}`
    })
}

// 取消关注用户
export const unfollowUser = (id) => {
    return axios({
        url: `/user_unfollow/${id}`
    })
}

// 点赞
export const likeArticle = (id) => {
    return axios({
        url: `/post_like/${id}`
    })
}
// 收藏文章
export const collectArticleById = (id) => {
    return axios({
        url: `/post_star/${id}`
    })
}

// 获取关注列表
export const getMyFollows = () => {
    return axios({
        url: `/user_follows`
    })
}

// 取消关注
export const unFollowUser = (id) => {
    return axios({
        url: `/user_unfollow/${id}`
    })
}

//获取文章收藏列表
export const getstar = () => {
    return axios({
        url: '/user_star'
    })
}

export const commentarticle = (id, data) => {
    return axios({
        method: 'post',
        url: `/post_comment/${id}`,
        data
    })
}