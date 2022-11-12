import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PaypalPay (props) {

  let productsBuy = [];

  let total = props.subTotal;

  let dataUser = JSON.parse(window.localStorage.getItem("loggedTHF")) || "";
  

  props.cartLS.forEach(el => {
    console.log(el);
    productsBuy.push({
      Price: el.precio,
      ProductId: el.producto_id,
      ProductTalla: el.talla
    })
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture()
    .then(detalles => {
      let dataBuyApprove = {
        IdPaypal: detalles.id,
        IdUsuarioCompra: dataUser.id,
        TotalValue: detalles.purchase_units[0].amount.value,
        ProductoCompra: productsBuy,
      };
      console.log(dataBuyApprove)
      axios.post("https://localhost:44345/api/buys", dataBuyApprove)
      .then(res => {
        window.localStorage.removeItem("CartTHF");
        window.location.href = "/buy-aproved";
      })
    });
  };

  const onCancelOrder = data => {
    alert("pago cancelado");
  }

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onCancel={(data) => onCancelOrder(data)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PaypalPay;