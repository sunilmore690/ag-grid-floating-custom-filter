import React, { Component, createRef, Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
export default class NumberFloatingFilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentValue: null,
    };

    this.inputRef = createRef();
  }

  onParentModelChanged(parentModel) {
    // When the filter is empty we will receive a null value here
    if (!parentModel) {
      this.inputRef.current.value = '';
      this.setState({ currentValue: null });
    } else {
      this.inputRef.current.value = parentModel.filter + '';
      this.setState({ currentValue: parentModel.filter });
    }
  }

  onInputBoxChanged = (input) => {
    if (input.target.value === '') {
      // Remove the filter
      this.props.parentFilterInstance((instance) => {
        instance.onFloatingFilterChanged(null, null);
      });
      return;
    }

    this.setState({ currentValue: input.target.value });
    this.props.parentFilterInstance((instance) => {
      instance.onFloatingFilterChanged('contains', input.target.value);
    });
  };

  render() {
    const style = {
      color: this.props.color,
      width: '90%',
      height: '20px',
      // marginTop: '10px',
    };

    return (
      <Fragment>
        <span style={{ marginTop: '10px' }}>
          <input
            ref={this.inputRef}
            style={style}
            // placeholder="Please enter text"
            onInput={this.onInputBoxChanged}
          />
          &nbsp;
          <span data-tip="Filter allowd values to enter separated by comma">
            ?
          </span>
        </span>

        <ReactTooltip />
      </Fragment>
    );
  }
}
