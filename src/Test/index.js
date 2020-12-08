import React, {useReducer, useState} from 'react'
import { View, Text, ActionSheetIOS, Button } from 'react-native'

export default function test() {

    const [state, dispatch] = useReducer(reducer, initialState)
    const initialState = {count: 0}
    

    function reducer (state, dispatch){
        switch (ActionSheetIOS.type){
            case 'increment':
                return {count: state.count +1}
                case 'decrement':
                    return {count: state.count -1}
                    default:
                        throw new Error()
        }
    }

  
    return (
        <View>
             Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </View>
    )
}
