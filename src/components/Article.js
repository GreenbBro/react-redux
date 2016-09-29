import React, {PropTypes, Component} from 'react'

export default class Article extends Component {

    render() {
        const {data} = this.props

        return <div className='article'>
                <div>
                    <a href={'http://tass.24.dev' + data.section.url + '/' + data.id} target='_blank'>
                        {data.id}
                    </a>
                </div>
                <div>{data.title}</div>
                <div>{data.color}</div>
                <div>{data.section.title}</div>
                <div>{new Date(data.time * 1000).toLocaleString()}</div>
            </div>
    }
}

Article.propTypes = {
    data: PropTypes.object.isRequired
}