import React from 'react';

import { Text, TextInput, View, StyleSheet } from 'react-native';

import Theme from '../theme/index';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class RepositoriesSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'icon',
            value: props.value
        };
    }

	componentWillReceiveProps(props) {
		if (this.state.value !== props.value) {
			this.setState({value: props.value});

			if (!this.state.value) {
				this.switchModeTo('icon');
			}
		}
	}

    render() {
        return (
            <View style={this.isMode('full') ? styles.searchViewFull : styles.searchView}>
                <Icon style={styles.searchIcon} name="search" size={30} onPress={() => this.switchModeTo('full')} />
                {this.isMode('full') && (
                    <TextInput
                        autoFocus={true}
                        disableFullscreenUI={true}
                        underlineColorAndroid={'rgba(255, 255, 255, 0.7)'}
                        style={styles.searchInput}
                        value={this.state.value}
                        onChangeText={(text) => this.setState({ value: text })}
                        onSubmitEditing={() => this.onDone()}
                        onBlur={() => this.onDone()}
                    />
                )}
            </View>
        );
    }


    isMode = (mode) => this.state.mode === mode;
    switchModeTo = (mode) => !this.isMode(mode) && (this.setState({ mode }));

    onDone = () => {
        if (!this.state.value) {
			this.switchModeTo('icon');
        }

        if (this.props.onSearch) {
			this.props.onSearch(this.state.value);
		}
    };
}


const styles = StyleSheet.create({
    searchView: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        borderRadius: 40,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#000'
    },

    searchViewFull: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#000'
    },

    searchIcon: {
        color: 'rgba(255, 255, 255, 0.7)',
        textShadowRadius: 10,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#000'
    },

    searchInput: {
        height: 35,
        flexGrow: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        textShadowRadius: 10,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#000'
    }
});