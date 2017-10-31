import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';

class SinglePostPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            title: "",
            address: "",
            price: "",
            description: "",
            type: "",
            thumbnail: "",
            images: "",
            date: ""
        }
    }
    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();
        // Populate PostTile's with current user's posts
        this.requestUserPosts();
    }

    requestUserPosts(){
        Request.get('/postById/' + this.props.match.params.id).then((res) => {
            console.log(JSON.stringify(res.body));
            var post = JSON.parse(JSON.stringify(res.body));
            this.setState({
                title: post.title,
                address: post.address,
                description: post.description,
                type: post.type,
                price: post.price,
                thumbnail: post.thumbnail,
                images: post.images,
                date: post.date
            })
        });
    }

    render(){

        var postImages = this.state.images;
        var postImagesHTML = [];

        if (postImages.length > 0){
            var numToWord = [
                '#one!','#two!','#three!','#four!','#five!',
                '#six!','#seven!','#eight!','#nine!','#ten!',
                '#eleven!','#twelve!','#thirteen!','#fourteen!','#fifteen!',
                '#sixteen!','#seventeen!','#eighteen!','#nineteen!','#twenty!'];

            for (var i=0; i<postImages.length; i++){
                postImagesHTML.push(
                    <a className="carousel-item" href={numToWord[i]}><img src={postImages[i]} /></a>);
            }
        }
        else{
            postImagesHTML.push(<a className="carousel-item" href="#one!"><img src="https://unsplash.it/500/250/?image=0&blur" /></a>);
        }
        console.log('UserPostPage rendering ...');
        return(
            <div className="row center">
                <div className="col s12 m7 l7 postImagesSlideshow">
                    <div className="carousel" data-indicators="true">
                        {postImagesHTML}
                    </div>
                </div>
                <div className="s12 m5 l5">
                    <p>{this.state.title}</p>
                    <p>{this.state.price}</p>
                    <p>{this.state.address}</p>
                    <p>{this.state.type}</p>
                    <p>{this.state.description}</p>
                    <p>{this.state.date}</p>
                    <p><img src={this.state.thumbnail} /></p>
                </div>
            </div>
        )
    }
}

export default SinglePostPage;
