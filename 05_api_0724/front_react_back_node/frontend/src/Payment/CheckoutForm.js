import { useNavigate,useParams,useLocation } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import Box from '@mui/material/Box';
import {useState,useEffect,useLayoutEffect} from "react";
import { display } from '@mui/system';
import { FiEdit } from "react-icons/fi";
import axios from "axios";
// 【ストライプ」ライブラリをインポート
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { TextField, Button } from "@mui/material";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [ammount, setAmmount] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          '/api/stripe/charge',
          {
            amount: ammount,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  const inputAmmount =(e)=>{
    const getAmount = e.target.value;
    setAmmount(getAmount);
    console.log(ammount);
  }

  const CARD_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000000",
        fontWeight: 500,
        fontSize: "16px",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  }

  return (
      <form onSubmit={handleSubmit} class="contact-douki">
        <TextField type="text" onChange={inputAmmount} ></TextField>
        <CardElement options={CARD_OPTIONS}/>
        <button >お会計</button>
      </form>
  );
}
export default CheckoutForm