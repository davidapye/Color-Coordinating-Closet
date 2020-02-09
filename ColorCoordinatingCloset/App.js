import React, {Component} from 'react';

import Navigator from './routes/HomeStack';

// First thing that gets executed.
// Calls Navigator (HomeStack.js) which the controller for which view is being shown.

class main extends Component {
  render() {
    return <Navigator />;
  }
}

export default main;
