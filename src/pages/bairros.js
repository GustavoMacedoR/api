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
  Thumbnail
} from 'native-base'
import { styles } from '../styles'
class bairros extends Component {
  render () {
    const {
      onSelect,
      atual,
      atributo,
      atributo: { _id, atributos }
    } = this.props.navigation.state.params
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
            <Text style={styles.titulo}>{atributo.nome}</Text>
          </View>

          <List>
            {atributo.grupos.map(grupo => (
              <View key={grupo._id}>
                <Separator bordered>
                  <Text>{grupo.nome}</Text>
                </Separator>
                {grupo.itens.map(item => (
                  <ListItem
                    icon
                    key={item._id}
                    onPress={() => {
                      onSelect(atributo._id, item)
                      navigation.goBack()
                    }}
                  >
                    <Left>
                      <Button transparent light={item._id != atual}>
                        <Icon name='ios-checkmark-circle' />
                      </Button>
                    </Left>
                    <Body>
                      <Text>{item.nome} {item.valor == 0 ? null : ' - R$ ' + item.valor }</Text>
                    </Body>
                  </ListItem>
                ))}
              </View>
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}
export default bairros
