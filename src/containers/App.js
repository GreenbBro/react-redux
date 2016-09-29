import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import Articles from '../components/Articles'
import ArticlesFilterForm from '../components/ArticlesFilterForm'
import Editor from '../components/Editor'
import * as pageActions from '../actions/PageActions'
import * as articlesActions from '../actions/ArticlesActions'

class App extends Component {
    render() {
        const {user, page, articles} = this.props
        const {getPhotos} = this.props.pageActions
        const {getArticles} = this.props.articlesActions
        const text = '<h1>Lorem text</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et mollis turpis. In consequat justo orci, ut convallis dui ornare in. Mauris ligula diam, volutpat vel ipsum eget, consequat hendrerit nulla. Donec lacinia tellus at velit dignissim rhoncus. Etiam dolor sem, venenatis ac lorem et, placerat eleifend libero. Nunc eleifend est in lacinia maximus. Vestibulum rhoncus nunc eu enim interdum molestie. Nulla at fringilla lacus. Pellentesque tincidunt lacus eget varius aliquet. Phasellus vitae neque eu diam ultricies semper a a ante. Fusce hendrerit ligula metus, ut laoreet augue consequat in. Phasellus gravida quis risus at euismod. Praesent fringilla posuere nulla, vitae accumsan nulla finibus vel. Curabitur non lectus eget turpis convallis ultricies vel eget quam.</p><h2>Lorem text 2</h3><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In varius, elit ut faucibus iaculis, neque sapien dapibus ipsum, vel ultrices eros mi laoreet dui. Donec nulla leo, pharetra sit amet erat ac, ultricies sodales est. Praesent vel hendrerit mauris. In ut tempus nisl. Nam id lectus faucibus magna dapibus dapibus. Morbi finibus neque non nibh pretium facilisis. Quisque at tortor ut diam condimentum maximus. Vestibulum et neque nec ante ultricies efficitur ut eu eros. Nulla commodo sit amet sapien quis ultrices. Curabitur pretium orci id tellus luctus semper. Quisque vel mattis leo. Quisque tortor libero, sollicitudin quis pretium sit amet, congue vestibulum ante. Vestibulum fermentum vitae ex sit amet ultrices. Aliquam vel arcu volutpat, rhoncus velit quis, tempus purus.</p>'

        return <div>
                <User name={user.name} />
                <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={page.fetching}/>
                <ArticlesFilterForm />
                <Editor text={text}/>
                <Articles list={articles.list} getArticles={getArticles} fetching={articles.fetching}/>
            </div>
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        page: state.page,
        articles: state.articles
    }
}

function mapDispatchToProps(dispatch){
    return {
        pageActions: bindActionCreators(pageActions, dispatch),
        articlesActions: bindActionCreators(articlesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)