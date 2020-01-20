import { h } from 'preact';

import full from '../../images/community_chest/cc_full@0.25x.png';

// `size` is used as the height of the text and uses the same values as a
// normal `font-size` property. The width will be 3 times the height.
const CommunityChest = props => {
  const { size, className, ...imgProps } = props;

  const width = size != null ? size * 3 : undefined;
  const height = size != null ? size : undefined;

  return <img {...imgProps} src={full} width={width} height={height} />;
};

export default CommunityChest;
