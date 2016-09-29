import React, {PropTypes, Component} from 'react'
import '../styles//user.css'

export default class User extends Component {
    render() {
        const {name} = this.props
        return <div className='user'>
                <p>Hello {name}!</p>
            </div>
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired
}