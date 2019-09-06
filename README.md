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