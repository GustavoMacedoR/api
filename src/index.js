import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { styles, colors, fonts } from './styles'
import { Root } from 'native-base'
import {
  produto,
  produtos,
  atributos,
  adicionais,
  enderecos,
  pedido,
  cadastro,
  nome,
  pagamento,
  tipopagamento,
  numero,
  codigo,
  informacoespedido,
  addendereco
} from './pages'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store'
import tab from './router/BottomTab'
export const store = createStore(rootReducer)

const stack = createStackNavigator(
  {
    produtos,
    produto,
    cadastro,
    atributos,
    adicionais,
    pedido,
    pagamento,
    tipopagamento,
  },

  { mode: 'modal', headerMode: 'none' }
)

const info = createStackNavigator(
  {
    informacoespedido,
    addendereco
  },
  { mode: 'modal', headerMode: 'none' }
)

const login = createStackNavigator(
  {
    numero,
    codigo,
    nome,
    enderecos
  },

  { mode: 'modal', headerMode: 'none' }
)
const RootNav = createStackNavigator(
  {
    tab,
    stack,
    login,
    info
  },
  { mode: 'modal', headerMode: 'none' }
)

const App = () => (
  <Root>
    <Provider store={store}>
      <RootNav />
    </Provider>
  </Root>
)

export default App
