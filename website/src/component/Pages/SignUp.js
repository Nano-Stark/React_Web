import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as authActions from '../../store/actions/authActions';

const fields = [
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your email'},
    {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your name'},
    {name: 'password', elementName: 'input', type: 'password', placeholder: 'Your password'},
    {name: 'password2', elementName: 'input', type: 'password', placeholder: 'Your password (Again)'}
]

class SignUp extends Component {
    render(){
        return (
            
            <div className='login-page'>
                <div className='container'>
                    <div className='login-form'>
                        <div className='row'>
                            <h1>SignUp</h1>
                        </div>
                        <div>
                            {/*<form onSubmit={this.props.handleSubmit}>*/}
                            <form className='row' onSubmit = {e => {
                                e.preventDefault();
                                this.props.register(this.props.values.name, this.props.values.email, this.props.values.password);
                            }}>
                            {fields.map((f, i) => {
                                return (
                                <div className='col-md-6'>
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
                                <p className="text-danger text-center">{this.props.auth.error || ''}</p>
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
        register: (name, email, pass) => {
            dispatch(authActions.register(name, email, pass));
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
        name: '',
        password: '',
        password2: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('We need your name'),
        email: Yup.string().email('Email not valid').required('Email is required!'),
        password: Yup.string().min(8, 'Paswword need to be atleast 8 characters long').required('Password is required to login!'),
        password2: Yup.string().required('You need to enter your password again').test('pass-match', 'Password dont match', function(value){
            const {password} = this.parent;
            return password === value;
        })
    }),
    handleSubmit: (values, {setSubmitting}) => {
        console.log("Login attempts", values);
        //this.props.login(values.email, values.password); // redux 
    }
})(SignUp)); //redux

//  CODE COPIED FROM LOGIN.JS