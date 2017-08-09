import React from 'react';
import Request from 'superagent';

export default class MyProfilePage extends React.Component{    
    constructor(props){
        super(props);
        this.state ={
            email: "swollen@plums.com",
            nickname: "Swollen Plums",
            phone: "416-416-4161"
        }
    }    
    get(){        

    }

    render(){
        return(            
            <div className="container">                                                    
                <div className="row">                    
                        <h5><center><b>My Profile</b> - update your information</center></h5>                                        
                        <div className="col s6">                         
                            <div className="card-panel">
                                <h6><b>Account Details</b></h6>
                                <label for="nickname">Nickname (optional):</label>
                                <input placeholder={this.state.nickname} id="nickname" type="text" class="validate" />

                                <label for="email">Email: </label>
                                <input placeholder={this.state.email} id="nickname" type="text" class="validate" />

                                <label for="phone">Phone Number (optional):</label>
                                <input placeholder={this.state.phone} id="phone" type="text" class="validate" />

                                <label for="newpassword">New Password:</label>
                                <input placeholder="New Password" id="newpassword" type="password" class="validate" />
                                <label for="confirmnewpassword">Confirm New Password:</label>
                                <input placeholder="Confirm New Password" id="confirmnewpassword" type="password" class="validate" />

                                <label for="password">*Password:</label>
                                <input placeholder="Password" id="password" type="password" class="validate" />

                                <button class="btn waves-effect waves-light" type="submit" name="action">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                        <div className="col s6"> 
                            <div className="card-panel">
                                <h6><b>Account Summary</b></h6>
                                <table>
                                    <tr>
                                        Email: 
                                    </tr>      
                                    <tr>
                                        <i>{this.state.email}</i>
                                    </tr>
                                    <tr>
                                        Nickname: 
                                    </tr>      
                                    <tr>
                                        <i>{this.state.nickname}</i>
                                    </tr>
                                    <tr>
                                        Phone Number: 
                                    </tr>      
                                    <tr>
                                        <i>{this.state.phone}</i>
                                    </tr>                            
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}