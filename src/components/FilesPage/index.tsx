import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { human } from 'react-native-typography';
import { COLORS } from '../../globals';
import { File } from '../../types';

const files: File[] = [
    { name: "Molecular Biology of the cell" },
    { name: "Robin hood goes rogue" },
    { name: "Banditza and the seven legs" }
]

const FilesPage = () => (
    <View style={{ display: 'flex' }}>
        <View style={{ backgroundColor: COLORS.primary.dark, height: '15%', justifyContent: 'center' }}>
            <Text style={[human.title1, { color: 'white', marginLeft: '3%' }]}>Files</Text>
        </View>
        {files.map((file: File, index: number) => (
            <View key={index} style={{
                height: '17%',
                justifyContent: 'center'
            }}>
                <Text style={[human.body, { 'marginLeft': '3%' }]}>{file.name}</Text>
            </View>
        ))}
    </View>
);

export default FilesPage;