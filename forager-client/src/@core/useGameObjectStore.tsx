import React, { useCallback, useContext, useRef } from 'react';
import { SceneExitEvent, SceneInitEvent } from './Scene';
import useGame from './useGame';
import useGameEvent from './useGameEvent';
import useGameObject from './useGameObject';
import useSceneManager from './useSceneManager';
import { PubSubEvent } from './utils/createPubSub';
import waitForMs from './utils/waitForMs';

export type PreSaveGameEvent = PubSubEvent<'pre-save-game', void>;
export type SaveGameEvent = PubSubEvent<'save-game', void>;

export interface StoreContextValue {
  getState: (key: string) => any;
  setState: (key: string, data: any) => void;
}

export const StoreContext = React.createContext<StoreContextValue | null>(null);

export default function useGameObjectStore<T = any>(
  key: string,
  write: () => T,
  read: ((storedData: T) => void) | null = null,
): T | null {
  const { name, forceUpdate } = useGameObject();
  const { getState, setState } = useContext(StoreContext) || {};

  const writeCallback = useRef<(() => void) | null>(null);
  const readCallback = useRef<((storedData: T) => void) | null>(null);

  React.useEffect(() => {
    writeCallback.current = write;
    readCallback.current = read;
  }, [write, read]);

  useGameEvent<SceneInitEvent>(
    'scene-init',
    () => {
      if (!readCallback.current) {
        return;
      }
      if (!name) {
        // eslint-disable-next-line no-console
        console.error('Attempting to use GameObject store without a name.');
        return;
      }

      if (!getState) {
        return;
      }

      const stored = getState(`${name}.${key}`);
      if (stored != null) {
        readCallback.current(stored);
        waitForMs(0).then(forceUpdate);
      }
    },
    [key, name],
  );

  const save = useCallback(async () => {
    if (!name || !writeCallback.current || !setState) {
      return;
    }
    setState(`${name}.${key}`, writeCallback.current());
  }, [key, name, setState]);

  useGameEvent<SceneExitEvent>('scene-exit', save, [save]);
  useGameEvent<SaveGameEvent>('save-game', save, [save]);

  if (!getState) {
    return null;
  }

  return getState(`${name}.${key}`);
}

export function useGameObjectStoreValue<T = any>(key: string): T | null {
  const { name } = useGameObject();
  const { getState } = useContext(StoreContext) || {};

  if (!name || !getState) {
    // eslint-disable-next-line no-console
    console.error('Attempting to use GameObject store without a name.');
    return null;
  }

  const stored = getState(`${name}.${key}`);
  return stored;
}

interface ProviderProps {
  children: React.ReactNode;
}

export function GameStoreProvider({
  children,
}: ProviderProps): React.ReactElement {
  const { getGameState, setGameState } = useGame();

  const contextValue: StoreContextValue = {
    getState: getGameState,
    setState: setGameState,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export function SceneStoreProvider({
  children,
}: ProviderProps): React.ReactElement {
  const { getSceneState, setSceneState } = useSceneManager();

  const contextValue: StoreContextValue = {
    getState: getSceneState,
    setState: setSceneState,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}
