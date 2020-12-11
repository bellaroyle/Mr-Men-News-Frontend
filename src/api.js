import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-api-br.herokuapp.com/api"
})

export const getTopics = () => {
    return ncNewsApi.get('/topics').then(res => {
        return res.data.topics
    })
}
export const getArticles = (topic, sort_by, order, author) => {
    if (topic === 'all') {
        topic = null
    }
    return ncNewsApi.get('/articles', { params: { topic, sort_by, order, author, limit: 1000 } }).then(res => {
        return res.data.articles
    })
}
export const getArticleById = (articleId) => {
    return ncNewsApi.get(`/articles/${articleId}`).then(res => {
        return res.data.article
    })
}

export const updateVote = (inc_votes, article_id) => {
    return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes }).then(res => {
        return res.data.article
    })
}

export const getComments = (article_id, limit) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`, { params: { limit } }).then(res => {
        return res.data.comments
    })
}
export const getCommentById = (comment_id) => {
    return ncNewsApi.get(`/comments/${comment_id}`).then(res => {
        return res.data.comment
    })
}
export const updateCommentVote = (inc_votes, comment_id) => {
    return ncNewsApi.patch(`/comments/${comment_id}`, { inc_votes }).then(res => {
        return res.data.comment
    })
}

export const getUser = (username) => {
    return ncNewsApi.get(`/users/${username}`).then(res => {
        return res.data.user
    })
}
export const postComment = (body, username, articleId) => {
    return ncNewsApi.post(`/articles/${articleId}/comments`, { username, body }).then(res => {
        return res.data.comment
    })
}