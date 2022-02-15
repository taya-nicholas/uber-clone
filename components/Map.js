import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

// To do: there may be some state update in unmounted component here. Fix later.

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imerial&origins=${origin.description}&destinations=${destination.description}
      &key=${GOOGLE_MAPS_APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="standard"
      onLayout={() => {
        if (!origin || !destination) return;
        let markers = [];
        let placeMarker1 = {
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          title: "origin",
          key: 1,
        };
        let placeMarker2 = {
          latitude: destination.location.lat,
          longitude: destination.location.lng,
          title: "destination",
          key: 2,
        };
        markers.push(placeMarker1);
        markers.push(placeMarker2);
        mapRef.current.fitToCoordinates(markers, {
          edgePadding: { top: 50, right: 10, bottom: 10, left: 10 },
          animated: true,
        });
      }}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}

      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
