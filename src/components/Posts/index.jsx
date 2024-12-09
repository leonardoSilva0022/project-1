import "./styles.css";

import { PostaCard } from "../PostCard";

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map(post => (
      <PostaCard
        key={post.id}
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
      />
    ))}
  </div>
);
