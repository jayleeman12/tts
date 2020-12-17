/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Toast from 'react-native-toast-message';
import FilesPage from './src/components/FilesPage';
import FileView from './src/components/FileView';
import PermissionsPage from './src/components/PermissionsPage';


const App = () => {
  return (
    <>
      <Router>
        <Stack key='root'>
          <Scene key='permissions-validation' component={PermissionsPage} navTransparent={true} />
          <Scene key='files' component={FilesPage} navTransparent={true} />
          <Scene key='file-view' component={FileView} navTransparent={true} />
        </Stack>
      </Router>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
