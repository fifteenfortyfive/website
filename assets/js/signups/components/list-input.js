import { h, render, Component } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleInputChange(ev) {
    ev.stopPropagation();
    const value = ev.target.value;
    this.setState({
      value: value
    });
  }

  handleEnter(ev) {
    ev.stopPropagation();
    const { onEnter } = this.props;
    const { value } = this.state;
    const trimmedValue = value.trim();
    if(trimmedValue != "") {
      onEnter(trimmedValue);
    }
    this.setState({value: ''});
  }

  handleRemove(item) {
    const { onRemove } = this.props;
    onRemove(item);
  }

  handleKeyPress(ev) {
    const {key} = ev;
    if(key === 'Enter') {
      this.handleEnter(ev);
    }
  }

  render() {
    const {
      label,
      items,
      placeholder,
      required,
      renderEmpty
    } = this.props;

    const {
      value
    } = this.state;

    return (
      <div class="list-input">
        <ul>
          { items.length > 0
            ? items.map((item) => (
                <li class="list-input__item">
                  <div class="button" onClick={() => this.handleRemove(item)}>
                    <FontAwesomeIcon className="icon" icon="times" />
                  </div>
                  <span>{item}</span>
                </li>
              ))
            : renderEmpty()
          }
        </ul>
      </div>
    );
  }
}

export default ListInput;
