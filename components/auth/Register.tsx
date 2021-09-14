import React, { Component } from 'react'
import { View, Button, Text, TextInput } from 'react-native'
import firebase from 'firebase'

export class Register extends Component<{}, { email: string, password: string, name: string}> {
    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const  { email, password, name } = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('result :)', result)
                firebase.firestore()
                .collection('users')
                .doc(firebase.auth().currentUser?.uid)
                .set({ name, email })
            })
            .catch((error) => console.log('error', error))
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign up"
                />
            </View>
        )
    }
}

export default Register
