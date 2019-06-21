import _ from 'lodash';

function classNames() {
  _.reduce(arguments, (acc, arg) => {
    return arg ? acc + arg : acc;
  }, '');
}

const Button = (props) => {
  const {
    isFullwidth,
    isOutlined,
    children,
    className
  } = this.props;

  return (
    <button
      class={classNames(className, isFullwidth)}
  );
};

export default Button;
