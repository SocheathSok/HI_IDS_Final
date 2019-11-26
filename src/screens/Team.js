import React from 'react'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Text, Container, Thumbnail, View } from 'native-base';

export default class Team extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <View style = {{flexDirection: 'column', flex: 1}}>
                    <View style = {{flex: 2, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 50 }}>
                        <View style = {{backgroundColor: 'ghostwhite', flex: 1, marginRight: 20, marginLeft: 20, justifyContent: 'center', alignItems:'center'}}>
                            <Thumbnail large source={require("../img/Jasmine.jpg")} />  
                            <Text>Jasmine Arrieta </Text>
                            <Text note>Emphasis: Electronics</Text>
                            <Text note>Role: Hardware Design</Text>
                        </View>
                        <View style = {{backgroundColor:'ghostwhite', flex:1, marginRight:20, justifyContent: 'center', alignItems:'center'}}>
                            <Thumbnail large source={require("../img/Rhyan.jpg")} />
                            <Text>Rhyan Gonzalez</Text>
                            <Text note>Emphasis: Electronics</Text>
                            <Text note>Role: Hardware Design</Text>
                        </View>
                    </View>
                </View>
                <View style = {{flexDirection: 'column', flex: 1}}>
                    <View style = {{flex: 2, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50, marginTop:10 }}>
                        <View style = {{backgroundColor: 'ghostwhite', flex: 1, marginRight: 20, marginLeft:20, justifyContent: 'center', alignItems:'center'}}>
                            <Thumbnail large source={require("../img/Socheath.jpg")} />
                            <Text>Socheath Sok</Text>
                            <Text note>Emphasis: Biomedical</Text>
                            <Text note>Role: Software Design</Text>
                        </View>
                        <View style = {{backgroundColor:'ghostwhite', flex:1, marginRight: 20, justifyContent: 'center', alignItems:'center'}}>
                            <Thumbnail large source={require("../img/Calvin.jpg")} />
                            <Text>Calvin Lee</Text>
                            <Text note>Emphasis: Communications</Text>
                            <Text note>Role: Software Design</Text>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}