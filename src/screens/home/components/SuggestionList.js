import { View, FlatList, StyleSheet, Text } from "react-native";

export default function SuggestionList({ data, isFetching }) {
  const renderListItem = ({ item }) => (
    <View>
      <Text>{item?.fullName}</Text>
    </View>
  );

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={data}
        keyExtractor={(item, index) => (item?.userId?.toString() || index.toString())}
        renderItem={renderListItem}
        ListEmptyComponent={
          <View>
            {isFetching ? <Text>Fetching...</Text> : <Text>No data found</Text>}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 6,
        position: "absolute",
        backgroundColor: "white",
        zIndex: 10,
        maxHeight: 200,
    }
});
