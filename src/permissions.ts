import { PermissionsAndroid } from "react-native"

export const requestFilesReadWritePermissions = async (): Promise<boolean> => {
    try {
        const permissionResponse = await PermissionsAndroid.requestMultiple(
            [
                'android.permission.READ_EXTERNAL_STORAGE',
                'android.permission.WRITE_EXTERNAL_STORAGE'
            ],
        );
        const read_granted = permissionResponse['android.permission.READ_EXTERNAL_STORAGE'] == PermissionsAndroid.RESULTS.GRANTED;
        const write_granted = permissionResponse['android.permission.WRITE_EXTERNAL_STORAGE'] == PermissionsAndroid.RESULTS.GRANTED;
        if (read_granted && write_granted) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}