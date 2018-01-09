import React from "react";
import AddFishForm from "./AddFishForm";

class Inventory extends React.Component {
  state = {};
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];

    // take a copy of the fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };

    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];

    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Fish Name"
          value={fish.name}
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          id=""
          placeholder="Fish Price"
          value={fish.price}
          onChange={e => this.handleChange(e, key)}
        />
        <select
          name="status"
          onChange={e => this.handleChange(e, key)}
          value={fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea
          placeholder="Fish Description"
          name="desc"
          defaultValue={fish.desc}
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          id=""
          placeholder="Fish Image URL"
          value={fish.image}
          onChange={e => this.handleChange(e, key)}
        />

        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
