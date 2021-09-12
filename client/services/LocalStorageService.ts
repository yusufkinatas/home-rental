import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = 'TOKEN';

type LocalStorageKeys = typeof TOKEN;

export class LocalStorageService {
  public static SaveObj<T>(
    key: LocalStorageKeys,
    value: { [key: string]: T } | T
  ) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  public static LoadObj = async <T>(
    key: LocalStorageKeys
  ): Promise<{ [key: string]: T } | T | null> => {
    const obj = await AsyncStorage.getItem(key);
    return obj && JSON.parse(obj);
  };

  public static DeleteObj = (
    key: LocalStorageKeys | LocalStorageKeys[]
  ): void => {
    if (typeof key === 'object') {
      key.forEach((item) => AsyncStorage.removeItem(item));
      return;
    }
    AsyncStorage.removeItem(key);
  };
}
