import React from 'react';
import InputField from './InputField';
import Request from 'superagent';

class PostEditModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err:"",
            title:"",
            address:"",
            price:"",
            description:""
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
        Request
            .put('/post/' + this.props.pid)
            .send({title: this.state.title, price: this.state.price, address: this.state.address, description: this.state.description})
            .end((err, res) => {
                if(err){
                    this.setState({err: res.body.error});
                } else {
                    this.setState({err: ""});
                      Materialize.toast('Update successful!', 4000)
                    $('#postEditModal').modal('close');
                }
            });
            event.preventDefault();
    }

    render(){
        return(
            <div id="postEditModal" className="modal">
                <div className="modal-content">
                    <div className="card-panel">
                        {/* <form method="post" action="/createPost" encType="multipart/form-data"> */}
                        <form onSubmit={this.handleSubmit}>
                            <InputField labelText="Title"
                                id="title" placeholder={this.props.title} required="required" onChange={this.handleInputChange} />
                            <InputField labelText="Price"
                                id="price" placeholder={this.props.price} onChange={this.handleInputChange} />
                            <InputField labelText="Address"
                                id="address" placeholder={this.props.address} onChange={this.handleInputChange} />
                            <InputField labelText="Description"
                                id="description" placeholder={this.props.description} onChange={this.handleInputChange} />
                            {/* <div className="row">
                                <div className="col s12 file-field input-field">
                                    <div className="btn">
                                        <span>Browse</span>
                                        <input type="file" name="postImages" multiple/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Upload new pictures" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="s12">
                                     <button className="btn waves-effect waves-light" type="submit" value="Submit">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostEditModal;