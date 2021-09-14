import firebase from "firebase";
import { USER_STATE_CHANGE } from '../constants'

export function fetchUser() {
    return((dispatch: any) => {
        console.log('firebase.auth()?.currentUser?.uid', firebase.auth()?.currentUser?.uid)

        firebase.firestore()
        .collection('users')
        .doc(firebase.auth()?.currentUser?.uid)
        .get()
        .then((snapshot) => {
            console.log('snapshot', snapshot.exists)
            if (snapshot.exists) {
                console.log('snapshot', snapshot.data())
                dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: snapshot.data()
                })
            } else {
                console.log('snapshot for getting user does not exist')
            }
        })
    })
}   