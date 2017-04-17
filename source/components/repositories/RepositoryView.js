import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../theme';


export default class RepositoriesView extends React.Component {
    render() {
        return (
            <View style={styles.view}>
                <Text>{this.props.repository.name}</Text>
                <Text>{this.props.repository.description}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: Theme.globals.mainBackgroundColor
    }
});