// import React, { useState } from 'react';
// import React, { useReducer } from 'react';
import createDataContext from './createDataContext';

// // const BlogContext = React.createContext();

//below, first you can call state or blogpost
const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [...state, {
        title: `#${state.length + 1} Post`,
        id: Math.floor(Math.random() * 9999999)
      }];
    case 'delete_blogpost':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

// export const BlogProvider = ({ children }) => {
//   // const blogPosts = [
//   //   { title: '#1 It\'s a good day.' },
//   //   { title: '#2 Somewhere between summer and fall.' },
//   //   { title: '#3 You can\'t repair that.' },
//   //   { title: '#4 Demon cat wakes you up at 4 am.' },
//   // ];

//   // const [blogPosts, setBlogPosts] = useState([]);
//   const [blogPosts, dispatch] = useReducer(blogReducer, []);
//   //blocgPosts or state

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: 'add_blogpost' });
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

// const addBlogPost = () => {
//   setBlogPosts([...blogPosts, { title: `#${blogPosts.length + 1} Post` }]);
// };

//   return (
//     // <BlogContext.Provider value={{ data: blogPosts, addBlogPost: addBlogPost }}>
//     <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
//       {children}
//     </BlogContext.Provider>
//   )
// };

// export default BlogContext;

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  [],
);