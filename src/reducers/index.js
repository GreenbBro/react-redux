import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import articles from './articles'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    page,
    user,
    articles,
    form: formReducer
})