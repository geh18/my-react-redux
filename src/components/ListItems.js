import React, { Component } from 'react'
import { connect } from "react-redux";

import {
  RemoveItemAction, UndoItemAction, RedoItemAction, SetFilterAction
} from '../actions/itemListActions'


class ListItems extends Component {

  constructor(props) {
    super(props)

    this.removeItem = this.removeItem.bind(this)
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


  undoRedoItems = () => (
    <div>
      <button onClick={this.undoHandler}>Undo</button>
      <button onClick={this.redoHandler}>Redo</button>
    </div>
  )

  listItems = () => (
    <ul>
    {
      this.props.items.map( (it, i) => (
        <li key={i}>
        {it}
        <button onClick={this.removeItem.bind(this, i)}>X</button>
        </li>
      ))
    }
    </ul>
  )

  filterListHandler = key => e => {
    this.props.setFilterAction(key)
  }

  filterButton = () => {
    const domData = {
      elements: [
        {key: 'show_all', text: 'All'},
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

const filterListHandler = (list, filter) => {
  switch (filter) {
    case 'show_all':
      return list
    case 'odd':
      return list.filter(it => { return (it % 2) !== 0 })
    case 'even':
      return list.filter(it => { return (it % 2) === 0 })
    default:
      return list
  }
}


const mapStateToProps = state => ({
  items: filterListHandler(state.listData.items, state.listData.filter)
})

const mapDispatchToProps = dispatch => ({
    removeItem: key => dispatch(RemoveItemAction(key)),
    undoLastAction: () => dispatch(UndoItemAction()),
    redoLastAction: () => dispatch(RedoItemAction()),
    setFilterAction: filter => dispatch(SetFilterAction(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItems)
