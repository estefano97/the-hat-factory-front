import React from "react";
import ReactDOM from "react-dom";
import helpHttp from "../helpers/helpHttp.js";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PaypalPay (props) {

  let productsBuy = [];

  let total = props.subTotal;

  let dataUser = JSON.parse(window.localStorage.getItem("loggedTHF")) || "";
  

  props.cartLS.forEach(el => productsBuy.push({
    productName: el.productName,
    productTalla: el.talla
  }));

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
        create_time: detalles.create_time,
        user_mail: dataUser.response.email,
        productsBuy: productsBuy,
        id_compra: detalles.id,
        user_name: dataUser.response.nombreCompleto,
        user_phone: dataUser.response.telefono,
        valueBuy: detalles.purchase_units[0].amount.value
      };

      helpHttp().post("https://kaal1.000webhostapp.com/API/buyAproved", {
        body: dataBuyApprove,
        Headers: {
            "Content-Type":"application/json",
            "Accept": "application/json",
        }
      })
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