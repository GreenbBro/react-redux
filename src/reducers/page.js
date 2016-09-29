import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_FAILURE
} from '../constants/PageConstants'

const initialState = {
    year: 2016,
    photos: [],
    fetching: false
}

export default function page(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return { ...state, year: action.payload, fetching: true }

        case GET_PHOTOS_SUCCESS:
            return { ...state, photos: action.payload, fetching: false }

        case GET_PHOTOS_FAILURE:
            return { ...state, photos: action.error, fetching: false }

        default:
            return state;
    }

}