import React from 'react';
import InputField from './InputField';
import Request from 'superagent';

class PostEditModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err:"",
            id:"",
            title:"",
            address:"",
            price:"",
            description:"",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.post._id,
            title: nextProps.post.title,
            address: nextProps.post.address,
            price: nextProps.post.price,
            description: nextProps.post.description,
        })
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        Request
            .put('/post/' + this.state.id)
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
                        <form onSubmit={this.handleSubmit}>
                            <InputField labelText="Title"
                                id="title" value={this.state.title} required="required" onChange={this.handleInputChange} />
                            <InputField labelText="Price"
                                id="price" value={this.state.price} onChange={this.handleInputChange} />
                            <InputField labelText="Address"
                                id="address" value={this.state.address} onChange={this.handleInputChange} />
                            <InputField labelText="Description"
                                id="description" value={this.state.description} onChange={this.handleInputChange} />
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