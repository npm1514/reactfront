//- GiphyBox
//  - SearchList
//    - Search
//  - SearchForm

var SearchList = React.createClass({

  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Search url={comment.images.fixed_height.url} key={comment.id}>
          {comment.slug}
        </Search>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});


var SearchForm = React.createClass({
  getInitialState: function() {
    return {search: ''};
  },
  handleSearchChange: function(e) {
    this.setState({search: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var search = this.state.search.trim();
    if (!search) {
      return;
    }
    this.props.onSearchSubmit(search);
    this.setState({search: ''});
  },
  render: function() {
    return (
      <form className="searchForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search Something"
          value={this.state.search}
          onChange={this.handleSearchChange}
        />
        <input type="submit" />
      </form>
    );
  }
});




var Search = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.children}</h2>
        <div>
          <img src={this.props.url} />
        </div>
      </div>
    );
  }
});




var GiphyBox = React.createClass({
  loadGiphysFromServer: function() {
    $.ajax({
      method: "GET",
      url: "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC",
      success: function(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSearchSubmit: function(search) {
    console.log(search.search);
    $.ajax({
      method: "GET",
      url: "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC",
      success: function(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC", status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadGiphysFromServer();
    // setInterval(this.loadGiphysFromServer, 2000);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>This suddenly turned into a FUNNY CAT free for all!!</h1>
        <SearchForm onSearchSubmit={this.handleSearchSubmit}/>
        <SearchList data={this.state.data} />
      </div>
    );
  }
});



ReactDOM.render(
  <GiphyBox />,
  document.getElementById('content')
);
