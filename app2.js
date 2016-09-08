//- CommentBox
//  - CommentList
//    - Comment
//  - CommentForm

var data = [
  {id: 1, author: "Pete Hunt", text: "The world's greatest author"},
  {id: 2, author: "Jordan Walke", text: "The world's greasiest author"}
];
// (1) Ive added some data which can simulate dynamic data from user interaction or from backend API

var CommentList = React.createClass({

  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    // (4) If you are mapping through an array of data, set a variable equal to the resultant componentry. Be sure to set any needed attributes here as well for the final component.
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
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
    // (5) Set the appropriate values to display
  }
});

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm />
        <CommentList data={this.props.data} />
      </div>
    );
// (3) Because data is associated with our render, it is now available as this.props.data, so we will chain this down to our lowest component
  }
});

ReactDOM.render(
  <CommentBox data={data}/>,
  document.getElementById('content')
);
// (2) We have to associate the root component with the data variable
