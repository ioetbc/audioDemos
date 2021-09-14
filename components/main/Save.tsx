import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')
import { NavigationContainer } from '@react-navigation/native'

export default function Save(image: any, { navigation }: any) {
    const [caption, setCaption] = useState('')
    const uploadImage = async () => {
        const uri = image?.route?.params?.image
        const response = await fetch(uri)
        const blob = await response.blob()
        const childPath = `post/${firebase?.auth()?.currentUser?.uid}/${Math.random().toString()}`
        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob)

        const taskProgress = (snapshot: any) => console.log(`transferred: ${snapshot.bytesTransferred}`)
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL()
                .then((snapshot: any) => {
                   savePostData(snapshot) 
                })
                .catch((error: any) => console.log('error getting download url', error))
        }

        const taskError = (snapshot: any) => {
            console.log('errir', snapshot)
        }

        task.on('state_changed', taskProgress, taskError, taskCompleted)
    }

    const savePostData = async (downloadURL: string) => {
        firebase
            .firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser?.uid)
            .collection('userPosts')
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(function () {
                // TODO navigate back to the homepage for some reason its not working
                // navigation.popToTop()
            })
    }
    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: image?.route?.params?.image }} />
            <TextInput placeholder="image caption" onChangeText={(caption) => setCaption(caption)} />
            <Button title="save" onPress={() => uploadImage()} />
        </View>
    )
}
