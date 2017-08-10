import React from 'react';
import Request from 'superagent';
import NavigationHeader from './NavigationHeader';

export default class MyProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email: "swollen@plums.com",
            nickname: "Swollen Plums",
            phone: "416-416-4161"
        }
    }
    componentWillMount(){
        Request.get('/userByEmail/tashi@tashi.com').then((res) => {
            this.setState({
                email:res.body.email,
                nickname: res.body.nickname,
                phone: res.body.phone
            });
        });
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <NavigationHeader authorizedUser={true} searchPost={null} />
                </div>
                <div className="row">
                        <h5 className="profilePageHeader"><b>My Account</b> - update your information</h5>
                        <div className="col s6">
                            <div className="card-panel">
                                <h6><b>Account Details</b></h6>
                                <label htmlFor="nickname">Nickname (optional):</label>
                                <input placeholder={this.state.nickname} id="nickname" type="text" className="validate" />

                                <label htmlFor="email">Email: </label>
                                <input placeholder={this.state.email} id="nickname" type="text" className="validate" />

                                <label htmlFor="phone">Phone Number (optional):</label>
                                <input placeholder={this.state.phone} id="phone" type="text" className="validate" />

                                <label htmlFor="newpassword">New Password:</label>
                                <input placeholder="New Password" id="newpassword" type="password" className="validate" />
                                <label htmlFor="confirmnewpassword">Confirm New Password:</label>
                                <input placeholder="Confirm New Password" id="confirmnewpassword" type="password" className="validate" />

                                <label htmlFor="password">*Password:</label>
                                <input placeholder="Password" id="password" type="password" className="validate" />

                                <button className="btn waves-effect waves-light" type="submit" name="action">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="card-panel">
                                <h6><b>Account Summary</b></h6>
                                <table>
                                    <tbody>
                                    <tr><td>Email:</td></tr>
                                    <tr><td><i>{this.state.email}</i></td></tr>
                                    <tr><td>Nickname:</td></tr>
                                    <tr><td><i>{this.state.nickname}</i></td></tr>
                                    <tr><td>Phone Number:</td></tr>
                                    <tr><td><i>{this.state.phone}</i></td></tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}