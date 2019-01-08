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
  Text,
  Separator,
  Button,
  Icon,
  View
} from 'native-base'
import MkNumberPicker from '../components/mknumerpicker'
import { styles, colors } from '../styles'

class adicionais extends Component {
  constructor (props) {
    super(props)

    const novo = {}
    props.navigation.state.params.opcoes.map(grupo =>
      grupo.itens.map(
        adicional =>
          (novo[adicional._id] = {
            _id: adicional._id,
            quantidade: 0,
            nome: adicional.nome,
            valor: adicional.valor
          })
      )
    )

    // console.log(novo)
    // console.log(props.navigation.state.params.atual)

    props.navigation.state.params.atual.map(item => {
     
      if (novo[item._id]){
       novo[item._id].quantidade = item.quantidade
       
      }
    })
    console.log(novo)

    this.state = {
      adicionais: novo
    }
  }

  setQuantidade = (_id, qtd) => {
    const novo = JSON.parse(JSON.stringify(this.state.adicionais))
    novo[_id].quantidade = qtd
    this.setState({ adicionais: novo })
  }

  render () {
    const { onConfirm, opcoes } = this.props.navigation.state.params
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Selecione</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Adicionais</Text>
          </View>
          <List>
            {opcoes.map(grupo => (
              <View key={grupo._id}>
                <Separator bordered>
                  <Text>{grupo.nome}</Text>
                </Separator>
                {grupo.itens.map((adicional, index) => (
                  <MkNumberPicker
                    key={index}
                    onChange={e => {
                      this.setQuantidade(adicional._id, e)
                    }}
                    titulo={adicional.nome + ' - R$ '+adicional.valor}
                    
                    inicial={this.state.adicionais[adicional._id].quantidade}
                    min='0'
                    max='10'
                  />
                ))}
              </View>
            ))}
          </List>
          <View style={styles.container}>
            <Button
              iconLeft
              block
              onPress={() => {
                onConfirm(this.state.adicionais)
                navigation.goBack()
              }}
            >
              <Icon name='ios-checkmark' />
              <Text>Confirmar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
export default adicionais
