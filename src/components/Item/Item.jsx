import React from 'react';

class Item extends React.PureComponent {
    render() {
        const {item:{
            name,
            dietaries
        }, showClose, onActionButtonClick} = this.props;
        return (
            <li className="item">
                <h2>{name}</h2>
                <p>
                    {(dietaries.map(el => (
                        <span key={el} className="dietary">{el}</span>
                    )))}
                </p>
                {!showClose && <button onClick={() => onActionButtonClick()} className="add-item">Add</button>}
                {showClose && <button onClick={() => onActionButtonClick()} className="remove-item">x</button>}
            </li>
        );
    }
}

export default Item;
