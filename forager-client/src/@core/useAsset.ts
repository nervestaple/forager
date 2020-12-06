import { useContext } from 'react';
import { AssetLoaderContext, AssetType } from './AssetLoader';

type AssetUrlParam = string | { src: string | string[] };

export default function useAsset(urlOrObj: AssetUrlParam): AssetType | null {
  const assets = useContext(AssetLoaderContext);
  try {
    let url = typeof urlOrObj === 'string' ? urlOrObj : urlOrObj.src;
    // eslint-disable-next-line prefer-destructuring
    if (Array.isArray(url)) {
      url = url[0];
    }
    if (!assets || !assets.current) {
      return null;
    }
    return assets.current[url];
  } catch {
    return null;
  }
}
