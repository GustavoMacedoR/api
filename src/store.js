import { combineReducers } from 'redux'
import { AsyncStorage } from 'react-native'
loja = (state = {}, action) => {
  var novo = {}
  switch (action.type) {
    case 'ADD_LOJA':
      novo = { ...state }
      novo[action.item._id] = action.item
      return novo
    case 'SET_LOJA':
      return action.item
    case 'SET_LOJA_LIST':
      action.itens.map(item => {
        novo[item._id] = item
      })
      return novo
    case 'CLEAR_LOJA':
      return {}
    default:
      return state
  }
}
categoria = (state = {}, action) => {
  var novo = {}
  switch (action.type) {
    case 'SET_CATEGORIA':
      novo = { ...state }
      novo[action._id] = action.categoria.produtos
      return novo
    default:
      return state
  }
}

pedido = (state = { loja: {}, lista: [] }, action) => {
  const { type, item } = action
  var novo = { loja: {}, lista: [] }
  switch (type) {
    case 'ADD_PRODUTO':
      novo = { ...state }
      if (state.loja._id != item.loja._id) {
        novo.loja = item.loja
        novo.lista = []
      }
      novo.lista.push({ produto: item.produto, produto_opc: item.produto_opc })

      return novo
    case 'REMOVE_PRODUTO':
      novo = { ...state }
      novo.lista.splice(item, 1)
      return novo
    case 'CARREGA_PEDIDO':
      return action.item
    case 'CLEAR_PEDIDO':
      return novo

    default:
      return state
  }
}

const rootReducer = combineReducers({ loja, categoria, pedido })
export default rootReducer
