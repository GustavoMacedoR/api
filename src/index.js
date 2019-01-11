import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import { styles, colors,fonts } from './styles'
import { Button, Text, Icon, Footer, FooterTab, Root } from 'native-base'
import {
  lojas,
  produto,
  produtos,
  atributos,
  adicionais,
  pedido,
  endereco,
  enderecos,
  cadastro,
  contato,
  pagamento,tipopagamento,perfil,numero,codigo
} from './pages'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store'
import { AsyncStorage, Alert } from 'react-native'
export const store = createStore(rootReducer)

const Tab = createBottomTabNavigator(
  {
    lojas,
    loja: lojas,
    produtos,
    perfil
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              transparent={props.navigation.state.index === 0}
              onPress={() => props.navigation.navigate('lojas')}
            >
              <Icon
                name='ios-home'
                active={props.navigation.state.index === 0}
              />
              <Text style={{fontSize:fonts.smaller}}>Restaurantes</Text>
            </Button>
            <Button
              vertical
              transparent={props.navigation.state.index === 1}
              onPress={() => props.navigation.navigate('pedido')}
            >
              <Icon
                name='ios-pricetag'
                active={props.navigation.state.index === 1}
              />
              <Text style={{fontSize:fonts.smaller}}>Promoções</Text>
            </Button>
            <Button
              vertical
              transparent={props.navigation.state.index === 2}
              onPress={() => props.navigation.navigate('pedido')}
            >
              <Icon
                name='ios-cart'
                active={props.navigation.state.index === 2}
              />
              <Text style={{fontSize:fonts.smaller}}>Pedidos</Text>
            </Button>
            <Button
              vertical
              transparent={props.navigation.state.index === 3}
              onPress={() => props.navigation.navigate('perfil')}
            >
              <Icon
                name='ios-person'
                active={props.navigation.state.index === 3}
              />
              <Text style={{fontSize:fonts.smaller}}>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
)

const Stack = createStackNavigator(
  {
    produtos,
    produto,
    cadastro,
    atributos,
    adicionais,
    pedido,
    endereco,
    enderecos,
    contato,
    pagamento,
    tipopagamento
  },

  { mode: 'modal', headerMode: 'none' }
)
const login = createStackNavigator(
  {
    numero,
    codigo
  },

  { mode: 'modal', headerMode: 'none' }
)
const RootNav = createStackNavigator(
  {
    tab: Tab,
    stack: Stack,
    login
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
