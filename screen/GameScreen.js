import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';

const GameScreen = ({ route }) => {
  const { setHistory } = route.params;
  const navigation = useNavigation();
  const initialBoard = [...Array(6)].map(() => Array(6).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');

  const checkWinner = (board, player) => {
    // Check rows
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          board[i][j] === player &&
          board[i][j + 1] === player &&
          board[i][j + 2] === player &&
          board[i][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j] === player &&
          board[i + 2][j] === player &&
          board[i + 3][j] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonals (ascending)
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          board[i][j] === player &&
          board[i - 1][j + 1] === player &&
          board[i - 2][j + 2] === player &&
          board[i - 3][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonals (descending)
    for (let i = 3; i < 6; i++) {
      for (let j = 3; j < 6; j++) {
        if (
          board[i][j] === player &&
          board[i - 1][j - 1] === player &&
          board[i - 2][j - 2] === player &&
          board[i - 3][j - 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const checkForDraw = () => {
    return board.every((row) => row.every((cell) => cell !== null));
  };

  const handleMove = (row, col) => {
    for (let r = 5; r >= 0; r--) {
      if (board[r][col] === null) {
        const newBoard = [...board];
        newBoard[r][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWinner(newBoard, currentPlayer)) {
          const winner = currentPlayer === 'red' ? 'A' : 'B';
          Alert.alert('Fim de jogo', `O jogador ${winner} venceu!`);
          setHistory((prevHistory) => [...prevHistory, `Jogador ${winner}`]);
          setBoard(initialBoard);
          return;
        } else if (checkForDraw()) {
          Alert.alert('Fim de jogo', 'Empate!');
          setHistory((prevHistory) => [...prevHistory, 'Empate']);
          setBoard(initialBoard);
          return;
        }

        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
        return;
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <View
          style={[
            styles.legendBox,
            styles.blueBorder,
            { backgroundColor: currentPlayer === 'red' ? 'red' : 'transparent' },
          ]}
        >
          <Text style={[styles.legendText, { textAlign: 'center' }]}>Jogador A = Vermelho</Text>
        </View>
        <View
          style={[
            styles.legendBox,
            styles.blueBorder,
            { backgroundColor: currentPlayer === 'yellow' ? 'yellow' : 'transparent' },
          ]}
        >
          <Text style={[styles.legendText, { textAlign: 'center' }]}>
            Jogador B
          </Text>
          <Text style={[styles.legendText, { textAlign: 'center' }]}>
            Amarelo
          </Text>
        </View>
      </View>
      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[styles.cell, { borderColor: 'blue', backgroundColor: cell || 'white' }]}
                  onPress={() => handleMove(rowIndex, colIndex)}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87cefa', // Fundo azul claro
  },
  legendContainer: {
    flexDirection: 'row',
    marginBottom: 20, // Espaçamento entre a legenda e o tabuleiro
  },
  legendBox: {
    width: 140, // Aumentado para destacar o jogador atual
    height: 60, // Aumentado para destacar o jogador atual
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  blueBorder: {
    borderWidth: 2,
    borderColor: 'blue', // Contorno azul ao redor do retângulo
  },
  legendText: {
    color: 'black', // Alterado para preto
    fontSize: 14,
    fontWeight: 'bold',
  },
  boardContainer: {
    backgroundColor: 'blue', // Preenchimento azul do quadrado ao redor do tabuleiro
    padding: 8, // Espaçamento para fazer o quadrado ligeiramente maior
  },
  board: {
    borderWidth: 2,
    borderColor: 'blue', // Borda azul ao redor do tabuleiro
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'blue', // Botão azul
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'center', // Alinhar o botão ao centro horizontalmente
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Texto branco
  },
});

export default GameScreen;
