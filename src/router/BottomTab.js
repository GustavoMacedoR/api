import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { styles, colors, fonts } from '../styles'
import { Button, Text, Icon, Footer, FooterTab } from 'native-base'
import { lojas, feed, perfil,pedidos } from '../pages'


export default createBottomTabNavigator(
  {
    lojas,
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
              bordered={props.navigation.state.index === 0}
              light={props.navigation.state.index === 0}
              onPress={() => props.navigation.navigate('lojas')}
            >
              <Icon
                name='ios-home'
                style={{color:'white'}}

                //active={props.navigation.state.index === 0} 
              />
              <Text style={{ fontSize: fonts.small, fontWeight:'bold', color:'white' }}>Restaurantes</Text> 
            </Button>
            <Button
              vertical
              bordered={props.navigation.state.index === 1}
              light={props.navigation.state.index === 1}
              onPress={() => props.navigation.navigate('pedidos')}
            >
              <Icon
                name='ios-cart'
                style={{color:'white'}}
                //active={props.navigation.state.index === 1}
              />
              <Text style={{ fontSize: fonts.small, fontWeight:'bold', color:'white' }}>Pedidos</Text>
            </Button>
            <Button
              vertical
              bordered={props.navigation.state.index === 2}
              light={props.navigation.state.index === 2}
              onPress={() => props.navigation.navigate('perfil')}
            >
              <Icon
                name='ios-gift'
                style={{color:'white'}}
                //active={props.navigation.state.index === 2}
              />
              <Text style={{ fontSize: fonts.small, fontWeight:'bold', color:'white' }}>Promoções</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
)
