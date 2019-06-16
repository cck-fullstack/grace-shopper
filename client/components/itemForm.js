/* eslint-disable complexity */
import React from 'react'

const ItemForm = props => {
  const {
    name,
    price,
    inventory,
    description,
    category,
    warningMessage,
    handleSubmit,
    handleChange
  } = props

  return (
    <form onSubmit={handleSubmit} style={{width: '20em'}}>
      <h1>Add Item</h1>
      <label>
        Item Name:
        {!name &&
          warningMessage && <span className="warning">{warningMessage}</span>}
      </label>
      <input name="name" type="text" onChange={handleChange} value={name} />

      <label>
        Price:
        {!price &&
          warningMessage && <span className="warning">{warningMessage}</span>}
      </label>
      <input
        name="price"
        type="number"
        min="0.00"
        step="0.01"
        onChange={handleChange}
        value={price}
      />

      <label>Inventory:</label>
      <input
        name="inventory"
        type="number"
        min="0"
        step="1"
        onChange={handleChange}
        value={inventory}
      />

      <label>Description:</label>
      <input
        name="description"
        type="text"
        onChange={handleChange}
        value={description}
      />

      <label>Category:</label>
      <input
        name="category"
        type="text"
        onChange={handleChange}
        value={category}
      />

      <button type="submit" disabled={!name || !price}>
        Submit
      </button>
    </form>
  )
}

export default ItemForm
