import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link, withRouter } from 'react-router-dom'

import {
  RemoveItemAction, UndoItemAction, RedoItemAction
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
            <Link to={`/${el.key}`} key={el.key}>{el.text}</Link>
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
    case 'all':
      return list
    case 'odd':
      return list.filter(it => { return (it % 2) !== 0 })
    case 'even':
      return list.filter(it => { return (it % 2) === 0 })
    default:
      return list
  }
}


const mapStateToProps = (state, { match: { params: { filter } } }) => ({
  items: filterListHandler(
    state.listData,
    filter || 'all'
  ),
})

// const mapDispatchToProps = dispatch => ({
//     removeItem: key => dispatch(RemoveItemAction(key)),
//     undoLastAction: () => dispatch(UndoItemAction()),
//     redoLastAction: () => dispatch(RedoItemAction()),
// })

export default withRouter(connect(
  mapStateToProps,
  {
    removeItem: RemoveItemAction,
    undoLastAction: UndoItemAction,
    redoLastAction: RedoItemAction
  }
)(ListItems))
