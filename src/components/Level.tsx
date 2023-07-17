import { LevelProps } from '../types';
import { BlockStart } from './blocks/BlockStart';
import { BlockPlatform } from './blocks/BlockPlatform';
import { BlockEnd } from './blocks/BlockEnd';

export const Level:React.FC<LevelProps> = ({
  count = 5,
  types = [],
  seed = 0,
}) => {

  return <>
    <BlockStart position={[0, 0, 0]} />
    <BlockPlatform position={[0, 0, - 6]} />
    <BlockEnd position={[0, 0, - 12]} />
  </>
}