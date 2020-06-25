import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import LoginForm from './LoginForm';
import Student from './Student';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            isPostBtnEnbl: true,
            isOpen: true,
            panel: '',
            students: [
                {
                    _id: '',
                    userName: '',
                    address: '',
                    image: '',
                    email: '',
                    like: 0,
                    comments: []
                }
            ]
        }
    }
    onUpdateLike(Students) {
        let { students } = this.state;
        var commentIndex = students.findIndex(function (c) {
            return c.userName === Students.userName;
        });
        students[commentIndex].like++;
        console.log(students[commentIndex].like);
        this.setState({ students: students });
    }

    loadData(){
        let apiUrl = "http://localhost:3020/student";
        fetch(apiUrl, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => this.renderUser(data));
    }

    onUpdateComment = (Students, e) => {
        let { students } = this.state;
        var commentIndex = students.findIndex(function (c) {
            return c.userName === Students.userName;
        });
        students[commentIndex].comments.push(e.target.value);
        e.target.value = '';
        console.log(e.target.value);
        this.setState({ students: students });
    }

    toggleForm() {
        let { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    togglePostBtn() {
        let { isPostBtnEnbl } = this.state;
        this.setState({ isPostBtnEnbl: !isPostBtnEnbl });
    }

    onPostComments(e) {
        let fieldValue = e.target.value;
        let { isPostBtnEnbl } = this.state;
        if (fieldValue.length > 0 && isPostBtnEnbl === true) {

            this.setState({ isPostBtnEnbl: false });;
        } else if (fieldValue.length === 0) {
            this.setState({ isPostBtnEnbl: true });;
        }
    }
    //this method is for hardcoded data
    // renderUser() {
    //     let { students, panel } = this.state;
    //     panel = students.map((student, idx) => {
    //         return <Student addLikes={(item) => { this.onUpdateLike(item) }}
    //             addComments={this.onUpdateComment}
    //             student={student} onUpdate={this.onUpdate} key={idx} />;
    //     });
    //     this.setState({ panel: panel });
    // }

    renderUser(newStudents) {
        console.log('REST Api call::' + newStudents);
        let { students, panel } = this.state;
        panel = newStudents.map((student, idx) => {
            return <Student addLikes={(item) => { this.onUpdateLike(item) }}
                addComments={this.onUpdateComment}
                student={student} onUpdate={this.onUpdate} key={idx} />;
        });
        this.setState({
            panel: panel,
            students: newStudents
        });
    }

    render() {
        let { user, isOpen, panel } = this.state;

        if (!isOpen) {
            return (
                <LoginForm />
            )
        } else {
            return (
                <Router>
                    <div className="card" >
                        <div className="card-header">
                            <span className="card-title-right">Welcome {user}</span>
                            <button className="btn btn-link" onClick={() => { this.toggleForm() }}>
                                Sign Out
                            </button> &nbsp;
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <button className="btn btn-link" onClick={() =>this.loadData()}>View User</button></li>
                        </ul>
                        <div className="card-Borda">&nbsp;
                            <textarea className="form-control" cols="50" onChange={(e) => this.onPostComments(e)}></textarea>
                            &nbsp;
                            <button className="btn btn-info" disabled={this.state.isPostBtnEnbl}>Post</button>
                            {this.state.isPostBtnEnbl}
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                {panel}
                            </div>
                        </div>
                    </div>
                </Router>
            )
        }
    }
}

export default Dashboard;