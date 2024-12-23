import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [souvenirs, setSouvenirs] = useState([]);

  useEffect(() => {
    const fetchSouvenirs = async () => {
      const fetchedSouvenirs = await getSouvenirs();
      setSouvenirs(fetchedSouvenirs);
    };

    fetchSouvenirs();
  }, []);

  return (
    <MapView style={{ width: '100%', height: '100%' }}>
      {souvenirs.map((souvenir) => (
        <Marker
          key={souvenir.id}
          coordinate={{ latitude: souvenir.location.latitude, longitude: souvenir.location.longitude }}
          title={souvenir.titre}
          description={souvenir.description}
        />
      ))}
    </MapView>
  );
};

export default MapScreen;
