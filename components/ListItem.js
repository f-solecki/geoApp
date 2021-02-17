import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Switch } from 'react-native';
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.time,
            longitude: this.props.value.split(";")[0],
            latitude: this.props.value.split(";")[1],
        };
    }



    change = () => {
        this.props.change(this.state.key)
    }



    render() {

        return (<View style={styles.container}>
            <View style={styles.image}>

                <Image
                    style={styles.tinyLogo}
                    source={require('./../img/earth.png')}
                />
            </View>
            <View style={styles.data}>
                <Text style={{ fontWeight: "bold" }}>{this.state.key}</Text>
                <Text>{this.state.longitude}</Text>
                <Text>{this.state.latitude}</Text>
            </View>
            <View style={styles.switch}>
                <Switch
                    onValueChange={this.change}
                    value={this.props.enable}
                />

            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }, data: {
        flex: 2,
        flexDirection: "column",
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    switch: {
        flex: 1,
        alignItems: "center"
    }
})

export default ListItem;

