import React, { useState } from 'react'
import { Dimensions, ListRenderItemInfo, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
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
    const [isRowClosed, setRowClosed] = useState<boolean>(false);
    return (
        <SwipeListView
            contentContainerStyle={{ flex: 1, marginLeft: '3%' }}
            data={props.files}
            keyExtractor={file => file.path}
            renderItem={data => (
                <TouchableHighlight onPress={() => {
                    if (isRowClosed) {
                        console.log('fuck this');
                    }
                }} style={{
                    height: 60,
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon name='file' size={25} color={COLORS.secondary.light} />
                        <Text style={[human.body, { 'marginLeft': '3%' }]}>{data.item.name}</Text>
                    </View>
                </TouchableHighlight>
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
            onRowDidOpen={() => setRowClosed(false)}
            onRowDidClose={() => setRowClosed(true)}
        />
    );
}

export default FileList;