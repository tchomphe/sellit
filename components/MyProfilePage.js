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
                        <h6><b>Account Details</b></h6>
                        <label for="nickname">Nickname (optional):</label>
                        <input placeholder={this.state.nickname} id="nickname" type="text" class="validate" />

                        <label for="email">Email: </label>
                        <input placeholder={this.state.email} id="nickname" type="text" class="validate" />

                        <label for="nickname">Phone (optional):</label>
                        <input placeholder={this.state.phone} id="nickname" type="text" class="validate" />

                        
                    </div>
                    <div className="col s6"> 
                        <h6><b>Account Summary</b></h6>
                              <p class="z-depth-5">z-depth-5</p>
                    </div>
                </div>
            </div>
        )
    }
}