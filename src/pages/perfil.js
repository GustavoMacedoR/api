import React, { Component } from 'react'
import MkNumberPicker from '../components/mknumerpicker'
import TextInputMask from 'react-native-text-input-mask'
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
  Form,
  Textarea,
  Item,
  Label,
  Input
} from 'native-base'
import { Alert } from 'react-native'
import { styles, colors, fonts } from '../styles'
import { addEndereco, clearCliente } from '../actions'
import { connect } from 'react-redux'
import { formatTelefone } from '../helper/format'
import Separador from '../components/separador'
import axios from '../axios'
import moment from 'moment'

class perfil extends Component {
  componentWillMount () {
    // if (!this.props.store.cliente.codigo) {
    //   this.props.navigation.navigate('login')
    // }
    // console.log("this.props.store.cliente.codigo",this.props.store.cliente.codigo)
  }

  logout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da conta?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            clearCliente()
          }
        },
        { text: 'Cancelar', onPress: () => {} }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>CalanGoo</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Minha Conta</Text>
          </View>
          <Separator />

          {this.props.store.cliente.codigo ? (
            <View>
              <ListItem onPress={()=>{
                this.props.navigation.navigate("nome")
              }}>
                <Body>
                  <Text note>Nome</Text>
                  <Text>{this.props.store.cliente.nome}</Text>
                </Body>
                <Right>
                <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text note>Sobrenome</Text>
                  <Text>{this.props.store.cliente.sobrenome}</Text>
                </Body>
                <Right>
                <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text note>Telefone</Text>
                  <Text>
                    {formatTelefone(this.props.store.cliente.telefone)}
                  </Text>
                </Body>
              </ListItem>
              <Separator />
              <ListItem
                icon
                onPress={() => {
                  this.logout()
                }}
              >
                <Left>
                  <Button danger>
                    <Icon active name='log-out' />
                  </Button>
                </Left>
                <Body>
                  <Text>Sair da Conta</Text>
                </Body>
                <Right>
                  <Icon active name='arrow-forward' />
                </Right>
              </ListItem>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.titulo}>
                Você não está logado em nehuma conta!
              </Text>
              <Text style={styles.subtitulo}>Entre agora!</Text>

              <Button
                style={{marginTop:20}}
                danger
                block
                onPress={() => {
                  this.props.navigation.navigate('login')
                }}
              >
                <Text>Entrar</Text>
              </Button>
            </View>
          )}

          <Separator />
        </Content>
      </Container>
    )
  }
}
export default connect(store => ({ store }))(perfil)
