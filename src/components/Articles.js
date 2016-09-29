import React, {PropTypes, Component} from 'react'
import Article from './Article'
import '../styles/articles.css'

export default class Articles extends Component {

    onGetArticlesClick(){
        this.props.getArticles()
    }

    componentWillMount(){
        this.props.getArticles()
    }

    render(){
        const {list, fetching} = this.props

        return <div className='articles'>
                <div className='article header'>
                    <div>#</div>
                    <div>title</div>
                    <div>color</div>
                    <div>category</div>
                    <div>time</div>
                </div>
                {
                    fetching?
                        <div>Loading...</div>
                    : ''
                }
                {
                    list.map(article => {
                        return <Article data={article} key={article.id}/>
                    })
                }
                <button onClick={::this.onGetArticlesClick}>get articles</button>
            </div>
    }
}

Articles.propTypes = {
    list: PropTypes.array.isRequired,
    getArticles: PropTypes.func.isRequired
}