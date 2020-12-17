import { PermissionsAndroid } from "react-native"

export const requestFilesReadPermission = async (): Promise<boolean> => {
    try {
        const granted = await PermissionsAndroid.request(
            'android.permission.READ_EXTERNAL_STORAGE',
            {
                title: 'Dis be a title',
                message: 'TTS needs to access your files so it can read them',
                buttonPositive: 'OK'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}