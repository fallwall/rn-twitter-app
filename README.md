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