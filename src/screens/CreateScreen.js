import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { Context } from '../context/BlogContext';

const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addBlogPost } = useContext(Context);

  return (
    <View>
      <Text style={styles.label}>Enter Title </Text>
      <TextInput
        style={styles.form}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content </Text>
      <TextInput
        style={styles.form}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button
        title="Submit"
        onPress={() => addBlogPost(title, content, () => {
          navigation.navigate('Index');
         })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 18,
    height: 40,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  }
});

export default CreateScreen;