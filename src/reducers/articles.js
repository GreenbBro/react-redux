import {
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_FAILURE
} from '../constants/ArticlesConstants'

const initialState = {
    list: [],
    fetching: false
}

export default function articles(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLES_REQUEST:
            return { ...state, fetching: true }

        case GET_ARTICLES_SUCCESS:
            return { ...state, list: action.payload, fetching: false }

        case GET_ARTICLES_FAILURE:
            return { ...state, list: action.error, fetching: false }

        default:
            return state;
    }

}