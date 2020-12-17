import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { human } from 'react-native-typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import { COLORS } from '../../globals';
import { File } from '../../types';
import FileList from './FileList';

const FilesPage: React.FunctionComponent<{}> = props => {
    const [files, setFiles] = useState<File[]>([]);
    const removeFile = (file: File) => {
        setFiles(files.filter(f => f.path !== file.path))
    };
    const addFile = async () => {
        try {
            const selectedFile = await DocumentPicker.pick({
                type: [DocumentPicker.types.plainText]
            });
            const path = (await RNFetchBlob.fs.stat(selectedFile.uri)).path;
            const newFile: File = {
                name: selectedFile.name,
                path: path
            }
            if (files.some(file => file.path === newFile.path)) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'The file already exists!'
                });
            } else {
                setFiles([newFile, ...files]);
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'File added successfully!',
                    visibilityTime: 2000
                })
            }
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                throw err;
            }
        }
    }
    const onFilePressed = async (file: File) => {
        console.log(await RNFetchBlob.fs.readFile(file.path, 'utf8'));
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                backgroundColor: COLORS.primary.dark,
                height: Dimensions.get('window').height / 10,
                justifyContent: 'center'
            }}>
                <Text style={[human.title1, { color: 'white', marginLeft: '3%' }]}>Files</Text>
            </View>
            <FileList files={files} onFileDeleted={removeFile} onFilePressed={onFilePressed} />
            <TouchableOpacity onPress={addFile} style={{ position: 'absolute', right: 30, bottom: 30 }}>
                <Icon name='plus-circle' size={60} color={COLORS.primary.dark} />
            </TouchableOpacity>
        </View>
    )
};

export default FilesPage;