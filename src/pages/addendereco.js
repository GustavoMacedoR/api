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
    Thumbnail,
    Item,
    Input
} from 'native-base'
import { connect } from 'react-redux'
import { YellowBox } from 'react-native'
import { AsyncStorage } from 'react-native'
import { styles, colors, fonts } from '../styles'
import { attMeusPedidos } from '../actions'

YellowBox.ignoreWarnings(['Warning: ...'])
console.disableYellowBox = true
class addEnderecos extends Component {

    constructor(props) {

        super(props);

        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {

            //this._retrieveData()
            this.atualizar()
        });   
    
    this.state = {
        produto: null,
        enderecos: [{
            bairro: "Nova Imperatriz",
            cep: "12341234",
            cidade: "Imperatriz",
            cliente: 7,
            complemento: "Perto Da Casanha",
            endereco: "Rua Da Malicia Lote 10",
            id: 15, numero: "190",
            uf: "MA"
        }, {
            bairro: "Nova Imperatriz",
            cep: "22222222",
            cidade: "Imperatriz",
            cliente: 7,
            complemento: "Perto Da Casanha",
            endereco: "Rua Da Malicia Lote 10",
            id: 15, numero: "190",
            uf: "MA"
        }, {
            bairro: "Nova Imperatriz",
            cep: "11111111",
            cidade: "Imperatriz",
            cliente: 7,
            complemento: "Perto Da Casanha",
            endereco: "Rua Da Malicia Lote 10",
            id: 15, numero: "190",
            uf: "MA"
        }, {
            bairro: "Nova Imperatriz",
            cep: "33333333",
            cidade: "Imperatriz",
            cliente: 7,
            complemento: "Perto Da Casanha",
            endereco: "Rua Da Malicia Lote 10",
            id: 15, numero: "190",
            uf: "MA"
        }]
    }
    
}

 

    atualizar = async () => {
        
    }

    selectEndereco = (i) =>{
        var aux = this.state.enderecos[0]
        this.state.enderecos[0] = this.state.enderecos[i]
        this.state.enderecos[i] = aux
        this.setState({enderecos:this.state.enderecos})
    }



    render() {

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
                            <Icon name='close' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Endereços</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <Text style={{ fontWeight: 'bold', fontSize: fonts.bigger, margin: 10 }}>Endereço principal</Text>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Endereço: </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: fonts.big }}>{this.state.enderecos[0].endereco}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 10, margin: 3 }}>
                        <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>CEP: </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: fonts.big }}>{this.state.enderecos[0].cep}</Text>
                    </View>

                    <Separator><Text>Seus Endereços</Text></Separator>
                    <List>
                        {
                            this.state.enderecos.map((item,i) => {
                                return (
                                <ListItem key={i} onPress={() => this.selectEndereco(i)}>
                                    {console.log(item)}
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Endereço: </Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: fonts.big }}>{item.endereco}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 5, margin: 3 }}>
                                        <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>CEP: </Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: fonts.big }}>{item.cep}</Text>
                                    </View>
                                </ListItem>
                                )
                            })
                        }
                    </List>
                    <Button full light onPress={() => this.props.navigation.navigate('enderecos',{add:true})}><Text>Adicionar Novo Endereço</Text></Button>
                </Content>
            </Container>
        )
    }
}

export default connect(store => ({ store }))(addEnderecos)
