import React from 'react';

import { View, ListView, StyleSheet } from 'react-native';

import RepositoriesList from './RepositoriesList';
import RepositoriesSearch from './RepositoriesSearch';

import Icon from 'react-native-vector-icons/FontAwesome';

import Theme from '../../theme';

import GitHub from '../../models/GitHub';
import testData from '../../../test/data.json';

export default class RepositoriesView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(testData.items)
            });
        }, 300);

        /*
        GitHub.repositories
            .search({ q: 'stars:>0', s: 'stars', o: 'desc' })
            .then((repositories) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(repositories.items)
                });
            });
        */
    }

    render() {
        return (
            <View style={styles.view}>
                <RepositoriesList dataSource={this.state.dataSource} onRepositoryPress={this.onRepositoryPress} />
                <RepositoriesSearch />
            </View>
        );
    }


    onRepositoryPress = (repository) => {
        this.props.navigator.push({path: '/repository', repository});
    }
}

var styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: Theme.globals.mainBackgroundColor
    }
});