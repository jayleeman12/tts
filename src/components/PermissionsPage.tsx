import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { requestFilesReadPermission } from '../permissions';

const PermissionsPage: React.FunctionComponent = props => {
    const [permissionsDenied, setPermissionDenied] = useState<boolean>(false);
    requestFilesReadPermission().then(() => {
        Actions.reset('files')
    }).catch(err => setPermissionDenied(true));
    if (permissionsDenied) {
        // retry?
        return (
            <View>
                <Text>Please allow file read permissions before proceeding :)</Text>
            </View>
        );
    };
    return <View></View> // Ideally, would be the logo
};

export default PermissionsPage;