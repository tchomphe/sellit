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
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        Request
            .post('/send')
            .send({
                ownerId: this.props.ownerId,
                sender_name: this.state.sender_name,
                sender_email: this.state.sender_email,
                message: this.state.message
            })
            // .send({ownerId: this.props.ownderId, sender_email: this.state.sender_email, sender_name: this.state.sender_name, message: this.state.message, receiver_email: this.state.receiver_email})
            .end((err, res) => {
                if(err){
                    this.setState({err: res.body.error});
                } else {
                    this.setState({err: ""});
                    // Materialize.toast('Message sent!', 4000)
                }
            });
    }
    render(){
        return(
            <form className="col s12 center" onSubmit={this.handleSubmit}>
                {/* <div className="card-panel"> */}
                    <h5>Contact Poster</h5>
                    {/* {this.props.receiver} */}
                    <div className="row center">
                        <div className="input-field col s12">
                            <input name="sender_email" value={this.state.sender_email} type="email" className="validate" onChange={this.handleInputChange} />
                            <label htmlFor="email" data-error="wrong" data-success="right">* Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="sender_name" value={this.state.sender_name} type="text" className="validate" onChange={this.handleInputChange} />
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea name="message" value={this.state.message} className="materialize-textarea" onChange={this.handleInputChange} />
                            <label htmlFor="message">Message</label>
                        </div>
                    </div>
                    <h5>ownerId: {this.props.ownerId}</h5>
                    <input type="hidden" name="receiver_email" value={this.props.receiver} onChange={this.handleInputChange} />
                    <button type="submit"> submit </button>
                    {/* <a href="#" className="waves-effect waves-light btn-large" type="submit" >Send Email</a> */}
            {/* </div> */}
            </form>
        );
    }
}

export default PostContact;