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
import { styles, colors, fonts } from '../styles'
import {  carregaCliente, setCliente, clearPedido, addMeusPedidos } from '../actions'
import { connect } from 'react-redux'
import Separador from '../components/separador'
import axios from '../axios'
import moment from 'moment'
import { AsyncStorage } from 'react-native'
class codigo extends Component {
  constructor (props) {
    super(props)
    const telefone = props.navigation.getParam("telefone")
    telefonef = props.navigation.getParam("telefonef")
    console.log(telefone)
    this.state = {
      telefone,
      codigo: ''
    }
  }

  setCodigo = e => {
    this.setState({ codigo: e })
  }


  cadastrar = async () => {
    if (this.state.codigo.length != 6) {
      alert('Digite o código com 6 digitos!')
    } else {
      try {
        let Body = {username:this.state.telefone,password:this.state.codigo}
        const res = await axios.post('/auth/codigocheck/', Body)
       
        await setCliente(res.data.cliente)
        await AsyncStorage.setItem('token', res.data.token)
        this.props.navigation.navigate('cadastro')
       
      } catch (error) {
        console.log(error)
        alert('Código Iválido')
      }
    }
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Verifique seu número</Text>
            <Text style={styles.titulo}>{telefonef}</Text>
            <Text style={styles.subtitulo}>
              O Calangoo enviou um SMS para verificar seu número de telefone,
              insira seu código com 6 digitos.
            </Text>
          </View>
          <Separator />
          <View
            style={{
              marginLeft: '20%',
              width: '60%',
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Item rounded>

              <TextInputMask
                style={{
                  height: 40,
                  width: '100%'
                }}
                refInput={ref => {
                  this.input = ref
                }}
                keyboardType='phone-pad'
                textAlign={'center'}
                value={this.state.codigo}
                placeholder='Seu código'
                onChangeText={(formatted, extracted) => {
                  this.setCodigo(extracted)
                }}
                mask={'[000]-[000]'}
              />
            </Item>
          </View>
          <Separator />

          <Button
            success
            onPress={() => this.cadastrar()}
            style={{
              marginLeft: '20%',
              width: '60%',
              marginTop: 20,
              marginBottom: 20,
              justifyContent: 'center'
            }}
          >
            <Text>Verificar</Text>
          </Button>

          <Separator />
          <ListItem icon onPress={()=>{this.props.navigation.navigate("numero")}}>
            <Left>
              <Button success>
                <Icon active name="chatbubbles" />
              </Button>
            </Left>
            <Body>
              <Text>Reenviar SMS</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator />
        </Content>
      </Container>
    )
  }
}
export default connect(store => ({ store }))(codigo)
