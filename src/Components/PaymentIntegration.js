import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import ArweaveSmartContract from ''; 

const PaymentIntegration = ({ transactionId }) => {
  const { account } = useMoralis();
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async () => {
    const arweaveSmartContract = new ArweaveSmartContract(); 

    try {
      await arweaveSmartContract.makePayment(account, transactionId);
      setIsPaid(true);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div>
      {!isPaid ? (
        <button onClick={handlePayment}>Pay and Access</button>
      ) : (
        <p>You have access to the content.</p>
      )}
    </div>
  );
};

export default PaymentIntegration;
