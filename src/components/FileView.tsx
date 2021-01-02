import React from 'react';
import { Text, View } from 'react-native';

export type FileViewProps = {
    fileContent: string
}

const FileView: React.FunctionComponent<FileViewProps> = props => {
    return (
        <View>
            <Text>{props.fileContent}</Text>
        </View>
    )
};

export default FileView;