import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { human } from 'react-native-typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../globals';
import { File } from '../../types';
import FileList from './FileList';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';

const FilesPage: React.FunctionComponent<{}> = props => {
    const [files, setFiles] = useState<File[]>([]);
    useEffect(() => {
        setFiles([
            { name: "Molecular Biology of the cell", path: 'le path' },
            { name: "Robin hood goes rogue", path: 'is never real' },
            { name: "Banditza and the seven legs", path: 'maybe this?' }
        ]);
    }, []);
    const removeFile = (file: File) => {
        const newFiles = [...files];
        const fileToRemoveIndex = newFiles.findIndex(searchedFile => searchedFile.path === file.path);
        newFiles.splice(fileToRemoveIndex, 1);
        setFiles(newFiles);
    };
    const addFile = async () => {
        try {
            const selectedFile = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText]
            });
            const newFile: File = {
                name: selectedFile.name,
                path: selectedFile.uri
            }
            if (files.some(file => file.path === newFile.path)) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'The file already exists!'
                });
            } else {
                setFiles([newFile, ...files ]);
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
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                backgroundColor: COLORS.primary.dark,
                height: Dimensions.get('window').height / 10,
                justifyContent: 'center'
            }}>
                <Text style={[human.title1, { color: 'white', marginLeft: '3%' }]}>Files</Text>
            </View>
            <FileList files={files} onFileDeleted={removeFile} />
            <TouchableOpacity onPress={addFile} style={{ position: 'absolute', right: 30, bottom: 30 }}>
                <Icon name='plus-circle' size={60} color={COLORS.primary.dark} />
            </TouchableOpacity>
        </View>
    )
};

export default FilesPage;