import React, {useReducer, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {sha256} from 'react-native-sha256';

export default function App() {
  const [textDigitado, setTextDigitado] = useState('');

  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.item]; //Concatena o state do array atual + o novo state que vamos setar
      case 'CHECK':
        return state.map((item) => {
          if (item.id === action.id) {
            return {...item, check: !item.check}; //retorna o item da flat com o check alterado
          } else {
            return item;
          }
        });
      case 'REMOVE':
        return state.filter(item => {
          return item.id !== action.id
        })
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // const data =[
  //   {id: '1', title: 'arroz', check: false },
  //   {id: '2', title: 'feijão', check: true },
  // ]
  return (
    <View style={{alignItems: 'center', width: '100%'}}>
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-around',
        }}>
        <TextInput
          style={{flex: 1}}
          placeholder="Adicionar produto"
          value={textDigitado}
          onChangeText={(text) => setTextDigitado(text)}
        />

        <TouchableOpacity
          onPress={async () => {
            const hashId = await sha256(textDigitado); //criando um id unico para o item digitado

            dispatch({
              type: 'ADD',
              item: {
                id: hashId,
                title: textDigitado,
                check: false,
              },
            });
            setTextDigitado('');
          }}
          style={{marginHorizontal: 5, alignItems: 'center'}}>
          <Text style={{fontSize: 40}}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={state}
          renderItem={({item}) => (

            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'CHECK',
                  id: item.id,
                });
              }}
              style={{}}>
              <Text style={item.check ? styles.itemChecked : ''}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}
            onPress={() => {
              dispatch({
                type: 'REMOVE',
                id: item.id,
              })
            }}
            >
              <Text>Remove</Text>
            </TouchableOpacity>
            </View>

          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemChecked: {
    textDecorationLine: 'line-through',
  },
});
