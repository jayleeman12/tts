import AsyncStorage from "@react-native-async-storage/async-storage";
import { sha256 } from "js-sha256";
import { unzip } from "react-native-zip-archive";
import RNFetchBlob from "rn-fetch-blob";
import { EPUB_FILE_CACHE } from "./storageKeys";

export type CachedEpub = {
    hash: string;
    directoryPath: string;
}

export class Epub {
    private readonly epubFileName: string;
    constructor(private readonly epubFilePath: string) { 
        this.epubFileName = epubFilePath.substr(epubFilePath.lastIndexOf('/') + 1);
    }

    public async load() {
        const cachedEpubPath = this.getCachedEpub();
        if (cachedEpubPath) {
            return cachedEpubPath;
        }
        const readyPath = `${RNFetchBlob.fs.dirs.CacheDir}/ready/${this.epubFileName}`;
        const partsFilePaths: string[] = [];
        const cachePath = `${RNFetchBlob.fs.dirs.CacheDir}/${this.epubFileName}`;
        if (!(await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.CacheDir)).includes('ready')) {
            await RNFetchBlob.fs.mkdir(readyPath);
        }
        await unzip(this.epubFilePath, cachePath);
        const OEBPSPath = `${cachePath}/OEBPS/`
        const files = await RNFetchBlob.fs.ls(OEBPSPath);
        files.forEach(fileName => {
            if (fileName.match('part[0-9]+\.html')) {
                const readyFilePath = `${readyPath}/${fileName}`;
                RNFetchBlob.fs.mv(`${OEBPSPath}/${fileName}`, readyFilePath);
                partsFilePaths.push(readyFilePath);
            }
        });
        await RNFetchBlob.fs.unlink(cachePath);
        await RNFetchBlob.fs.unlink(`${readyPath}/part0000.html`);
        const cachedEpub: CachedEpub = {
            hash: await RNFetchBlob.fs.readFile(this.epubFilePath, 'utf8'),
            directoryPath: readyPath
        }
        this.cacheEpub(cachedEpub); // no need to await here, make this async
        partsFilePaths.forEach(part => {
        });
        return (await RNFetchBlob.fs.ls(readyPath)).map(name => `${readyPath}/${name}`);
    }
    
    private async getCachedEpub() {
        // TODO: Cache needs to contain the parsed epub (with pages & everything)
        const cachedEpubsStorageItem = await AsyncStorage.getItem(EPUB_FILE_CACHE);
        if (!cachedEpubsStorageItem) {
            return false;
        }
        const cachedEpubs: CachedEpub[] = JSON.parse(cachedEpubsStorageItem);
        if (cachedEpubs.length === 0) return false;
        const fileContent = await RNFetchBlob.fs.readFile(this.epubFilePath, "utf8");
        const fileHash = sha256(fileContent);
        return cachedEpubs.find(cachedEpub => cachedEpub.hash === fileHash)?.directoryPath;
    }

    private async cacheEpub(cachedEpub: CachedEpub) {
        const existingCache = await AsyncStorage.getItem(EPUB_FILE_CACHE);
        if (existingCache) {
            const cache: CachedEpub[] = JSON.parse(existingCache);
            await AsyncStorage.setItem(EPUB_FILE_CACHE, JSON.stringify(cache.concat(cachedEpub)));
        } else {
            await AsyncStorage.setItem(EPUB_FILE_CACHE, JSON.stringify([cachedEpub]));
        }
    }
}