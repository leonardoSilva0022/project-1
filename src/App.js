import { Component } from "react";
import "./App.css";
class App extends Component {
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: "O título",
        body: "O corpo 1",
      },
      {
        id: 2,
        title: "O título",
        body: "O corpo 2",
      },
      {
        id: 3,
        title: "O título",
        body: "O corpo 3",
      },
    ],
  };
  timeoutUpdate = null;

  componentDidMount() {
    this.handleTimeout();
  }

  componentDidUpdate() {
    clearTimeout();
    this.handleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = "O título mudou";

    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 1000);
  };

  render() {
    const { posts, counter } = this.state;

    return (
      <div className="App">
        <h1>{counter}</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
