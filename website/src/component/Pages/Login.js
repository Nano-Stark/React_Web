import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as authActions from '../../store/actions/authActions';

const fields = [
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your email'},
    {name: 'password', elementName: 'input', type: 'password', placeholder: 'Your password'}
]

class Login extends Component {
    render(){
        return (
            
            <div className='login-page'>
                <div className='container'>
                    <div className='login-form'>
                        <div className='row'>
                            <h1>Login</h1>
                        </div>
                        <div>
                            {/*<form onSubmit={this.props.handleSubmit}>*/}
                            <form className='row' onSubmit = {e => {
                                e.preventDefault();
                                this.props.login(this.props.values.email, this.props.values.password);
                            }}>
                            {fields.map((f, i) => {
                                return (
                                <div className='col-md-12'>
                                <Field 
                                key={i}
                                {...f}
                                value={this.props.values[f.name]}
                                name={f.name}
                                onChange={this.props.handleChange}
                                onBlur={this.props.handleBlur}
                                touched={(this.props.touched[f.name])}
                                errors={this.props.errors[f.name]}
                                />
                                </div>
                                )
                            })}
                            <div className='col-md-12'>
                                <button className='btn btn-primary'>Login</button>
                            </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

//functions passed 
const mapDispatchToProps = dispatch => {
    return {
        login: (email, pass) => {
            dispatch(authActions.login(email, pass));
        }
    }
}

//check Contact.js fot similar formik
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required!'),
        password: Yup.string().required('Password is required to login!')
    }),
    handleSubmit: (values, {setSubmitting}) => {
        console.log("Login attempts", values);
        //this.props.login(values.email, values.password); // redux 
    }
})(Login)); //redux