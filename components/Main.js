import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from "./MyButton"
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false

        };
    }
    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }
    changeNavigate = () => {
        this.props.navigation.navigate("List")
    }
    componentDidMount = async () => {
        this.setPermissions()
        await Font.loadAsync({
            'myfont': require('./font.otf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (this.state.fontloaded
            ?
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 80, textAlign: "center", fontFamily: "myfont" }}>GeoMap App</Text>
                    <Text style={{ fontSize: 40, textAlign: "center", fontFamily: "myfont" }}>find and save your position</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <MyButton name="Start" fun={this.changeNavigate} />
                </View>
            </View>
            :
            null
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        backgroundColor: "lightblue",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",

    }

})


export default Main;

