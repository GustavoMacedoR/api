import React from 'react';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import {lojas,produto,produtos,atributos,adicionais,pedido} from "./pages";




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
              onPress={() => props.navigation.navigate("NineChat")}>
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
      pedido: pedido,
      atributos: atributos,
      adicionais: adicionais
    },
    { mode: "modal", headerMode: "none" }
  );
  const Root = createStackNavigator(
    {
      tab: Tab,
      stack: Stack,
    },
    { mode: "modal", headerMode: "none" }
  );

const App = () => <Root />

export default App;

