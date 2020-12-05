import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { human } from 'react-native-typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../globals';
import { File } from '../../types';
import FileList from './FileList';

const FilesPage: React.FunctionComponent<{}> = props => {
    const [files, setFiles] = useState<File[]>([]);
    useEffect(() => {
        setFiles([
            { name: "Molecular Biology of the cell", id: 1 },
            { name: "Robin hood goes rogue", id: 2 },
            { name: "Banditza and the seven legs", id: 3 }
        ]);
    }, []);
    const removeFile = (file: File) => {
        const newFiles = [...files];
        const fileToRemoveIndex = newFiles.findIndex(searchedFile => searchedFile.id == file.id);
        newFiles.splice(fileToRemoveIndex, 1);
        setFiles(newFiles);
    };
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
            <TouchableOpacity style={{position: 'absolute', right: 30, bottom: 30}}>
                <Icon name='plus-circle' size={60} color={COLORS.primary.dark} />
            </TouchableOpacity>
        </View>
    )
};

export default FilesPage;