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
class tipopagamento extends Component {
  render () {
    const {
      onSelect,
      lista,
      atual
      
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
            <Text style={styles.titulo}>Tipo de Pagamento</Text>
          </View>

          <List>

                {lista.map((item,index) => (
                  <ListItem
                    icon
                    key={index}
                    onPress={() => {
                      onSelect(item)
                      navigation.goBack()
                    }}
                  >
                    <Left>
                      <Button transparent light={item != atual}>
                        <Icon name='ios-checkmark-circle' />
                      </Button>
                    </Left>
                    <Body>
                      <Text>{item}</Text>
                    </Body>
                  </ListItem>
                ))}
              
            
          </List>
        </Content>
      </Container>
    )
  }
}
export default tipopagamento
