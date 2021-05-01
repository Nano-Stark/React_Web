import React, { Component} from 'react';
import {connect} from 'react-redux';
import Header from '../Common/Header';
import API from '../../utils/api';
import * as SiteActions from '../../store/actions/siteActions';
import {Link} from 'react-router-dom';
import CommentBuilder from '../Common/CommentBuilder';
class Single extends Component {

    componentDidMount() {
        this.props.getSinglePost(this.props.match.params.slug, this.props.auth.token)
    }

    render(){
        return(
            <div>
                <Header 
                    title=''
                    subtitle={this.props.site.post.title}//accessing the props from the redux via site(this.props.site.post)
                    buttonText="Tell me more"
                    showButton={false}
                    image= {
                        this.props.site.post.PostImage ?
                        this.props.site.post.PostImage.length > 0 ?
                        API.makeFileURL(this.props.site.post.PostImage[0].url, this.props.auth.token)
                        : ''
                    : ''
                    } 
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">{/*STYLE IMAGE IN QUILL IN ADMIN.CSS, IN COMPONENT/ASSETS/CSS */}
                            <div className="post-content" dangerouslySetInnerHTML={{__html: this.props.site.post.content}}></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h3>Comments</h3>
                            {this.props.auth.token ?
                                <CommentBuilder />
                            :
                                <p>Need an account? <Link to='/signup'>Sign Up</Link></p>
                            }
                        </div>
                    </div>
                    <div className="row">

                        {this.props.site.post.Comments ? 
                            this.props.site.post.Comments.length >  0 ?
                                this.props.site.post.Comments.map((comment, i) => {
                                    return (
                                        <div key={i} className="col-md-12">
                                            <h4>{comment.profile ? comment.profile.name : ''}</h4>
                                            <p>{comment.content}</p>
                                        </div>
                                    )
                                    
                                })
                                : null
                        : null}
                    </div>
                </div>
            </div> 
            )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    site: state.site,
})

const mapDispatchToProps = dispatch => ({
    getSinglePost: (slug, token) => {//admin action also has a reference of getsingle post but they are
        dispatch(SiteActions.getPostBySlug(slug, token));//different as they poiny to diiferent api calls
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Single);