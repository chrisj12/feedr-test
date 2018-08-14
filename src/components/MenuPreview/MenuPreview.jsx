import React from 'react';

class MenuPreview extends React.PureComponent {
    render() {
        return (<div>
                <h2>Menu preview</h2>
                <ul className="menu-preview">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default MenuPreview;
