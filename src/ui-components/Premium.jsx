import axios from "axios";
import React, { useState , useEffect} from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    //verifyPremiumUser();
    setIsUserPremium(false); // remove this line when you implement the actual premium verification logic
  }, []);


  //   const verifyPremiumUser = async () => {
  //     const res = await axios.get( `${BASE_URL}/premium/verify`, {
  //       withCredentials: true,
  //     });

  //     if (res.data.isPremium) {
  //       setIsUserPremium(true);
  //     }
  //   };

  const handleBuyClick = async (memberShipType) => {
    try {
      const orderid = await axios.post(
        `${BASE_URL}/payment/create`,
        { memberShipType },
        {
          withCredentials: true,
        }
      );

      console.log("Order ID - ", orderid.data);

      // this will open the Razorpay payment gateway - popup - required below code to be uncommented
      // Note: Make sure to include Razorpay script in your index.html file
      // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      // Uncomment the below code to enable Razorpay payment gateway

      //const { amount, notes, currency, orderId } = orderid.data;

      //   const options = {
      //     key: 'YOUR_KEY_ID',
      //     amount,
      //     currency,
      //     name: 'Acme Corp',
      //     description: 'Connect to developers',
      //     order_id: orderId,
      //     prefill: {
      //       name: notes.firstName + ' ' + notes.lastName,
      //       notes: notes.notes,
      //     },
      //     theme: {
      //       color: '#F37254'
      //     },
      //     handler:verifyPremiumUser
      //   };

      //const rzp = new window.Razorpay(options);
      //rzp.open();
    } catch (err) {
      console.error("Error - ", err);
    }
  };

  return isUserPremium ? (
    <div className="flex justify-center font-bold mt-10">You're are already a premium user</div>
  ) : (
    <div className="m-10">
      <div className="flex w-full justify-center">
        <div className="card bg-base-300 rounded-box grid  grow place-items-center p-5">
          <h1 className="text-lg font-bold">Silver Plan</h1>
          <ul>
            <li className="text-sm mt-2 mb-2">
              - Access to Chat with Other Developer(max 10)
            </li>
            <li className="text-sm mt-2 mb-2">
              - 100 Connection Request per day
            </li>
            <li className="text-sm mt-2 mb-2">
              - Limited access to Developer content
            </li>
            <li className="text-sm mt-2 mb-2">- Blue Tick</li>
            <li className="text-sm mt-2 mb-2">- 10% discount on Gold Plan</li>
          </ul>
          <button
            onClick={() => {
              handleBuyClick("Silver");
            }}
            className="btn btn-primary mt-4"
          >
            Buy Silver Plan
          </button>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid  grow place-items-center p-5">
          <h1 className="text-lg font-bold">Gold Plan</h1>
          <ul>
            <li className="text-sm mt-2 mb-2">
              - Access to Chat with Other Developer(max 20)
            </li>
            <li className="text-sm mt-2 mb-2">
              - Infinite Connection Request per day
            </li>
            <li className="text-sm mt-2 mb-2">
              - Full access to Developer content
            </li>
            <li className="text-sm mt-2 mb-2">
              - Blue Tick with Premium membership tag
            </li>
            <li className="text-sm mt-2 mb-2">
              - 1 Month extra Gold Plan validity
            </li>
          </ul>
          <button
            onClick={() => {
              handleBuyClick("Gold");
            }}
            className="btn btn-secondary mt-4"
          >
            Buy Gold Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
