import React from 'react';

import { Image, ListView, Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../theme';

export default class RepositoriesList extends React.Component {

    render() {
        return (
            <ListView
                contentContainerStyle={styles.list}
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
            />
        );
    }

    renderRow = (repository) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.props.onRepositoryPress && this.props.onRepositoryPress(repository)}>
                {renderAvatar()}
                <View style={styles.itemBody}>
                    <Text style={styles.itemBodyText}>{repository.name}</Text>
                    <Text style={styles.itemBodyText}><Icon name="star" /> {renderStarsCount()}</Text>
                </View>
            </TouchableOpacity>
        );


        function renderAvatar() {
            return repository.owner.avatar_url &&
                <Image style={styles.itemBackgroundImage} source={{ uri: repository.owner.avatar_url }} />
        }

        function renderStarsCount() {
            const k = repository.stargazers_count / 1000;

            if (k > 0) {
                return k.toFixed(1) + 'k';
            }

            return repository.stargazers_count.toString();;
        }
    };

}

var styles = StyleSheet.create({
    list: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#CCC',
        width: '33.33%',
        height: 200
    },

    itemBackgroundImage: {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        position: 'absolute'
    },

    itemBody: {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0)',

        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },

    itemBodyText: {
        color: '#fff',
        textShadowRadius: 10,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#000'
    }
});