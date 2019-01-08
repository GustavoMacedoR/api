import { store } from './index'
import axios from './axios'
import { AsyncStorage } from 'react-native'

export const atualizaLoja = async () => {
  const res = await axios.get('loja')
  store.dispatch({ type: 'SET_LOJA_LIST', itens: res.data })
  console.log('atualizaLoja')
}

export const atualizaProduto = async _id => {
  const res = await axios.get('loja/produtos/' + _id)
  store.dispatch({ type: 'SET_CATEGORIA', _id, categoria: res.data })
  console.log('atualizaProduto', _id)
}

export const addProduto = async item => {
  await store.dispatch({ type: 'ADD_PRODUTO', item })
  await AsyncStorage.setItem('pedido', JSON.stringify(store.getState().pedido))

  console.log('addProduto')
}
export const removeProduto = async item => {
  await store.dispatch({ type: 'REMOVE_PRODUTO', item })
  if (store.getState().pedido.lista.length == 0) {
    await store.dispatch({ type: 'CLEAR_PEDIDO' })
    await AsyncStorage.removeItem('pedido')
  } else {
    await AsyncStorage.setItem(
      'pedido',
      JSON.stringify(store.getState().pedido)
    )
    return false
  }

  return true
}
export const carregaPedido = async item => {
  store.dispatch({ type: 'CARREGA_PEDIDO', item })
  console.log('carregaPedido')
}
