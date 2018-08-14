import React from 'react';
import './App.css';
import countBy from 'lodash.countby';
import partition from 'lodash.partition';
import items from '../src/items';
import Item from "./components/Item/Item";
import ItemPicker from "./components/ItemPicker/ItemPicker";
import MenuPreview from "./components/MenuPreview/MenuPreview";

class App extends React.Component {
    constructor() {
        super();

        const dietaries = [].concat.apply([], items.map(item => item.dietaries)).filter(this.onlyUnique);

        this.state = {availableItems: items, selectedItems: [], dietaries, dietsToDisplay: []};
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    getDietaryCount(newSelectedItems) {
        const dietsToDisplay = [];

        this.state.dietaries.forEach(function (element) {

            const count = countBy(newSelectedItems, el => el.dietaries.includes(element) === true);

            dietsToDisplay[element] = count.true || 0;
        });
        return dietsToDisplay;
    }

    addItemToSelected(id) {
        const {availableItems, selectedItems} = this.state;
        const filteredArray = partition(availableItems, el => el.id === id);
        const newSelectedItems = selectedItems.concat(filteredArray[0]);

        const dietsToDisplay = this.getDietaryCount(newSelectedItems);

        this.setState({
            selectedItems: newSelectedItems,
            availableItems: filteredArray[1],
            dietsToDisplay
        });
    }


    removeItemFromSelected(id) {
        const {availableItems, selectedItems} = this.state;
        const filteredArray = partition(selectedItems, el => el.id === id);
        const newAvailableItems = availableItems.concat(filteredArray[0]);

        const dietsToDisplay = this.getDietaryCount(filteredArray[1]);

        this.setState({
            selectedItems: filteredArray[1],
            availableItems: newAvailableItems,
            dietsToDisplay
        });
    }

    render() {
        const {availableItems, selectedItems, dietsToDisplay} = this.state;
        return (<div className="wrapper">
                <div className="menu-summary">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 menu-summary-left">
                                <span>{`${selectedItems.length} selected, ${availableItems.length} remaining`}</span>
                            </div>
                            <div className="col-6 menu-summary-right">
                                {
                                    Object.keys(dietsToDisplay).map((key) => (
                                        dietsToDisplay[key] > 0 &&
                                        <span key={key}> {dietsToDisplay[key]}x
                                            <span className="dietary">{key}</span></span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container menu-builder">
                    <div className="row">
                        <div className="col-4">
                            <ItemPicker>
                                {(availableItems.map(el => (
                                    <Item key={el.id} showClose={false} onActionButtonClick={() => {
                                        this.addItemToSelected(el.id)
                                    }} item={el}/>
                                )))}
                            </ItemPicker>
                        </div>
                        <div className="col-8">
                            <MenuPreview>
                                {(selectedItems.map(el => (
                                    <Item key={el.id} showClose={true}
                                          onActionButtonClick={() => this.removeItemFromSelected(el.id)} item={el}/>
                                )))}
                            </MenuPreview>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
