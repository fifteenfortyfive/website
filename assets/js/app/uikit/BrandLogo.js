import { h } from 'preact';

import Icon from './Icon';

// `size` is used as the height of the text and uses the same values as a
// normal `font-size` property. The width will be 3 times the height.
const BrandLogo = props => {
  return <Icon name={Icon.Names.MCSN} look="monotone" {...props} />;
};

export default BrandLogo;
