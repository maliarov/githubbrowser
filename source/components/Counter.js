import React from 'react';

import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Counter extends React.Component {
	render() {
		const {count, icon, style, iconStyle} = this.props;

		const kilo = (count || 0) / 1000;
		const text = (kilo > 1)
			? (kilo.toFixed(Math.floor(kilo * 10) / 10 === Math.floor(kilo) ? 0 : 1) + 'k')
			: count.toString();

		return (
			<Text style={style}>
				{icon && <Icon style={iconStyle} name={icon}/>}{(icon ? ' ' : '') + text}
			</Text>
		);
	}
}