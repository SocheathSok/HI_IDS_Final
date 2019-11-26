import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Product from './screens/Product';
import Team from './screens/Team';
import Alert from './screens/Alert'
import Home from './screens/Home';
import History from './screens/History';
import Main from './Main';

const MainNavigator = createStackNavigator(
    {   Main: {screen: Main, navigationOptions:{header:null}},
        Home: {screen: Home}
    },
    {
        initialRouteName: "Home"
    });

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;