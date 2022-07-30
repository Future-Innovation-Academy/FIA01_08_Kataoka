import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
// 【ストライプ」ライブラリをインポート
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';

const Make_payment_form_modal = () => {
    // 公開鍵のセット
    const PUBLIC_KEY = "pk_test_51LQse1F9oekah5YS6O8BK0LHzy4adOateBpaQDf0pS57Mbwc3isVBHHDKb6z5xjeEewlHunO1i7UWbuAPNHFxRco00HLAOSJWc";
    const stripeTestPromise = loadStripe(PUBLIC_KEY);
    
    return (
            <Elements stripe={stripeTestPromise}>
                <CheckoutForm />
            </Elements>
    )
}
export default Make_payment_form_modal