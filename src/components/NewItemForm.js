import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AddItemAction } from '../actions/itemListActions'


class NewItemForm extends Component {

  constructor() {
    super()

    this.state = {
      inputVal: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.addNewItem(this.state.inputVal)
    this.setState({ inputVal: "" })
  }

  handleInputChange (e) {
    this.setState({ inputVal: e.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='number' onChange={this.handleInputChange} value={this.state.inputVal}/>
        <input type='submit' value='add'/>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    addNewItem: name => dispatch(AddItemAction(name))
})

export default connect(null, mapDispatchToProps)(NewItemForm)
