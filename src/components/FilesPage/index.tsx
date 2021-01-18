import React, { useState } from 'react';
import { Dimensions, Text, TouchableNativeFeedback, View } from 'react-native';
import { human } from 'react-native-typography';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import { COLORS } from '../../globals';
import { File } from '../../types';
import FileList from './FileList';
import { requestFilesReadWritePermissions } from '../../permissions';
import { Actions } from 'react-native-router-flux';
import { FILE_VIEW } from '../../routets';

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
        const permissionsGranted = await requestFilesReadWritePermissions();
        if (permissionsGranted) {
            Actions.push(FILE_VIEW, {filePath: file.path})
        } else {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Permission Denied',
                text2: 'To proceed, allow the "Storage" permission',
                visibilityTime: 5000
            });
        }
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
            <View style={{
                position: 'absolute',
                right: 30,
                bottom: 30,
                elevation: 10,
                shadowOpacity: 0.7,
                shadowColor: 'black',
                shadowRadius: 4,
                shadowOffset: { width: 1, height: 1 },
                backgroundColor: COLORS.primary.dark,
                borderRadius: 400,
                width: Dimensions.get('window').width * 0.18,
                height: Dimensions.get('window').width * 0.18,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableNativeFeedback onPress={addFile}>
                    <Icon name='plus' size={30} color='white' style={{ backgroundColor: 'transparent' }} light />
                </TouchableNativeFeedback>
            </View>
        </View >
    )
};

export default FilesPage;