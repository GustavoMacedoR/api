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

class perfil extends Component {
  
  componentWillMount(){
    if (!this.props.store.cliente.codigo){
      this.props.navigation.navigate("login")
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
            <Title>Perfil</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Perfil</Text>
            <Text style={styles.subtitulo}>
              {this.props.store.cliente.telefone}
            </Text>
          </View>
          <Separator />
          
        </Content>
      </Container>
    )
  }
}
export default connect(store => ({ store }))(perfil)
