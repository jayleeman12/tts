import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { parseEpub } from '../epub';

export type FileViewProps = {
    fileName: string;
    filePath: string;
}

const FileView: React.FunctionComponent<FileViewProps> = props => {
    const [fileContent, setFileContent] = useState<string>('');
    useEffect(() => {
        parseEpub(props.filePath, props.fileName).then((partsDirectoryPath) => {

        }).catch(err => console.log(err));
    }, []);

    if (!fileContent) {
        return <ActivityIndicator size='large' />
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{fileContent}</Text>
            </ScrollView>
        </SafeAreaView>
    )
};

export default FileView;