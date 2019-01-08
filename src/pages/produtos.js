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
  View
} from 'native-base'
import { styles } from '../styles'
import axios from '../axios'
import { YellowBox } from 'react-native'
import { connect } from 'react-redux'
import { atualizaProduto } from '../actions'
YellowBox.ignoreWarnings(['Warning: ...'])

class produtos extends Component {
  constructor (props) {
    super(props)
    const loja = this.props.navigation.state.params.loja
    this.state = { loja }
  }

  async componentDidMount () {
    atualizaProduto(this.state.loja._id)
    // this.props.navigation.navigate("produto", { produto: this.state.categorias[0].produtos[0] });
  }

  goProduto = produto => {
    this.props.navigation.navigate('produto', {
      produto: produto,
      loja: this.state.loja
    })
  }

  render () {
    const { navigation } = this.props

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.dismiss()
              }}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Cadápio</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>{this.state.loja.nome}</Text>
            <Text style={styles.subtitulo}>{this.state.loja.legenda}</Text>
          </View>

          <List>
            {!this.props.store.categoria[this.state.loja._id]
              ? null
              : this.props.store.categoria[this.state.loja._id].map(
                (categoria, categoria_index) => (
                  <View key={categoria._id}>
                    <Separator bordered>
                      <Text>{categoria.nome}</Text>
                    </Separator>
                    {categoria.produtos.map((produto, produto_index) => (
                      <ListItem
                        key={produto._id}
                        onPress={() => this.goProduto(produto)}
                      >
                        <Body>
                          <Text>
                            {produto.nome} - R${' '}
                            {parseFloat(produto.valor).toFixed(2)}
                          </Text>
                          <Text note>{produto.legenda}</Text>
                        </Body>
                        <Right>
                          <Icon name='arrow-forward' />
                        </Right>
                      </ListItem>
                    ))}
                  </View>
                )
              )}
          </List>
        </Content>
      </Container>
    )
  }
}
export default connect(store => ({ store }))(produtos)
