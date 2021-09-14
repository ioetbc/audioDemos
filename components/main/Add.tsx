import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

type AddScreenProps = {
  navigation: any
}

export default function AddScreen({ navigation }: AddScreenProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState();
  const [image, setImage] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      // @ts-ignore
      setHasCameraPermission(cameraStatus.status === 'granted');

      if (Platform.OS !== 'web') {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // @ts-ignore
        setHasGalleryPermission(galleryStatus.status === 'granted');
      }
    })();
  }, []);

  const takePhoto = async (ref: any) => {
    if (camera) {
        // @ts-ignore
        const data = await camera.takePictureAsync(null)
        if (data) {
            setImage(data.uri)
        }
    }
  }

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
        // @ts-ignore
        setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.cameraContainer}>
        <View style={{ flex: 1 }}>
            <Camera
                // @ts-ignore
                ref={ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                ratio={'1:1'}
            />
        </View>

        <Button
            title="Flip Image"
            onPress={() => {
                setType(
                type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}>
        </Button>

        <Button title="take photo" onPress={() => takePhoto(camera)}/>
        <Button title="pick photo" onPress={() => pickPhoto()}/>
        <Button title="save photo" onPress={() => navigation.navigate('Save', { image })} />
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}



const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
    },
    buttonContainer: {},
    button: {},
    text: {},
  });
