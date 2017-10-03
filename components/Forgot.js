import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';

class Forgot extends React.Component{
    constructor(props){
        super(props);
    }
    forgotPassword(e){
        e.preventDefault();
        Request
            .post('/forgot')
            .send({email: "tashi.chomphel@gmail.com"})
            .end(function(err, res){
                if(err) {
                    alert('Error!');
                } else {
                    alert('An email reset link has been sent to tashi.chomphel@gmail.com.');
                }
            });
    }
    render(){
        return(
            <div>
                <button className="btn-large waves-effect waves-light" onClick={(e)=>(this.forgotPassword(e))}>
                    Send confirmation<i className="material-icons right">send</i>
                </button>
            </div>
        )
    }
}
export default Forgot;