import { useContext } from 'react';
import { SceneManagerContextValue, SceneManagerContext } from './SceneManager';

export default function useSceneManager(): SceneManagerContextValue {
  return useContext(SceneManagerContext) as SceneManagerContextValue;
}
