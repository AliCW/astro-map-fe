import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text, SegmentedButtons, List, useTheme, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { MarkerAnimated, Circle } from "react-native-maps";
import worldLocations from "../data/worldLocations";

const LocationFinder = ({ navigation }) => {
  const [pin, setPin] = useState({ latitude: 51.50722, longitude: -0.1275 });
  const [region, setRegion] = useState({
    latitude: 51.50722,
    longitude: -0.1275,
    latitudeDelta: 0.05,
    longitudeDelta: 200,
  })
  const [continent, setContinent] = useState("asia");
  const [locations, setLocations] = useState([])
  const [value, setValue] = useState("");
  const theme = useTheme();


  useEffect(() => {
    const filteredLocations = worldLocations.filter((location) => location.continent === continent);
    setLocations(filteredLocations);
  }, [continent]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        region={region}
        style={{ width: "100%", height: "50%" }}
      >
        <MarkerAnimated
          coordinate={pin}
          draggable={true}
          onDragEnd={(e) =>
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
          title="London"
          description="Upcoming Events"
          onCalloutPress={() =>
            navigation.navigate("Home", { params: "london" })
          }
        />
      </MapView>
      <View style={{ paddingTop: 10 }}>
        <Text
          variant="headlineLarge"
          style={{ textAlign: "center", fontWeight: "700" }}
        >
          Select Location
        </Text>
      </View>
      <ScrollView>

      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="small"
        style={{margin: 10}}
        buttons={[
          {
            value: "europe",
            label: "Europe",
            onPress: () => {
              setContinent("europe")
              setRegion({
                latitude: 48.864716,
                longitude: 2.349014,
                latitudeDelta: 0.05,
                longitudeDelta: 50,
              })
            },
          },
          {
            value: "africa",
            label: "Africa",
            onPress: () => {
              setContinent("africa")
              setRegion({
                latitude: 4.37333,
                longitude: 18.56278,
                latitudeDelta: 0.05,
                longitudeDelta: 100,
              })
            },
          },
          {
            value: "asia",
            label: "Asia",
            onPress: () => {
              setContinent("europe")
              setRegion({
                latitude: 27.47222,
                longitude: 89.63611,
                latitudeDelta: 0.05,
                longitudeDelta: 75,
              })
            },
          },
        ]}/>
        <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="small"
        buttons={[
          {
            value: "north-america",
            label: "North America",
            onPress: () => {
              setContinent("europe")
              setRegion({
                latitude: 35.481918,
                longitude: -97.508469,
                latitudeDelta: 0.05,
                longitudeDelta: 75,
              })
            },
          },
          {
            value: "south-america",
            label: "South America",
            onPress: () => {
              setContinent("europe")
              setRegion({
                latitude: -25.300,
                longitude: -57.633,
                latitudeDelta: 0.05,
                longitudeDelta: 90,
              })
            },
          },
        ]}/>
        <List.Section style={{alignItems: "center"}}>
          {locations.map((location) => {
            return (
              <List.Item
              key={location.id}
              title={location.countries}
              titleEllipsizeMode="head"
              titleStyle={{textAlign: "center"}}
              onPress={() => {
                setPin(location.coordinate)
                setRegion({
                  latitude: location.coordinate.latitude,
                  longitude: location.coordinate.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 15,
                })
              }}
              style={{marginBottom: 5, paddingVertical: 0, borderWidth: 1, borderStyle: "solid", borderColor: theme.colors.outline, backgroundColor: theme.colors.surfaceVariant, borderRadius: 10, width: "50%"}}
              />
            )
          })}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LocationFinder;
