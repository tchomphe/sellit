import React from 'react';
import InputField from './InputField';
import Request from 'superagent';

class PostEditContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err:"",
            id: this.props.match.params.postId,
            title:"",
            type:"",
            address:"",
            price:"",
            description:"",
            pictures: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // Initialize the Materialize select
        $('select').material_select();

        //TODO: move request into function
        Request.get('/post/' + this.state.id).then((res) => {
            console.log('Response Body: ' + JSON.stringify(res.body, null, 4));
            this.setState({
                id: res.body._id,
                title: res.body.title,
                type: res.body.type,
                address: res.body.address,
                price: res.body.price,
                description: res.body.description,
                pictures: res.body.images,
            });
        });
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();

        //TODO: write submit logic
    }

    render(){
        console.log("PostEditContainer rendering..");
        console.log('current state: ' + JSON.stringify(this.state, null, 4));

        return(
            <div className="container">
                <div className="red-text">{this.state.err}HELLO WORLD!</div>
            </div>
        );
    }
}
export default PostEditContainer;