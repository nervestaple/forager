import { Cone, Cylinder } from 'drei';
import React from 'react';
import { Vector3, ShaderMaterial, Vector2 } from 'three';
import { range } from 'lodash-es';

interface Props {
  position: Vector3;
  levels: number;
  scale: number;
}

const TRUNK_POS = new Vector3(0, 5, 0);
const FOLIAGE_POS = new Vector3(0, 15, 0);
const FOLIAGE_LEVEL = new Vector3(0, 4, 0);

const uniforms = {
  mouse: { value: new Vector2() },
  resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
};

export function Tree({
  position,
  levels,
  scale = 5,
}: Props): React.ReactElement {
  const materialRef = React.useRef<ShaderMaterial>(null);
  const mouseRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scaleVec = new Vector3(scale, scale, scale);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const { x, y } = e;
      mouseRef.current = { x, y };

      if (!materialRef.current) {
        return;
      }
      const { uniforms } = materialRef.current;
      uniforms.mouse.value.x = mouseRef.current.x;
      uniforms.mouse.value.y = mouseRef.current.y;
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  React.useEffect(() => {
    function handleResize() {
      uniforms.resolution.value.x = window.innerWidth;
      uniforms.resolution.value.y = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <>
      <Cylinder
        args={[1, 1, 10]}
        position={position.clone().add(TRUNK_POS).multiplyScalar(scale)}
        scale={scaleVec}
      >
        <shaderMaterial
          ref={materialRef}
          args={[
            {
              uniforms: { ...uniforms, color: { value: new Vector3(0, 1, 0) } },
              fragmentShader: fragmentShader(),
            },
          ]}
          transparent={true}
        />
      </Cylinder>
      {range(levels).map((n) => (
        <Cone
          scale={scaleVec}
          key={n}
          args={[5, 10]}
          position={position
            .clone()
            .add(FOLIAGE_POS)
            .addScaledVector(FOLIAGE_LEVEL, n + 1)
            .multiplyScalar(scale)}
        >
          <shaderMaterial
            ref={materialRef}
            args={[
              {
                uniforms: {
                  ...uniforms,
                  color: { value: new Vector3(1, 0, 1) },
                },
                fragmentShader: fragmentShader(),
              },
            ]}
            transparent={true}
          />
        </Cone>
      ))}
    </>
  );
}

function fragmentShader(): string {
  return `
  uniform vec2 resolution;
  uniform vec2 mousePos;
  uniform vec2 playerPos;
  uniform vec3 color;

  void main(){
    vec2 flippedMouse = vec2(mousePos.x, resolution.y - mousePos.y);
    vec2 diff = flippedMouse - gl_FragCoord.xy;
    float ratio = resolution.x / resolution.y;
    diff.x *= ratio;
    float d = length(diff / resolution.xy);

    float alpha = 
    gl_FragColor = vec4(color, pow(d * 2., 2.) * 10.);
  }
`;
}
