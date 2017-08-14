import React from 'react';
import Request from 'superagent'; 

class LoginModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    handleSubmit(event){
        event.preventDefault();        
        Request
            .post('/login')
            .send({email: "tashi@tashi.com", password: "tshi"})
            .end((err, res) => {
                if(err){                    
                    this.setState({err: res.body.error});
                    // alert(JSON.stringify(this.state.err));

                } else {
                    this.setState({err: ""});
                    $('#loginModal').modal('close');                                        
                }
            });
    }
    render(){
        return(
            <div id="loginModal" className="modal">
                <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                <div className="modal-content">
                    <h5>Login</h5>
                    {/* <div id="card-alert" className="card-red lighten-5"> */}
                        <div className="card-content red-text">
                            {this.state.err}
                        </div>
                        {/* <button type="button" className="close red-text" data-dimiss="alert" aria-label="close">
                            <span aria-hidden="true">x</span>
                        </button>
                    </div> */}
                    <form className="row center" onSubmit={this.handleSubmit}>
                        <div className="input-field col s12">
                            <input id="email" type="email" name="email" ref="email" className="validate" />
                            <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                        </div>
                        <div className="input-field col l12">
                            <input id="password" type="password" name="password" ref="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field col l12">
                            <label htmlFor="error">{}</label>
                        </div>                        
                        <button className="btn-large waves-effect waves-light" type="submit" name="action">Login
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default LoginModal;