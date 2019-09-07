import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const BlogPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
        onPress={() => onSubmit(title, content)}
      />
    </View>
  )
};

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
  },
});

export default BlogPostForm;