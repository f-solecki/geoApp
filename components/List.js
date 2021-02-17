import React, { Component } from 'react';
import { View, StyleSheet, Switch, Text, Alert, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
import MyButton from './MyButton';
import * as Location from "expo-location";
import ListItem from "./ListItem"
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnable: false,
            dialogVisible: true,
            array: [],
            toMap: [],
            number: 1
        };
    }
    save = async () => {
        this.setState({
            number: 0
        })
        let pos = await Location.getCurrentPositionAsync({})
        let timestamp = pos.timestamp
        let latitude = pos.coords.latitude
        let longitude = pos.coords.longitude
        this.setState({
            number: 1
        })
        Alert.alert(
            'Pozycja',
            'Pozycja zostala pobrana, czy zapisać?',
            [
                {
                    text: 'Nie'
                },
                {
                    text: 'Tak', onPress: async () => {
                        try {
                            await AsyncStorage.setItem('timestamp: ' + timestamp.toString(), 'longitude: ' + longitude + ';latitude: ' + latitude.toString());
                        } catch (error) {
                        }
                        let keys = await AsyncStorage.getAllKeys();
                        let stores = await AsyncStorage.multiGet(keys);
                        let tempArray = []
                        let maps = stores.map((result, i, store) => {
                            let key = store[i][0];
                            let value = store[i][1];
                            let obj = { key, value, switch: false }
                            tempArray.push(obj)
                        });
                        this.setState({
                            array: tempArray
                        })
                    }
                }
            ]
        );

    }
    componentDidMount = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let tempArray = []
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            let obj = { key, value, switch: false }
            tempArray.push(obj)
        });
        this.setState({
            array: tempArray
        })
    }

    delete = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
            // console.log("deleted")
        } catch (error) {
            // console.error('Error clearing app data.');
        }
        this.setState({
            array: []
        })
    }
    map = () => {
        if (this.state.toMap.length > 0) {
            this.props.navigation.navigate("Map", this.state.toMap)
        } else {
            Alert.alert("Wybierz przynajmniej jedną pozycję.")
        }
    }

    updateMap = () => {
        let arr = this.state.array
        let map = []
        for (let x = 0; x < arr.length; x++) {
            console.log(arr[x].switch)
            if (arr[x].switch == true) {
                console.log("Dodaje", arr[x].switch)
                map.push(arr[x])
            }
        }
        this.setState({
            toMap: map
        })
        console.log(map)
    }

    toggleSwitch = async () => {
        this.setState({
            isEnable: !this.state.isEnable
        })
        let tempArr = this.state.array
        for (let x = 0; x < tempArr.length; x++) {
            tempArr[x].switch = !this.state.isEnable
        }
        this.setState({
            array: tempArr
        })
        this.updateMap()
    }

    changeSmallSwitch = (timestamp) => {
        let temp = this.state.array
        for (let x = 0; x < temp.length; x++) {
            if (temp[x].key.split(": ")[1] == timestamp.split(": ")[1]) {
                temp[x].switch = !temp[x].switch
            }
        }
        this.setState({
            array: temp
        })
        this.updateMap()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.number == 0 ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <View style={styles.container}>

                            <View style={styles.buttons}>
                                <View style={{ flexDirection: "row", height: 50 }}>
                                    <View style={{ flex: 1 }}>
                                        <MyButton name="Pobierz i zapisz pozycję" fun={this.save} /><Text>{"\n"}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <MyButton name="Usuń wszystkie dane" fun={this.delete} />
                                    </View>
                                </View>
                                <View style={styles.butswitch}>
                                    <View style={{
                                        flex: 3, justifyContent: "center"
                                    }}>

                                        <MyButton name="Przejdź do mapy" fun={this.map} />
                                    </View>
                                    <View style={{
                                        flex: 1, justifyContent: "center", alignItems: "center"
                                    }}>

                                        <Switch
                                            onValueChange={this.toggleSwitch}
                                            value={this.state.isEnable}
                                        />
                                    </View>
                                </View>

                            </View>
                            <View style={styles.list}>

                                <FlatList
                                    style={StyleSheet.user}
                                    data={this.state.array}
                                    renderItem={({ item }) => <ListItem enable={item.switch} change={this.changeSmallSwitch} key={item.key} time={item.key} value={item.value} />}
                                    keyExtractor={item => item.key}
                                />
                            </View>
                        </View >}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    buttons: {
        flexDirection: "column",
        width: "100%",
        justifyContent: 'center',
    },
    butswitch: {
        flexDirection: "row",
        justifyContent: 'center',
        marginBottom: 10
    },
    list: {
        width: "100%",
    }


})

export default List;

