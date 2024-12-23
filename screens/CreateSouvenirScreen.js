import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { supabase } from './supabase'; // Assurez-vous que ce fichier est configuré avec Supabase

const CreateSouvenirScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [notes, setNotes] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Erreur', 'Permission refusée pour utiliser la caméra.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Erreur', 'Permission refusée pour accéder à la galerie.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const openImagePickerModal = () => setModalVisible(true);
  const closeImagePickerModal = () => setModalVisible(false);

  const handleSaveSouvenir = async () => {
    if (!title || !image || !location || !notes) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs avant d\'enregistrer.');
      return;
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        Alert.alert('Erreur', 'Vous devez vous connecter pour enregistrer un souvenir.');
        return;
      }

      const fileName = `${encodeURIComponent(title)}_${new Date().toISOString()}.jpg`;
      const { data, error: uploadError } = await supabase.storage
        .from('souvenir')
        .upload(fileName, { uri: image, type: 'image/jpeg', name: fileName });

      if (uploadError) throw uploadError;

      const imageUrl = `https://pvutfwszayxykfapjntz.supabase.co/storage/v1/object/public/souvenir/${data.path}`;

      const { error: dbError } = await supabase
        .from('Souvenir')
        .insert([{
          title,
          image: imageUrl,
          location: `${location.latitude}, ${location.longitude}`,
          notes,
          user_id: session.user.id,
          created_at: new Date(),
        }]);

      if (dbError) throw dbError;

      Alert.alert('Succès', 'Votre souvenir a été enregistré avec succès!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Une erreur s\'est produite lors de l\'enregistrement du souvenir.');
    }
  };

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erreur', 'Permission de localisation refusée.');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Créer un Souvenir</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom de la destination"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.photoButton} onPress={openImagePickerModal}>
        <Ionicons name="camera" size={40} color="#fff" />
        <Text style={styles.buttonText}>Ajouter une photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Choisir une source</Text>
            <TouchableOpacity onPress={handleTakePhoto} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Prendre une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectImage} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Sélectionner une image depuis la galerie</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeImagePickerModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.locationContainer}>
        <TextInput
          style={styles.input}
          placeholder="Localisation (manuelle ou obtenue)"
          value={location ? `${location.latitude}, ${location.longitude}` : ''}
          onChangeText={(text) => setLocation({ latitude: text.split(', ')[0], longitude: text.split(', ')[1] })}
        />
        <TouchableOpacity style={styles.locationButton} onPress={handleGetLocation}>
          <Ionicons name="location-sharp" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSouvenir}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  photoButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
    resizeMode: 'cover',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 10,
    marginLeft: 15,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#0066cc',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateSouvenirScreen;
