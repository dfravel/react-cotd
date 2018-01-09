import React from "react";
import { formatPrice } from "../helpers";
import CssTransitionGroup from "react-addons-css-transition-group";

class Order extends React.Component {
  state = {};
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = (
      <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    );

    if (!fish || fish.status === "unavailable") {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : "fish"} is no longer available.
          {removeButton}
        </li>
      );
    }

    return (
      <li key={key}>
        <span>
          <CssTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CssTransitionGroup>
          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + ((count * fish.price) | 0);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <CssTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}

          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CssTransitionGroup>
      </div>
    );
  }
}

export default Order;
