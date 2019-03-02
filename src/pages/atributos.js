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
class atributos extends Component {
  render() {
    const {
      onSelect,
      atual,
      atributo,
      atributo: { id, atributos }
    } = this.props.navigation.state.params
    const { navigation } = this.props
    console.log(atributo)

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
          {atributo.grupos.map(grupo => (
            <View key = {grupo.id}>
              <Separator>
                <Text>{grupo.nome}</Text>
              </Separator>
              <List key = {grupo.id}>
                {grupo.itens.map(item => (
                  <ListItem
                    icon
                    key={item.id}
                    onPress={() => {
                      onSelect(grupo.id, item)
                      navigation.goBack()
                    }}
                  >
                    <Left>
                      <Button transparent light={item.id != atual}>
                        <Icon name='ios-checkmark-circle' />
                      </Button>
                    </Left>
                    <Body>
                      <Text>{item.nome} {item.valor == 0 ? null : ' - R$ ' + item.valor}</Text>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </View>
          ))}
        </Content>
      </Container>
    )
  }
}
export default atributos
