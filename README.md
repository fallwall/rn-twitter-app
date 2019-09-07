### SETUP
```
npx expo-cli init .
npm i react-navigation
```
or?
```
npx expo-cli install react-native-gesture-handler react-native-reanimated react-navigation-stack
```
imports fix 
```
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
```

### FLOW

![flow](https://i.imgur.com/snQW95Z.png)

Wire up this system to centralize data (like redux):
![flow](https://i.imgur.com/KIs4WJG.png)
![flow](https://i.imgur.com/ErLKB78.png)
![props vs. context](https://i.imgur.com/36mSjN1.png)

### Provider/Context SETUP

Top level ./src/context/BlogContext:
```
import React from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
  return (
    <BlogContext.Provider value={5}>
    {children}
    </BlogContext.Provider>
  )
};

export default BlogContext;
```

Child level:
```
import React, { useContext } from 'react';
...
import BlogContext from '../context/BlogContext';

const IndexScreen = () => {
  const value = useContext(BlogContext);

  return (
    ...
      <Text>{value}</Text>
    ...
  );
};
```

### Provider/Context SETUP II
./src/context/createDataContext.js
```
import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
```

./src/context/BlogContext.js
```
import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [...state, { title: `#${state.length + 1} Post` }];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: 'add_blogpost' });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost },
  [],
);
```

./src/App.js
```
...
import { Provider } from './src/context/BlogContext';

...
export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};

```

.src/screens/IndexScreen.js
```
import React, { useContext } from 'react';
...
import { Context } from '../context/BlogContext';

const IndexScreen = () => {
  const { state, addBlogPost } = useContext(Context);

  return (
    ...
  
      <Button
        title="Add Post"
        onPress={addBlogPost}
      />
      <FlatList
        data={state}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

...
```

useReducer revisited: 
https://reactjs.org/docs/hooks-reference.html#usereducer


### To Add Stuff on Navigator/Header 
```
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight:
      (<TouchableOpacity
        onPress={() => navigation.navigate('Create')}
      >
        <Feather name="plus" size={30} />
      </TouchableOpacity>)
    ,
  };
};
```


### Submit Trivia 💡

on the page to submit
```
      <Button
        title="Submit"
        onPress={() => addBlogPost(title, content, () => {
          navigation.navigate('Index');
         })}
      />
```
above, passing in the navigating into the addblogPost as a callback

and at the actual function:
```
const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    try {
    await axios.post(.....);
    dispatch({ type: 'add_blogpost', payload: { title, content } });
    callback();
  } catch(err) {
      ....
  }
  }:
};
```

💡 💡 💡We don't want to redirect users before the action succeed 