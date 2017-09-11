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

    componentDidMount(){
        // Initialize the Materialize select
        $('select').material_select();
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
        event.preventDefault();

        //Create formData object and populate it with values in form
        var formData = new FormData(document.querySelector('#postEditForm'));
        var formDataObj = {};
        for(var pair of formData.entries()) {
            formDataObj[pair[0]] = pair[1];
            console.log(formDataObj);
         }

        Request
            .put('/post/' + this.state.id)
            .send(formDataObj)
            .end((err, res) => {
                if(err){
                    this.setState({err: res.body.error});
                } else {
                    this.setState({err: ""});
                    Materialize.toast('Update successful!', 4000);
                    $('#postEditModal').modal('close');
                }
            });
    }

    render(){
        return(
            <div id="postEditModal" className="modal">
                <div className="modal-content">
                    <div className="card-panel">
                        <form id="postEditForm" onSubmit={this.handleSubmit}>
                            <InputField labelText="Title"
                                id="title" value={this.state.title} required="required" onChange={this.handleInputChange} />
                            <InputField fieldClass="col s6" labelText="Price"
                                id="price" value={this.state.price} onChange={this.handleInputChange} />
                            <div className="input-field col s6">
                                <select id="type" name="type" required="required" >
                                    <option value="Phone" defaultValue>Phone</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Case">Case</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label>* Type</label>
                            </div>
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
                                     <button className="btn waves-effect blue white-text darken-text-2" type="submit" value="Submit">Update</button>
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