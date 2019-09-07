// import React, { useState } from 'react';
// import React, { useReducer } from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

// // const BlogContext = React.createContext();

//below, first you can call state or blogpost

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get-blogposts':
      return action.payload;
    // case 'add_blogpost':
    //   return [...state, {
    //     title: action.payload.title,
    //     content: action.payload.content,
    //     id: Math.floor(Math.random() * 9999999),
    //   }];
    case 'delete_blogpost':
      return state.filter(item => item.id !== action.payload);
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
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
const getBlogPosts = (dispatch) => {
  return async () => {
    const resp = await jsonServer.get('/blogposts');
    // resp.data: array of objects
    dispatch({ type: 'get-blogposts', payload: resp.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });
    // dispatch({ type: 'add_blogpost', payload: { title, content } });
    callback && callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
    callback && callback();
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
  {
    getBlogPosts,
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
  },
  [],
);