import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { human } from 'react-native-typography';
import { COLORS } from '../../globals';
import { File } from '../../types';

const FilesPage: React.FunctionComponent<{}> = props => {
    const [files, setFiles] = useState<File[]>([]);
    useEffect(() => {
        setFiles([
            { name: "Molecular Biology of the cell" },
            { name: "Robin hood goes rogue" },
            { name: "Banditza and the seven legs" }
        ]);
    }, []);
    return (
        <View style={{ display: 'flex', height: '100%' }}>
            <View style={{ backgroundColor: COLORS.primary.dark, height: '10%', justifyContent: 'center' }}>
                <Text style={[human.title1, { color: 'white', marginLeft: '3%' }]}>Files</Text>
            </View>
            <View style={{ height: '100%' }}>
                {files.map((file: File, index: number) => (
                    <View key={index} style={{
                        marginLeft: '4%',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '12%'
                    }}>
                        <Icon name='file' size={25} color={COLORS.secondary.light} />
                        <Text style={[human.body, { 'marginLeft': '3%' }]}>{file.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
};

export default FilesPage;