import React from 'react';
import Request from 'superagent';

class PostContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sender_email:"",
            sender_name:"",
            message:"",
            receiver_email:"",
            err: "",
            ownerId: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.sender_email !== ""){
            if(this.state.message !== ""){
                Request
                    .post('/send')
                    .send({
                        ownerId: this.props.ownerId,
                        sender_name: this.state.sender_name,
                        sender_email: this.state.sender_email,
                        message: this.state.message
                    })
                    .end((err, res) => {
                        if(err){
                            this.setState({err: res.body.error});
                        } else {
                            this.setState({err: ""});
                            Materialize.toast('Message sent!', 4000);
                            this.setState({
                                sender_email: "",
                                name: "",
                                message: ""
                            });
                        }
                    });
            } else {
                $(`#${this.props.id} #message`).removeClass("valid").addClass("invalid");
            }
        } else {
            $(`#${this.props.id} #sender_email`).removeClass("valid").addClass("invalid");
        }
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s8">
                            <input id="sender_email" name="sender_email" value={this.state.sender_email} type="email" className="validate" onChange={this.handleInputChange} />
                            <label htmlFor="email" data-error="Enter a valid email" data-success="">* Email</label>
                        </div>
                        <div className="input-field col s4">
                            <input name="sender_name" value={this.state.sender_name} type="text" className="validate" onChange={this.handleInputChange} />
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="message" name="message" value={this.state.message} className="materialize-textarea validate" onChange={this.handleInputChange} />
                            <label htmlFor="message" data-error="Message cannot be empty" data-success="">Message</label>
                        </div>
                    </div>
                    <div className="row right-align">
                        <button className="btn black" type="submit"> Send </button>
                    </div>
            </form>
        );
    }
}

export default PostContact;