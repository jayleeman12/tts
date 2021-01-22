import { unzip } from "react-native-zip-archive";
import RNFetchBlob from "rn-fetch-blob";

export const parseEpub = async (filePath: string, fileName: string) => {
    const cachePath = `${RNFetchBlob.fs.dirs.CacheDir}/${fileName}`;
    const readyPath = `${RNFetchBlob.fs.dirs.CacheDir}/ready/${fileName}`;
    if (!(await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.CacheDir)).includes('ready')) {
        await RNFetchBlob.fs.mkdir(readyPath);
    }
    await unzip(filePath, cachePath);
    const OEBPSPath = `${cachePath}/OEBPS/`
    const files = await RNFetchBlob.fs.ls(OEBPSPath);
    files.forEach(fileName => {
        if (fileName.match('part[0-9]+\.html')) {
            RNFetchBlob.fs.mv(`${OEBPSPath}/${fileName}`, `${readyPath}/${fileName}`);
        }
    });
    await RNFetchBlob.fs.unlink(cachePath);
    await RNFetchBlob.fs.unlink(`${readyPath}/part0000.html`);
    return await RNFetchBlob.fs.ls(readyPath);
};