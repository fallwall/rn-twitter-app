import React, { useState } from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
  // const blogPosts = [
  //   { title: '#1 It\'s a good day.' },
  //   { title: '#2 Somewhere between summer and fall.' },
  //   { title: '#3 You can\'t repair that.' },
  //   { title: '#4 Demon cat wakes you up at 4 am.' },
  // ];

  const [blogPosts, setBlogPosts] = useState([]);

  const addBlogPost = () => {
    setBlogPosts([...blogPosts, { title: `#${blogPosts.length + 1} Post` }]);
  };

  return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost: addBlogPost }}>
      {children}
    </BlogContext.Provider>
  )
};

export default BlogContext;