import React, { Component } from 'react';
import {
    Text,
    Alert,
    TouchableOpacity,
} from 'react-native';
class Confirm extends Component {
    button() {
        Alert.alert(
            'Alert Title',
            'Alert message here...',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => console.warn('YES Pressed') },
            ]
        );
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.button()}>
                <Text>Button</Text>
            </TouchableOpacity>
        );
    }
}

export default Confirm