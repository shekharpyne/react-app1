import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import LoginForm from './LoginForm';


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        console.log('Calling SignUpForm ');
        this.state = {
            isOpen: true,
            uid: '',
            name: '',
            email: '',
            password: ''
        };

        console.log("constructor this.props.isOpen>>>>> " + this.props.isOpen);

    }

    handleFormSubmit(e) {
        e.preventDefault();
        /* let newUser = {
             uid: this.refs.uid.value,
             name: this.refs.userName.value,
             email: this.refs.Email.value,
             password: this.refs.password.value
         }*/

        // this.setState({
        //     name: 'Ravi',
        //     email: this.refs.email.value,
        //     uid: this.refs.uid.value,
        //     password: this.refs.password.value
        // });

        this.setState({
            isOpen: false,
            name: this.refs.userName.value,
            email: this.refs.email.value,
            uid: this.refs.uid.value,
            password: this.refs.password.value
        });
        this.toggleForm();
    }

    toggleForm() {
        let { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    renderForm() {
        let { isOpen, name, email, uid, password } = this.state;
        console.log("SignupFrm::!isOpen::::::::::::::::"+isOpen);
        if (!isOpen) {
            return (
                <LoginForm />
            )
        }
        else {
            return (

                <div>
                    <div className="card">
                        <form onSubmit={(e) => this.handleFormSubmit(e)}>
                            <div className="card-header">Create New User</div>
                            <br />
                            <div className="card-body">

                                <label>User ID</label>
                                <input type="text" className="form-control" id="userId" ref="uid" placeholder="UserId" />
                                <label>User Name</label>
                                <input type="text" className="form-control" id="userName" ref="userName" placeholder="UserName" />
                                <label>Email ID:</label>
                                <input type="text" className="form-control" id="email" ref="email" placeholder="Email" />
                                <label>Password</label>
                                <input type="text" className="form-control" id="password" ref="password" type="password" placeholder="Password" />
                                <label>Confirm Password</label>
                                <input type="text" className="form-control" id="cPassword" ref="cPassword" type="password" placeholder="Password" />
                                <br />
                                <button className="btn btn-primary">Create</button>&nbsp;
                                <button onClick={() => { this.toggleForm() }} className="btn btn-warning" type="button" >Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

            );
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}

export default SignUpForm;