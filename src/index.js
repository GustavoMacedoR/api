import React from 'react';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab,Root } from "native-base";
import {lojas,produto,produtos,atributos,adicionais,pedido,cadastro} from "./pages";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store'
import { AsyncStorage,Alert } from 'react-native'
export const store = createStore(rootReducer)

const Tab = createBottomTabNavigator({
    lojas:  lojas,
    loja: lojas,
    produtos: produtos
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
         
        <Footer>
          <FooterTab>
            <Button
              vertical
              transparent={props.navigation.state.index === 0}
              onPress={() => props.navigation.navigate("lojas")}>
              <Icon name="ios-home" active={props.navigation.state.index === 0} />
              <Text>Restaurantes</Text>
            </Button>
            <Button
              vertical
              transparent={props.navigation.state.index === 1}
              onPress={() => props.navigation.navigate("pedido")}>
              <Icon name="ios-pricetag" active={props.navigation.state.index === 1} />
              <Text>Promoções</Text>
            </Button>
            <Button
              vertical
              transparent={props.navigation.state.index === 2}
              onPress={() => props.navigation.navigate("pedido")}>
              <Icon name="ios-cart" active={props.navigation.state.index === 2} />
              <Text>Pedidos</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
  );

const Stack = createStackNavigator(
    {
      produtos: produtos,
      produto: produto,
      cadastro: cadastro,
      atributos: atributos,
      adicionais: adicionais,
      pedido: pedido,
    },
    
    { mode: "modal", headerMode: "none" }
  );
  const RootNav = createStackNavigator(
    {
      tab: Tab,
      stack: Stack,
      
    },
    { mode: "modal", headerMode: "none" }
  );

const App = () => (
  <Root>
  <Provider store={store}>
    <RootNav />
  </Provider>
  </Root>
)

export default App;

