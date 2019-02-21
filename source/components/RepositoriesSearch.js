import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const color = 'rgba(255, 255, 255, 0.7)';

const styles = StyleSheet.create({
  searchView: {
    position: 'absolute',
    top: 25,
    right: 10,
    padding: 10,
    borderRadius: 40,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
  },

  searchViewFull: {
    width: '100%',
    position: 'absolute',
    top: 25,
    left: 0,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
  },

  searchIcon: {
    color,
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000',
  },

  searchInput: {
    height: 35,
    flexGrow: 1,
    color,
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000',
  },
});
export default class RepositoriesSearch extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      mode: 'lite',
      value: props.value,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(props) {
    if (this.state.value !== props.value) {
      const state = {
        value: props.value,
        mode: props.value ? this.state.mode : 'lite',
      };
      this.setState(state);
    }
  }

  render() {
    return (
      <View style={this.isLiteMode() ? styles.searchView : styles.searchViewFull}>
        <Icon style={styles.searchIcon} name="search" size={30} onPress={() => this.switchModeTo('full')} />
        {this.isFullMode() && (
          <TextInput
            autoFocus={true}
            disableFullscreenUI={true}
            underlineColorAndroid={color}
            style={styles.searchInput}
            value={this.state.value}
            onChangeText={this.onTextChange}
            onSubmitEditing={this.onDone}
            onBlur={this.onDone}
          />
        )}
      </View>
    );
  }


  isMode = mode => this.state.mode === mode;

  isLiteMode = () => this.state.mode === 'lite';

  isFullMode = () => this.state.mode === 'full';

  switchModeTo = (mode, callback) => !this.isMode(mode) && (this.setState({ mode }, callback));


  onTextChange = (value) => {
    this.isDone = false;
    this.setState({ value });
  };

  onDone = () => {
    if (this.isDone) {
      return;
    }

    this.isDone = true;

    if (!this.state.value) {
      this.switchModeTo('lite');
    }

    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  };
}
