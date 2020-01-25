import { h } from 'preact';
import { IconNames } from './IconNames';

// type IconProps = {
//   name: typeof IconTypes[keyof typeof IconTypes];
//   color?: string;
//   className?: string;
// };

const Icon = props => {
  const { name: Component, ...iconProps } = props;

  return <Component {...iconProps} />;
};

Icon.Names = IconNames;

export default Icon;
