import React from 'react';

class ItemPicker extends React.PureComponent {
    render() {
        return (
            <ul className="item-picker">
                {this.props.children}
            </ul>
        );
    }
}

export default ItemPicker;
