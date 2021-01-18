import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { parseEpub } from '../epub';

export type FileViewProps = {
    fileName: string;
    filePath: string;
}

const FileView: React.FunctionComponent<FileViewProps> = props => {
    const [isEpubParsed, setEpubParsed] = useState<boolean>(false);
    const [fileContent, setFileContent] = useState<string>('');
    useEffect(() => {
        parseEpub(props.filePath, props.fileName).then(() => {
            setEpubParsed(true)
        }).catch(err => console.log(err));
    }, []);
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{fileContent}</Text>
            </ScrollView>
        </SafeAreaView>
    )
};

export default FileView;