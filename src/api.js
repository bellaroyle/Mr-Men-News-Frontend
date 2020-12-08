import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-api-br.herokuapp.com/api"
})

export const getTopics = () => {
    return ncNewsApi.get('/topics').then(res => {
        return res.data.topics
    })
}
export const getArticles = (topic) => {
    return ncNewsApi.get('/articles', { params: { topic } }).then(res => {
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