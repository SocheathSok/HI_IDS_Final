import React from 'react'
import { Container, Icon, Tab, Tabs, ScrollableTab, Header, Text, View, Button, Title, Left, Right, Body } from 'native-base';
import Alert from './screens/Alert';
import History from './screens/History';
import Home from './screens/Home';
import Product from './screens/Product';
import Team from './screens/Team';
import DataManager from './DataManager'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        }

        this.dataManager = DataManager.getInstance()
    }

    openDialog = () => {
        if (!this.state.showDialog) {
            this.setState({ ...this.state, showDialog: true });
        }
    }

    closeDialog = () => {
        if (this.state.showDialog) {
            this.setState({ ...this.state, showDialog: false });
        }
    }
    render() {
        
        return (
            <Container>
                {/* <MainNavigator></MainNavigator>  */}
                <Header hasTabs>
                    <Left style={{ flex: 1 }}></Left>
                    <Body style={{ flex: 1 }}>
                        <Title style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, color:'aqua' }}> HI-IDS </Title>
                    </Body>
                    <Right style={{ flex: 1 }}></Right>
                </Header>

                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="Graph">
                        <History></History>
                    </Tab>
                    <Tab heading="Product" >
                        <Product></Product>
                    </Tab>
                    <Tab heading="Team">
                        <Team></Team>
                    </Tab>
                </Tabs>
                {/* <Button onPress={() => {
                    this.openDialog()
                }}>
                    <Text>Cool Button</Text>
                </Button> */}
                <Alert isShow={this.state.showDialog} close={this.closeDialog}></Alert>
            </Container>
        );
    }
}