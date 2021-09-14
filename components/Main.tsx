import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

type CurrentUserPayload = {
    email: string
    name: string
}

const EmptyScreen = () => null

export class Main extends Component<{ currentUser: CurrentUserPayload }, { fetchUser: any,  }> {
    componentDidMount() {
        // @ts-ignore
        this.props.fetchUser()
    }

    render() {
        const Tab = createMaterialBottomTabNavigator();
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen
                    name="feed"
                    component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />
                    }}
                />
                <Tab.Screen
                    name="add audio"
                    component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate('Add')
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    }}
                />
                <Tab.Screen
                    name="profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    }}
                />

            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store: any) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
