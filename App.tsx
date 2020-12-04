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
import { Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import FilesPage from './src/components/FilesPage';
import FileView from './src/components/FileView';


const App = () => {
  return (
    <Router>
      <Stack key='root'>
        <Scene key='files' component={FilesPage} navTransparent={true} />
        <Scene key='file-view' component={FileView} navTransparent={true} />
      </Stack>
    </Router>
  );
};

export default App;
