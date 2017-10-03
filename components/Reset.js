import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';

class Reset extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Reset</h1>
                {/* <form className="col s12 center" method="post" action="/createUser" >
                    <div className="row">
                        <InputField fieldClass="col s6" labelText="* Password"
                            id="password" type="password" required="required" />
                        <InputField fieldClass="col s6" labelText="* Confirm Password" labelSuccess="match" labelError="mismatch"
                            id="confirm_password" type="password" required="required" />                        
                    </div>
                    <button className="btn-large waves-effect waves-light" type="submit" name="action">
                        Update
                    </button>
                </form> */}
            </div>
        )
    }

}
export default withRouter(Reset);