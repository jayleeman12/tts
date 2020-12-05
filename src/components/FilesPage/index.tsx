import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
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
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: COLORS.primary.dark, height: Dimensions.get('window').height / 10, justifyContent: 'center' }}>
                <Text style={[human.title1, { color: 'white', marginLeft: '3%' }]}>Files</Text>
            </View>
            <SwipeListView
                contentContainerStyle={{ flexGrow: 1, marginTop: '8%' }}
                swipeRowStyle={{ height: '12%' }}
                data={files.map((file, index) => { return { ...file, key: index.toString() } })}
                renderItem={(data, rowMap) => (
                    <View style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='file' size={25} color={COLORS.secondary.light} />
                        <Text style={[human.body, { 'marginLeft': '3%' }]}>{data.item.name}</Text>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View >
                        <Text>left</Text>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        </View>
    )
};

export default FilesPage;