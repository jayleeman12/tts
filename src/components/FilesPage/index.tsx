import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { human } from 'react-native-typography';
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
        setFiles(files => {
            console.log(`hello?? ${file.id}`);
            files.splice(file.id - 1, 1);
            return files;
        });
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
        </View>
    )
};

export default FilesPage;