import { combineReducers } from 'redux'
import { AsyncStorage } from 'react-native'

loja = (state = {}, action) => {
  var novo = {}
  switch (action.type) {
    case 'ADD_LOJA':
      novo = { ...state }
      novo[action.item.id] = action.item
      return novo
    case 'SET_LOJA':
      return action.item
    case 'SET_LOJA_LIST':
      action.itens.map(item => {
        novo[item.id] = item
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
      novo[action.id] = action.categoria.categorias
      return novo
    default:
      return state
  }
}

bairro = (state = {}, action) => {
  var novo = {}
  switch (action.type) {
    case 'SET_BAIRRO_LIST':
    action.itens.map(item => {
      novo[item.id] = item
    })
      return novo
    default:
      return state
  }
}

endereco = (state = [], action) => {
  var novo = []
  switch (action.type) {
    case 'CARREGA_ENDERECO':
      return action.item
    case 'ADD_ENDERECO':
      novo = [...state]
      novo.push(action.item)
      return novo
    default:
      return state
  }
}
cliente = (state = {}, action) => {
  var novo = {}
  switch (action.type) {
    case 'CARREGA_CLIENTE':
      return action.item
    case 'CLEAR_CLIENTE':
      return novo
    default:
      return state
  }
}

pedidos = (state = [], action) => {
  var novo = {}
  switch (action.type) {
    case 'CARREGA_PEDIDOS':
      return action.item
    case 'CLEAR_PEDIDOS':
      return novo
    default:
      return state
  }
}

feed = (state = [], action) => {
  var novo = {}
  switch (action.type) {
    case 'CARREGA_FEED':
      return action.item
    case 'CLEAR_FEED':
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
      if (state.loja.id != item.loja.id) {
        novo.loja = item.loja
        novo.lista = []
      }
      novo.lista.push({ produto: item.produto, produto_opc: item.produto_opc })

      return novo
    case 'REMOVE_PRODUTO':
      novo = { ...state }
      novo.lista.splice(item, 1)
      return novo

    case 'ADD_BUSCA':
      novo = { ...state }
      novo.endereco = undefined
      novo.mododeentrega = 'BUSCAR'
      return novo

    case 'ADD_ENDERECO_PEDIDO':
      novo = { ...state }
      novo.endereco = action.item
      novo.mododeentrega = 'RECEBER'
      return novo
    case 'ADD_TIPO_PAGAMENTO':
      novo = { ...state }
      novo.tipopagamento = action.item
      return novo
    case 'ADD_OBSERVACAO':
      novo = { ...state }
      novo.observacao = action.item
      return novo
    case 'CARREGA_PEDIDO':
      return action.item
    case 'CLEAR_PEDIDO':
      return novo
    default:
      return state
  }
}

const rootReducer = combineReducers({
  loja,
  categoria,
  pedido,
  endereco,
  cliente,
  pedidos,
  feed,
  bairro
})
export default rootReducer
