import React, { Component } from 'react'
import MkNumberPicker from '../components/mknumerpicker'
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
import { styles, colors } from '../styles'
import { addEndereco } from '../actions'
import { connect } from 'react-redux'

class endereco extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bairro_id: '',
      rua: '',
      numero: '',
      complemento: ''
    }
  }

  cadastrar = () => {
    const _id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    addEndereco({ ...this.state, _id })
    this.props.navigation.replace('contato')
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
            <Title>Endereço</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.cadastrar()}>
              <Text>Ok</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Endereço de Entrega</Text>
            <Text style={styles.subtitulo} />
          </View>
          <Separator />
          <Form>
            <ListItem
              onPress={() => {
                this.props.navigation.navigate('nome')
              }}
            >
              <Body>
                <Text note>Bairro</Text>
                <Text>{this.props.store.cliente.nome}</Text>
              </Body>
              <Right>
                <Icon name='arrow-forward' />
              </Right>
            </ListItem>
            <Item stackedLabel>
              <Label>Rua/Av</Label>
              <Input
                value={this.state.rua}
                onChangeText={e => {
                  this.setState({ rua: e })
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Número</Label>
              <Input
                value={this.state.numero}
                onChangeText={e => {
                  this.setState({ numero: e })
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Complemento</Label>
              <Input
                multiline
                numberOfLines={4}
                value={this.state.complemento}
                onChangeText={e => {
                  this.setState({ complemento: e })
                }}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
export default connect(store => ({ store }))(endereco)
