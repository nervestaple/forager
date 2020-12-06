import React, {
  Dispatch,
  SetStateAction,
  useState,
  RefObject,
  useRef,
} from 'react';
import { Position } from './GameObject';
import Graphic, { GraphicProps } from './Graphic';
import useComponentRegistry, { ComponentRef } from './useComponentRegistry';

export type SpriteRef = ComponentRef<
  'Sprite',
  {
    setColor: Dispatch<SetStateAction<string>>;
    setOpacity: Dispatch<SetStateAction<number>>;
    setState: Dispatch<SetStateAction<string>>;
    setFlipX: Dispatch<SetStateAction<number>>;
    setScale: Dispatch<SetStateAction<number>>;
    setOffset: Dispatch<SetStateAction<Position>>;
    flipX: number;
    nodeRef: RefObject<THREE.Object3D>;
  }
>;

export type SpriteProps = GraphicProps;

export default function Sprite({
  sheet,
  state: initialState = 'default',
  flipX: initialFlipX = 1,
  color: initialColor = '#fff',
  opacity: initialOpacity = 1,
  offset: initialOffset = { x: 0, y: 0 },
  scale: initialScale = 1,
  ...graphicProps
}: SpriteProps): React.ReactElement {
  const [color, setColor] = useState(initialColor);
  const [opacity, setOpacity] = useState(initialOpacity);
  const [flipX, setFlipX] = useState(initialFlipX);
  const [state, setState] = useState(initialState);
  const [offset, setOffset] = useState(initialOffset);
  const [scale, setScale] = useState(initialScale);
  const nodeRef = useRef<THREE.Object3D>(null);

  useComponentRegistry<SpriteRef>('Sprite', {
    setColor,
    setOpacity,
    setState,
    setOffset,
    setScale,
    setFlipX,
    flipX,
    nodeRef,
  });

  return (
    <Graphic
      ref={nodeRef}
      sheet={sheet}
      state={state}
      flipX={flipX}
      color={color}
      opacity={opacity}
      offset={offset}
      scale={scale}
      {...graphicProps}
    />
  );
}
