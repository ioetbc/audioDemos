import React, { Component } from 'react'
import { View, Button, Text, TextInput } from 'react-native'
import firebase from 'firebase'

export class Login extends Component<{}, { email: string, password: string}> {
    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        const  { email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('result :)', result)
            })
            .catch((error) => console.log('error', error))
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onLogin()}
                    title="Sign In"
                />
            </View>
        )
    }
}

export default Login
