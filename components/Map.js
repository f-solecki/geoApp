import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.route.params[0].value.split(";")[0].split(": ")[1])
        let markers = []
        for (let x = 0; x < this.props.route.params.length; x++) {
            let longitude = this.props.route.params[x].value.split(";")[0].split(": ")[1]
            let latitude = this.props.route.params[x].value.split(";")[1].split(": ")[1]
            // let timestamp = this.props.route.params[x].key.split(": ")[1]
            // var date = new Date(timestamp * 1000);
            // var hours = date.getHours();
            // var minutes = "0" + date.getMinutes();
            // var seconds = "0" + date.getSeconds();
            // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            markers.push(<MapView.Marker
                coordinate={{
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                }}
                key={x}
                title={"Pozycja numer: " + x}
            // description={"Godzina logowania: " + formattedTime}
            />)
        }

        return (<View style={styles.container}>
            <MapView

                style={{
                    flex: 1, width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                }}
                initialRegion={{
                    latitude: 49.9815183,
                    longitude: 19.7654431,
                    latitudeDelta: 0.030,
                    longitudeDelta: 0.020,
                }}
            >
                {markers}
            </MapView>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },



})

export default Map;

