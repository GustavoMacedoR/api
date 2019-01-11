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
  Textarea,
  Item,
  Label,
  Input,
  Form
} from 'native-base'
import { styles, colors } from '../styles'
import { addProduto } from '../actions'
import { connect } from 'react-redux'
class contato extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cliente: '',
      telefone: ''
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
            <Title>Contato</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('pagamento')}
            >
              <Text>Ok</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Contato</Text>
            <Text style={styles.subtitulo} />
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Nome do Cliente</Label>
              <Input
                value={this.state.cliente}
                onChangeText={e => {
                  this.setState({ cliente: e })
                }}
              />
            </Item>

            <Item stackedLabel>
              <Label>Telefone</Label>
              <Input
                value={this.state.telefone}
                keyboardType='phone-pad'
                onChangeText={e => {
                  this.setState({ telefone: e })
                }}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(contato)
