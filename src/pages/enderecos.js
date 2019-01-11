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
  Fab
} from 'native-base'
import { styles, colors } from '../styles'
import { connect } from 'react-redux'
import {addEnderecoPedido} from '../actions'
class enderecos extends Component {

  componentWillMount(){

   if (!this.props.store.pedido.endereco){
      addEnderecoPedido(this.props.store.endereco[0])
      console.log("addEnderecoPedido",this.props.store.endereco[0])
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
            <Title>Endereço</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate("contato")}>
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
         
          {this.props.store.endereco.map((endereco,index) => (
            
            <ListItem key={index} onPress={()=>{addEnderecoPedido(endereco)}}>
            <View style={{width:60}}>
                      <Button transparent light={
                        !this.props.store.pedido.endereco ? false : 
                            endereco._id != this.props.store.pedido.endereco._id}>
                        <Icon name='ios-checkmark-circle' />
                        
                      </Button>
                    </View>
              <Body>
                <Text>Bairro:{endereco.bairro}</Text>
                <Text>
                  Rua/Av:{endereco.rua} | Nº {endereco.numero}
                </Text>
                <Text>Comp:{endereco.complemento}</Text>
              </Body>
            </ListItem>
          ))}
        </Content>
        <Fab
            style={{ backgroundColor: colors.danger }}
            position='bottomRight'
            onPress={() => this.props.navigation.navigate('endereco')}
          >
            <Icon name='add' />
          </Fab>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(enderecos)
