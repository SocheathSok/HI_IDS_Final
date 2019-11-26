import React from 'react'
import {Text, Container,Button} from 'native-base'
import {ImageBackground, Image} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <Container>
                <Grid >
                    <Row style={{padding: 90,justifyContent:'space-around', alignItems:'baseline'}}>
                        <Col style={{width: 290, height:280}}>
                            <ImageBackground style = {{flex:1 }} source= {require('../img/Logo.jpg')}>

                            </ImageBackground>
                         </Col>
                    </Row>
                </Grid>
                <Button danger rounded style= {{margin: 100}} onPress={() => { navigate("Main")}}>
                    <Text style={{marginLeft:50, fontWeight: "bold"}}> Welcome ! </Text>
                </Button>

            </Container>
        )
    }
}