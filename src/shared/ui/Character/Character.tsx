import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';

// import s from './Character.module.scss';
interface ICharacterProps {
    className?: string;
    character?: number;
    animation?: 'Idle';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const CHARACTERS = ['Anne', 'Captain_Barbarossa', 'Henry', 'Mako'];

export const Character = ({
    className,
    character = 0,
    animation = 'Idle',
    children,
    ...props
}: ICharacterProps) => {
    const { scene, animations } = useGLTF(
        `/models/Characters_${CHARACTERS[character]}.gltf`,
    );

    const ref = useRef(null);
    const { actions } = useAnimations(animations, ref);
    console.log('actions :>> ', actions);
    useEffect(() => {
        actions[animation]?.reset().fadeIn(0.5).play();
        return () => actions[animation]?.fadeOut(0.5);
    }, [actions, animation]);

    return (
        <group ref={ref} {...props}>
            <>
                {children}
                <primitive object={scene} />
            </>
        </group>
    );
};
