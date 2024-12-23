import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Pour sélectionner l'image

const SouvenirScreen = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour choisir une image
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Fonction pour téléverser l'image et enregistrer le souvenir
  const handleSaveSouvenir = async () => {
    if (!titre || !description || !imageUri) {
      Alert.alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      setIsLoading(true);
      // Téléverse l'image
      const imageUrl = await uploadImage(imageUri);
      // Sauvegarde dans Firestore
      await saveSouvenir(imageUrl, titre, description);
      Alert.alert('Souvenir ajouté avec succès !');
    } catch (error) {
      Alert.alert('Erreur lors de l\'ajout du souvenir.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Titre du souvenir"
        value={titre}
        onChangeText={setTitre}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ marginBottom: 10 }}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
      <Button title="Choisir une image" onPress={pickImage} />
      <Button title="Ajouter Souvenir" onPress={handleSaveSouvenir} disabled={isLoading} />
    </View>
  );
};

export default SouvenirScreen;
