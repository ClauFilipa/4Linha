import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const HistoryScreen = ({ route, navigation }) => {
  const { history } = route.params;

  const renderHistoryItem = ({ item, index }) => {
    const backgroundColor = item === 'Empate' ? 'gray' : item === 'Jogador A' ? 'red' : 'yellow';

    return (
      <View style={[styles.historyItem, { backgroundColor }]}>
        <Text style={styles.historyText}>Jogo {history.length - index}: {item}</Text>
      </View>
    );
  };

  const handleGoBack = () => {
    navigation.goBack(); // Navegar de volta ao HomeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Histórico de Vencedores</Text>
      <FlatList
        data={history.reverse()} // Inverte a ordem da lista
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA', // Fundo azul claro
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'blue', // Título em azul
    marginTop: 60, // Espaçamento superior
  },
  historyItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'blue', // Borda azul ao redor do histórico
  },
  historyText: {
    fontSize: 16,
    color: 'black', // Texto preto
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue', // Botão azul
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center', // Alinhar o botão ao centro horizontalmente
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Texto branco
  },
});

export default HistoryScreen;
