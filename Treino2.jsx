import React, { useState } from 'react'
import { Button, Text } from 'react-native'
import Treino from './Treino'

const Treino2 = () => {
    const texto = "Treino 2";
  const [counter, setcouter] = useState(0);

  return (
    <>
        <Treino texto= "Primeiro"/>
        <Text style ={{fontSize: 80}} >{counter}</Text>
        <Button title= 'Incrementai' onPress={() => setcouter(counter +1)} />
        <Button title= 'Decrementa' onPress={() => setcouter(counter -1)} />
    </>
  )
}

export default Treino2