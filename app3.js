//- CommentBox
//  - CommentList
//    - Comment
//  - CommentForm

var CommentList = React.createClass({

  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment url={comment.images.fixed_height.url} key={comment.id}>
          {comment.slug}
        </Comment>
      );
    });
    // we still need to map through the array
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am still a CommentForm. :/
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2>{this.props.children}</h2>
        <div>
          <img className="commentAuthor" src={this.props.url} />
        </div>
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadGiphysFromServer: function() {
    $.ajax({
      method: "GET",
      url: this.props.url,
      success: function(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // we created this method so that we could run our ajax request independantly
  getInitialState: function() {
    return {data: []};
  },
  // getInitialState executes exactly once during the lifecycle of the component and sets up the initial state of the component
  componentDidMount: function() {
    this.loadGiphysFromServer();
    setInterval(this.loadGiphysFromServer, 2000);
  },
  // componentDidMount is a method called automatically by React after a component is rendered for the first time
  render: function() {
    return (
      <div className="commentBox">
        <h1>This suddenly turned into a FUNNY CAT free for all!!</h1>
        <CommentForm />
        <CommentList data={this.state.data} />
      </div>
    );
// (2) when we have dynamic data, we use state as in this.state.data
  }
});

ReactDOM.render(
  <CommentBox url="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC"/>,
  document.getElementById('content')
);
// (1) I've set my api url so that it can be reused
