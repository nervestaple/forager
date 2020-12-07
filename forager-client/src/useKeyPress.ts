import React from 'react';

type Key = KeyboardEvent['key'];

export function useKeyPress(): Set<Key> {
  const [keys, setKeys] = React.useState(new Set<Key>());

  const downHandler = React.useCallback(({ key }: KeyboardEvent) => {
    setKeys((oldKeys) => new Set([...oldKeys, key]));
  }, []);

  const upHandler = React.useCallback(({ key }: KeyboardEvent) => {
    setKeys((oldKeys) => {
      const newKeys = new Set([...oldKeys]);
      newKeys.delete(key);
      return newKeys;
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keys;
}
