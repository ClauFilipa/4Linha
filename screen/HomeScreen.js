import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]); // Estado para armazenar o histórico dos vencedores

  const handleStartGame = () => {
    navigation.navigate('Game', { setHistory: setHistory }); // Passando a prop setHistory para o GameScreen
  };

  const handleViewHistory = () => {
    navigation.navigate('History', { history }); // Passando o histórico como parâmetro para o HistoryScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>4 em Linha</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Começar Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewHistory}>
        <Text style={styles.buttonText}>Histórico</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEFA',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
