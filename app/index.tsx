import { View, Text, StyleSheet } from 'react-native';

export default function Index(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Language Den</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
