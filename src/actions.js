import { store } from './index'
import axios from './axios'
import { AsyncStorage } from 'react-native'

export const atualizaLoja = async () => {
  const res = await axios.get('loja')
  store.dispatch({ type: 'SET_LOJA_LIST', itens: res.data },console.log(res.data))
  
}
export const atualizaBairro = async () => {
  const res = await axios.get('bairros')
  store.dispatch({ type: 'SET_BAIRRO_LIST', itens: res.data })
}

export const atualizaProduto = async id => {
  const res = await axios.get('loja/' + id + '/')
  store.dispatch({ type: 'SET_CATEGORIA', id, categoria: res.data })
  console.log('atualizaProduto', res.data)
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

export const addEnderecoPedido = async item => {
  await store.dispatch({ type: 'ADD_ENDERECO_PEDIDO', item })
  await AsyncStorage.setItem('pedido', JSON.stringify(store.getState().pedido))
}

export const addBusca = async item => {
  await store.dispatch({ type: 'ADD_BUSCA', item })
  await AsyncStorage.setItem('pedido', JSON.stringify(store.getState().pedido))
}
export const addObservacao = async item => {
  await store.dispatch({ type: 'ADD_OBSERVACAO', item })
  await AsyncStorage.setItem('pedido', JSON.stringify(store.getState().pedido))
}
export const addEndereco = async item => {
  await store.dispatch({ type: 'ADD_ENDERECO', item })
  await AsyncStorage.setItem(
    'endereco',
    JSON.stringify(store.getState().endereco)
  )
  addEnderecoPedido(item)
}

export const addTipoPagamento = async item => {
  await store.dispatch({ type: 'ADD_TIPO_PAGAMENTO', item })
  await AsyncStorage.setItem('pedido', JSON.stringify(store.getState().pedido))
}

export const carregaPedido = async item => {
  store.dispatch({ type: 'CARREGA_PEDIDO', item }) 
}
export const carregaEndereco = async item => {
  store.dispatch({ type: 'CARREGA_ENDERECO', item })
}
export const carregaCliente = async item => {
  store.dispatch({ type: 'CARREGA_CLIENTE', item })
}


export const setCliente = async item => {
  store.dispatch({ type: 'CARREGA_CLIENTE', item })
  await AsyncStorage.setItem('cliente', JSON.stringify(store.getState().cliente))
}


export const clearCliente = async item => {
  store.dispatch({ type: 'CLEAR_CLIENTE', item })
  await AsyncStorage.removeItem('cliente')
}
export const clearPedido = async item => {
  store.dispatch({ type: 'CLEAR_PEDIDO', item })
  AsyncStorage.removeItem('pedido')
}
