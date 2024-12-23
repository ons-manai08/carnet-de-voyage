import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabase';

const EditSouvenirScreen = ({ route, navigation }) => {
  console.log("navigation",navigation)
  const { souvenir } = route.params;
  const [title, setTitle] = useState(souvenir.title);
  const [notes, setNotes] = useState(souvenir.notes);
  const [image, setImage] = useState(souvenir.image);
  // const [image, setImage] = useState(souvenir.image);
  // const [image, setImage] = useState(souvenir.image);

  const handleSave = async () => {
   
    try {
      console.log('Updating souvenir with ID:', souvenir.id);

      const { data, error } = await supabase
        .from('Souvenir')
        .update({ 
          title: title, 
          notes: notes, 
          image: image 
        })
        .eq('id', souvenir.id)
        .select()

      if (error) {
        console.error('Update error:', error);
        Alert.alert('Erreur', error.message || 'Impossible de mettre à jour le souvenir.');
        return;
      }

      console.log('Updated data:', data);
      Alert.alert('Succès', 'Le souvenir a été mis à jour avec succès.');
      navigation.goBack();
    } catch (unknownError) {
      console.error('Unknown error:', unknownError.message);
      Alert.alert('Erreur', 'Une erreur inconnue est survenue.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Titre du souvenir"
      />
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes du souvenir"
        multiline
      />
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="URL de l'image"
      />
      <Button style={styles.button} title="Sauvegarder" onPress={handleSave} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',  
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,   
    padding: 12,      
    marginBottom: 16, 
    fontSize: 16,     
    backgroundColor: '#fff', 
    elevation: 2,      
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#007BFF',  
    paddingVertical: 14,          
    paddingHorizontal: 30,      
    borderRadius: 8,              
    marginTop: 20,             
    alignItems: 'center',      
    justifyContent: 'center',   
    elevation: 5,                 
    shadowColor: '#000',          
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',              
    textAlign: 'center',         
    fontSize: 18,                
    fontWeight: 'bold',           
  },
});

export default EditSouvenirScreen;
