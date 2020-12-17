import React, { useState } from 'react'
import { Dimensions, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { RowMap, SwipeListView } from 'react-native-swipe-list-view'
import { human } from 'react-native-typography'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../globals'
import { File } from '../../types'

export type FileListProps = {
    files: File[]
    onFileDeleted: (file: File) => void;
    onFilePressed: (file: File) => void;
}

const FileList: React.FunctionComponent<FileListProps> = props => {
    const handleRowPress = (file: File, rowMap: RowMap<File>) => {
        const isAnyRowOpen = props.files.some(file => rowMap[file.path].isOpen);
        if (!isAnyRowOpen) {
            props.onFilePressed(file)
        }
    }
    return (
        <SwipeListView
            contentContainerStyle={{ paddingLeft: '3%' }}
            data={props.files}
            keyExtractor={file => file.path}
            renderItem={(data, rowMap) => (
                <TouchableNativeFeedback onPress={() => handleRowPress(data.item, rowMap)}>
                    <View style={{
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Icon name='file' size={25} color={COLORS.secondary.light} />
                        <Text style={[human.body, { 'marginLeft': '3%' }]}>{data.item.name}</Text>
                    </View>
                </TouchableNativeFeedback>
            )}
            renderHiddenItem={data => (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => props.onFileDeleted(data.item)}
                        style={{ width: '15%', justifyContent: 'center' }}
                    >
                        <Icon name='trash' size={25} color={'red'} />
                    </TouchableOpacity>
                </View>
            )}
            disableRightSwipe={true}
            closeOnRowBeginSwipe={true}
            closeOnRowPress={true}
            rightOpenValue={- Dimensions.get('window').width * 0.15}
        />
    );
}

export default FileList;