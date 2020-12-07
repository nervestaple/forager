import React from 'react';

export function useWindowSize(): [number, number] {
  const [size, setSize] = React.useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  React.useEffect(() => {
    function handleResize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return size;
}
