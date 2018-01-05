import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  state = {};

  goToStore(e) {
    e.preventDefault();
    // console.log("You changed the URL");
    // console.log(this.storeInput.value);
    const storeId = this.storeInput.value;

    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        <h2>Please enter a Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => {
            this.storeInput = input;
          }}
        />
        <button type="submit">Visit Store -> </button>
      </form>
    );
  }
}

export default StorePicker;
