import React from 'react';
import Main from './src/Main';
import MainNavigator from './src/MainNavigator';
import { Container } from 'native-base';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    this.setState({ isReady: true });

  }

  render() {
    return (
      <Container>
       <MainNavigator>
        <Main></Main>
        </MainNavigator> 
        

      </Container>
    )
  }
}


