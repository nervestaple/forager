import React, { useEffect, useRef } from 'react';
import { HTML, HtmlProps } from 'drei';
import useGame from './useGame';

export default function HtmlOverlay({
  children,
  ...props
}: HtmlProps): React.ReactElement | null {
  const { paused } = useGame();
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.current?.parentElement) {
      node.current.parentElement.style.pointerEvents = 'none';
      node.current.parentElement.style.whiteSpace = 'nowrap';
    }
  });

  if (paused) return null;

  return (
    <HTML ref={node} zIndexRange={[0, 0]} eps={0.1} {...props}>
      {children}
    </HTML>
  );
}
