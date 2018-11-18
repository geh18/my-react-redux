import React, { Component } from 'react'
import { connect } from "react-redux";

import { RemoveItemAction, UndoItemAction, RedoItemAction } from '../actions/itemListActions'


const FilterButtons = ({ clickHandler }) => {


}

class ListItems extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filterKey: 'all',
      listItems: this.props.items
    }

    this.removeItem = this.removeItem.bind(this)
    this.filterListHandler = this.filterListHandler.bind(this)
    this.undoHandler = this.undoHandler.bind(this)
    this.redoHandler = this.redoHandler.bind(this)
  }

  removeItem(key, event) {
    this.props.removeItem(key)
  }

  undoHandler(e) {
    this.props.undoLastAction()
  }

  redoHandler(e) {
    this.props.redoLastAction()
  }

  filterListHandler = query => e => {
    switch (query) {
      case 'all':
        this.setState({
          listItems: this.props.items
        })
        break;
      case 'odd':
        this.setState({
          listItems: this.props.items.filter(it => { return (it % 2) !== 0 })
        })
        break;
      case 'even':
        this.setState({
          listItems: this.props.items.filter(it => { return (it % 2) === 0 })
        })
        break;
    }
  }

  undoRedoItems = () => (
    <div>
      <button onClick={this.undoHandler}>Undo</button>
      <button onClick={this.redoHandler}>Redo</button>
    </div>
  )

  listItems = () => (
    <ul>
    {
      this.state.listItems.map( (it, i) => (
        <li key={i}>
        {it}
        <button onClick={this.removeItem.bind(this, i)}>X</button>
        </li>
      ))
    }
    </ul>
  )

  filterButton = () => {
    const domData = {
      elements: [
        {key: 'all', text: 'All'},
        {key: 'odd', text: 'Odd numbers'},
        {key: 'even', text: 'Whole numbers'}
      ]
    }

    return (
      <div className='filter-items'>
        {
          domData.elements.map(el => (
            <button key={el.key} onClick={this.filterListHandler(el.key)}>{el.text}</button>
          ))
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.undoRedoItems() }
        { this.listItems() }
        { this.filterButton() }
      </div>
    );
  }
}

const mapStateToProps = state => ({
    items: state.listData
})

const mapDispatchToProps = dispatch => ({
    removeItem: key => dispatch(RemoveItemAction(key)),
    undoLastAction: () => dispatch(UndoItemAction()),
    redoLastAction: () => dispatch(RedoItemAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItems)
