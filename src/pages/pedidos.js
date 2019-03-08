import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  Title,
  Body,
  Left,
  Right,
  List,
  ListItem,
  Text,
  Separator,
  Button,
  Icon,
  View,
  Thumbnail,
  Item,
  Input
} from 'native-base'
import { connect } from 'react-redux'
import { YellowBox } from 'react-native'
import { AsyncStorage } from 'react-native'
import { styles, colors, fonts } from '../styles'
import { attMeusPedidos } from '../actions'
import Menu, { MenuItem } from 'react-native-material-menu';
YellowBox.ignoreWarnings(['Warning: ...'])
console.disableYellowBox = true
class pedidos extends Component {

  constructor(props) {

    super(props);

    const move = this.navigation

    this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {

      //this._retrieveData()
      this.atualizar()
    });
  }

  state = {
    produto: null
  }

  atualizar = async () => {
    var pedidos = JSON.parse(await AsyncStorage.getItem('pedidoAtual'))
    console.log("pedidods", pedidos)
    if (pedidos != null && pedidos != undefined) {
      await attMeusPedidos(pedidos)
    }
    console.log("aaaa", this.props.store)
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };


  render() {

    return (
      <Container>
        <Header><Left />
          <Body>
            <Title>CalanGoo</Title>
          </Body>
          <Right>
            <Menu
              ref={this.setMenuRef}
              button={<Button transparent onPress={this.showMenu}><Icon name='more' style={{ color: 'white' }} /></Button>}>
              <MenuItem onPress={() => { this.hideMenu(), this.props.navigation.navigate('addendereco') }}>Endereços</MenuItem>
            </Menu>
          </Right>
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Meus Pedidos</Text>
          </View>
          <Separator><Text>Pedidos Enviados</Text></Separator>
          <List>
            {Object.keys(this.props.store.meuspedidos).map(item => {
              return (
                <ListItem key={item} onPress={() => { this.props.navigation.navigate('info', { item: this.props.store.meuspedidos[item] }) }} style={{ flexDirection: 'row', borderBottomWidth: 2, borderColor: '#e6e6e6', padding: 5, margin: 2 }}>
                  <View key={item} style={{ flex: 2 }}>
                  {this.props.store.loja[this.props.store.meuspedidos[item].loja] != undefined && <Text style={{ fontWeight: 'bold' }}>{this.props.store.loja[this.props.store.meuspedidos[item].loja].nome}</Text>}
                    <View style={{ flexDirection: 'row', margin: 3 }}>
                      <Text note style={{ fontWeight: 'bold' }}>Valor Total: </Text>
                      {this.props.store.meuspedidos != undefined && <Text style={{ fontWeight: 'bold' }}>{this.props.store.meuspedidos[item].valor}</Text>}
                    </View>
                  </View>

                  <View style={{ flex: 2 }}>
                  {this.props.store.meuspedidos != undefined && <Text style={{ fontWeight: 'normal', alignSelf: 'flex-end' }}>{this.props.store.meuspedidos[item].enviado}</Text>}
                    <View style={{ flexDirection: 'row-reverse', margin: 3 }}>
                    {this.props.store.meuspedidos != undefined && <Text style={{ fontWeight: 'normal', fontSize: fonts.regular }}>{this.props.store.meuspedidos[item].status}</Text>}
                      <Text note style={{ fontWeight: 'bold' }}>Status : </Text>
                    </View>
                  </View>
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(pedidos)
