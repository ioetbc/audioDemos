import React from 'react'
import { Text, View, Button } from 'react-native'

type LandingScreenProps = {
    navigation: any
}

export default function LandingScreen({ navigation }: LandingScreenProps) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Login Page</Text>
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}
