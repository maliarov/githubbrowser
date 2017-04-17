import React from 'react';

import { Image, Text, View, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../theme';

export default class LoginView extends React.Component {
    render() {
        return (
            <View style={styles.loginView}>
                <Icon style={styles.logoImage} name="github" size={70} />
                <Text style={styles.text}>Login</Text>
                <Button title="Login"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        padding: 25,
        backgroundColor: Theme.globals.mainColor
    },

    logoImage: {
        color: Theme.globals.mainBackgroundColor
    },

    text: {
        color: Theme.globals.mainBackgroundColor
    }
});