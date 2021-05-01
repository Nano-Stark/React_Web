import React, { Component} from 'react';
import Field from './Field';
import {withFormik} from 'formik';
import * as Yup from 'yup';

const field = {
    sections: [
        [
            {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your name'},
            {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your email'},
            {name: 'phone', elementName: 'input', type: 'text', placeholder: 'Your phone number'}
        ],
        [
            {name: 'message', elementName: 'textarea', type: 'text', placeholder: 'Type your message'}
        ]
    ]
}

class Contact extends Component {

    //deleting this due to using formik
    /*constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            message: ''
        }
    }*/
    //due to formik, using inbuilt handleSubmit
    //submitForm = (e) => {
        //e.preventDefault()
        //alert('Form submitted. thank you very much')
    //}

    render() {
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <form id="contactForm" name="sentMessage" noValidate="novalidate" onSubmit={e => this.props.handleSubmit(e)}>
                        <div className="row align-items-stretch mb-5">

                            {field.sections.map((section, i) => {
                                console.log('rendering section', i, 'with', section);
                                return (
                                    <div className="col-md-6" key={i}>
                                        {section.map((field, i) => {
                                            return <Field 
                                                {...field} 
                                                key={i}
                                                //commenting out due to formik
                                                //value={this.state[field.name]} //WRONG using [] makes it a property and not a string/var
                                                //onChange={e => this.setState({[field.name]: e.target.value})}   
                                                value={this.props.values[field.name]}
                                                name={field.name}
                                                onChange={this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                touched={(this.props.touched[field.name])}
                                                errors={this.props.errors[field.name]}
                                            />
                                        })}
                                    </div>
                                )
                            })}

                           {/* <div className="col-md-6">
                                <div className="form-group">
                                    <input 
                                        className="form-control" 
                                        id="name" type="text" 
                                        placeholder="Your Name *" 
                                        required="required" 
                                        data-validation-required-message="Please enter your name." 
                                        value={this.state.name}
                                        onChange={e => this.setState({name: e.target.value})}
                                        />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <input 
                                        className="form-control" 
                                        id="email" type="email" 
                                        placeholder="Your Email *" 
                                        required="required" 
                                        data-validation-required-message="Please enter your email address." 
                                        value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})}
                                        />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="form-group mb-md-0">
                                    <input 
                                        className="form-control" 
                                        id="phone" type="tel" 
                                        placeholder="Your Phone *" 
                                        required="required" 
                                        data-validation-required-message="Please enter your phone number." 
                                        value={this.state.phone}
                                        onChange={e => this.setState({phone: e.target.value})}
                                        />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group form-group-textarea mb-md-0">
                                    <textarea 
                                        className="form-control" 
                                        id="message" 
                                        placeholder="Your Message *" 
                                        required="required" 
                                        data-validation-required-message="Please enter a message."
                                        value={this.state.message}
                                        onChange={e => this.setState({message: e.target.value})}
                                        />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>*/}
                        </div>
                        <div className="text-center">
                            <div id="success"></div>
                            <button 
                                className="btn btn-primary btn-xl text-uppercase" 
                                id="sendMessageButton"
                                 type="submit"
                                 
                                >   
                                Send Message        
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

//using formik
export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        message:''
    }),
    /*validate: values => {
        const errors = {};

        Object.keys(values).map(v => {
            if (!values[v]){
                errors[v] = "Required";

            }
            return errors;//used to remove an warning in my shell, not used in tutorial
        })
        return errors;
        
    },*/
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'Come on, your name is longer').required('You must give us your name.'),
        email: Yup.string().email('Email not valid').required('Email is reqired!'),
        phone: Yup.string()
            .min(10, 'Please provide 10 digit number')
            .max(15,'Phone number too long')
            .required('We need a phone number to reach you at.'),
        message: Yup.string().min(500, 'Provide more detailed information').required('Message is required')

    }),
    handleSubmit: (values, {setSubmitting}) => {
        console.log("VALUES", values);
        console.log("VALUES", JSON.stringify(values));
        alert("You've submitted the form", JSON.stringify(values));//removing json doesnt affect anything i observed
                                                    //but useful when excahnging data
    }
})(Contact);