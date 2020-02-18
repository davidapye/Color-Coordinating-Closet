import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../home';
import CameraView from '../CameraView';
import InitialAuth from '../InitialAuth';
import Login from '../Login';
import Signup from '../Signup';

// Controller for which view is shown. Home is the default

const screens = {
  InitialAuth: {
    screen: InitialAuth,
    navigationOptions: { header: null }
  },
  Home: {
    screen: Home,
    navigationOptions: { header: null }
  },
  CameraView: {
    screen: CameraView,
  },
  Login: {
    screen: Login,
    navigationOptions: { header: null }
  },
  Signup: {
    screen: Signup,
    navigationOptions: { header: null }
  },
  /*  New views go here */
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
