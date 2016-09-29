import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'

class ArticlesFilterForm extends Component {

    render(){
        const {handleSubmit} = this.props
        return <div className='filterForm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <Field name='firstName' component='input' type='text' placeholder='First name'/>
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <Field name='lastName' component='input' type='text' placeholder='Last name'/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <Field name='email' component='input' type='email' placeholder='E-mail'/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
          </div>
    }
}

export default reduxForm({form: 'filterForm'})(ArticlesFilterForm)