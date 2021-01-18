import React, { useRef } from 'react'
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
    const openRows = useRef<string | null>(null);
    const handleRowPress = (file: File) => {
        if (!openRows.current) {
            props.onFilePressed(file)
        }
    }
    const getFolderPath = (filePath: string) => filePath.substring(0, filePath.lastIndexOf('/'))
    return (
        <SwipeListView
            contentContainerStyle={{ paddingLeft: '3%' }}
            ListEmptyComponent={() => <View><Text>Behold! An empty list placeholder!</Text></View>}
            data={props.files}
            keyExtractor={file => file.path}
            renderItem={data => (
                <TouchableNativeFeedback onPress={() => handleRowPress(data.item)}>
                    <View style={{
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Icon name='file' size={35} color={COLORS.secondary.light} />
                        <View style={{ marginLeft: '3%', width: '80%', flexShrink: 1 }}>
                            <Text style={[human.headline, { textAlign: 'left' }]} numberOfLines={1} ellipsizeMode='middle'>{data.item.name}</Text>
                            <Text style={human.body} numberOfLines={1} ellipsizeMode='middle' >{getFolderPath(data.item.path)}</Text>
                        </View>
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
            onRowOpen={(rowKey: string) => openRows.current = rowKey}
            onRowClose={(rowKey: string) => setTimeout(() => openRows.current === rowKey && (openRows.current = null), 100)}
        />
    );
}

export default FileList;