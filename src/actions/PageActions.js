import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS
} from '../constants/PageConstants'
//import { GET_ARTICLES_REQUEST } from '../constants/ArticlesConstants'

export function getPhotos(year) {

    return (dispatch, getState) => {
        dispatch({
            type: GET_PHOTOS_REQUEST
        })

        setTimeout(() => {
            // to avoid error about unused 'page'
            console.log('year is ', year)
            const state = getState();
            console.log(state);

            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 1000)
    }
}