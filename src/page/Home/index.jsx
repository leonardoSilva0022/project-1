import { Component } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-post";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 30,
    searchValue: ''
  };

  async componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      ...this.state,
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const  value  = e.currentTarget.value;
    this.setState({ ...this.state, searchValue: value });
  };

  render() {
    const { 
      postsPerPage, 
      posts, 
      page, 
      allPosts, 
      searchValue} 
      = this.state;
  
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
          return post.title.toLowerCase().includes(
            searchValue.toLowerCase()
          );
        })
        : posts;

    return (
      <section className="container">
        <div class="search-container">
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts =(</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              onCLick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;