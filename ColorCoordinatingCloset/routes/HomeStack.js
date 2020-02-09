import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../home';
import CameraView from '../CameraView';

// Controller for which view is shown. Home is the default

const screens = {
  Home: {
    screen: Home,
  },
  CameraView: {
    screen: CameraView,
  },
  /*  New views go here */
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
