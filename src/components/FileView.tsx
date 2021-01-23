import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Epub } from '../epub';

export type FileViewProps = {
    filePath: string;
}

const FileView: React.FunctionComponent<FileViewProps> = props => {
    const [fileContent, setFileContent] = useState<string>('');
    const epub = useRef(new Epub(props.filePath))
    useEffect(() => {
        epub.current.load().then(() => {
            console.log('Loaded epub :)');
        })
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