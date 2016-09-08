//- CommentBox
//  - CommentList
//    - Comment
//  - CommentForm

// create a React component starting with a capital letter
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt"><p>This is the world's <strong>greatest</strong> author!</p></Comment>
        <Comment author="Jordan Walke"><p>This is the world's <strong>greasiest</strong> author!</p></Comment>
      </div>
    );
// React elements have a className not a class
// You may include attributes, such as the author
// The content in between the tags are considered child elements and when called, you may display this content
  }
// the component will have a render key that will return XML that is wrapped in a div
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a Comment Form.
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var md = new Remarkable();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
// When {this.props.author} and {this.props.children} are called, the specific attributes of each component will display
  }
});

var CommentBox = React.createClass({

  render: function() {
    return (
      <div className="commentBox">
        <h1>This is a React Tutorial!</h1>
        <CommentForm />
        <h1>Comments</h1>
        <CommentList />
      </div>
    );
// you can place components inside of other components to make them maintainable
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
// In the final render, we are rendering the COmmentBox component and applying it to the div in the index.html file with the ID #content
