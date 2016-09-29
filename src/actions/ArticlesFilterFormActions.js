import {
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS
} from '../constants/ArticlesConstants'
import request from 'superagent'

export function getArticles() {

    return (dispatch) => {
        dispatch({
            type: GET_ARTICLES_REQUEST
        })

        request
            .get('/api/news/lenta')
            .set('Content-Type', 'application/json')
            .query({ limit: 25 })
            .end(function(err, res){
                dispatch({
                    type: GET_ARTICLES_SUCCESS,
                    payload: res.body.articles
                })
            }
        )

    }
}