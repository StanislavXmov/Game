import { LevelProps } from '../types';
import { BlockStart } from './blocks/BlockStart';
import { BlockPlatform } from './blocks/BlockPlatform';
import { BlockEnd } from './blocks/BlockEnd';
import { BlockSpinner } from './blocks/BlockSpinner';
import { BlockSpinnerBridge } from './blocks/BlockSpinnerBridge';
import { BlockCorner } from './blocks/BlockCorner';

export const Level:React.FC<LevelProps> = ({
  count = 5,
  types = [],
  seed = 0,
}) => {

  return <>
    <BlockStart position={[0, 0, 0]} />
    <BlockCorner position={[1, 0, - 6]} />
    {/* <BlockSpinner position={[0, 0, - 6]} /> */}
    <BlockSpinnerBridge position={[0, 0, - 12]} />
    {/* <BlockPlatform position={[0, 0, - 6]} /> */}
    <BlockEnd position={[0, 0, - 18]} />
  </>
}