import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import RNFetchBlob, { RNFetchBlobReadStream } from 'rn-fetch-blob';

export type FileViewProps = {
    filePath: string
}

const FileView: React.FunctionComponent<FileViewProps> = props => {
    const [fileContent, setFileContent] = useState<string>('');
    useEffect(() => {
        RNFetchBlob.fs.readStream(props.filePath, 'utf8').then(fileStream => {
            fileStream.open()
            fileStream.onData((chunk) => {
                setFileContent(content => content + chunk)
            });
            fileStream.onError(err => {
                throw new Error(err);
            });
        })
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