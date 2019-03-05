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
import { addEndereco } from '../actions'
import { connect } from 'react-redux'
import Separador from '../components/separador'
import axios from '../axios'
import moment from 'moment'
import { Alert } from 'react-native'

class numero extends Component {
  constructor (props) {
    super(props)
    this.state = {
      telefone: '',
      telefonef: '',
      send_telefone: '',
      send_telefonef: '',
      segundos: 0,
      segundosf: '',
      interval: null
    }

    this.user = {
      username:'',
      usernamef:''
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.interval)
  }

  setTelefone = (e, ef) => {
    this.setState(this.user = { username: e, usernamef: ef })
  }

  regressivo = () => {
    const segundos = this.state.segundos - 1
    this.setState({ segundos })
    const dia = moment()
      .startOf('day')
      .add(segundos, 'seconds')
    this.setState({ segundosf: dia.format('mm:ss') })
    if (this.state.segundos <= 0) clearInterval(this.state.interval)
  }

  cadastrar = async () => {
    console.log(this.user.username.length)
    if (this.user.username.length != 11) {
      alert('Digite o seu número com DDD!')
    } else {
      let Body = {username:this.user.username}
      Alert.alert(
        'Confirmação de número',
        'O número \n ' + this.user.usernamef + ' \n está correto?',
        [
          {
            text: 'Sim',
            onPress: async () => {
              try {
                await axios.post('/auth/telefonecheck/', Body)
                this.props.navigation.navigate('codigo',{telefone:this.user.username, telefonef:this.user.usernamef})
              } catch (error) {
                console.log(error)
                alert('Não foi possível enviar o SMS.')
              }
            }
          },
          { text: 'Editar', onPress: () => {} }
        ],
        { cancelable: false }
      )
    }
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.dismiss()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Telefone</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Verifique seu número</Text>
            <Text style={styles.subtitulo}>
              O Calangoo enviará um SMS para verificar seu número de telefone,
              insira seu número de telefone com o DDD.
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
                value={this.user.username}
                placeholder='Seu número'
                onChangeText={(formatted, extracted) => {
                  this.setTelefone(extracted, formatted)
                  // console.log(formatted) // +1 (123) 456-78-90
                  // console.log(extracted) // 1234567890
                }}
                mask={'([00]) [00000]-[0000]'}
              />
            </Item>
          </View>

          <Separator />
          {this.state.segundos <= 0 ? (
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
              <Text>Avançar</Text>
            </Button>
          ) : (
            <View>
              <View style={styles.container}>
                <Text style={styles.titulo}>Reenviar SMS</Text>
                <Text style={styles.subtitulo}>
                  Um código já foi enviado a pouco tempo, para reeviar o SMS
                  aguarde alguns instantes:
                </Text>
                <View>
                  <Text
                    style={{
                      marginTop: 20,

                      textAlign: 'center', // <-- the magic
                      fontWeight: 'bold',
                      fontSize: fonts.megabigger
                    }}
                  >
                    {' '}
                    {this.state.segundosf}
                  </Text>
                </View>
              </View>
              <Separator />
              <Button
                light
                onPress={() => {
                  this.props.navigation.navigate('codigo', {
                    telefone: this.state.send_telefone,
                    telefonef: this.state.send_telefonef
                  })
                }}
                style={{
                  marginLeft: '20%',
                  width: '60%',
                  marginTop: 20,
                  justifyContent: 'center'
                }}
              >
                <Text>Já Tenho o Código</Text>
              </Button>
            </View>
          )}
        </Content>
      </Container>
    )
  }
}
export default connect(store => ({ store }))(numero)
