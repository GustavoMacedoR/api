import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { styles, colors, fonts } from '../styles'
import { Button, Text, Icon, Footer, FooterTab } from 'native-base'
import { lojas, feed, perfil,pedidos } from '../pages'


export default createBottomTabNavigator(
  {
    lojas,
    feed,
    pedidos,
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
              <Text style={{ fontSize: fonts.smaller }}>Restaurantes</Text>
            </Button>
            <Button
              vertical
              transparent={props.navigation.state.index === 1}
              onPress={() => props.navigation.navigate('feed')}
            >
              <Icon
                name='logo-rss'
                active={props.navigation.state.index === 1}
              />
              <Text style={{ fontSize: fonts.smaller }}>Feed</Text>
            </Button>
            <Button
              vertical
              transparent={props.navigation.state.index === 2}
              onPress={() => props.navigation.navigate('pedidos')}
            >
              <Icon
                name='ios-cart'
                active={props.navigation.state.index === 2}
              />
              <Text style={{ fontSize: fonts.smaller }}>Pedidos</Text>
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
              <Text style={{ fontSize: fonts.smaller }}>Conta</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
)
