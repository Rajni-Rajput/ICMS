import React, { useState } from 'react';
import axios from 'axios';
import InputType from './InputType';


const ClaimForm = ({ submitBtn, formTitle , setShowClaimForm}) => {
  
    const [email, setEmail] = useState('');
    const [InsuranceId,setInsuranceId] = useState('');
    //const [status, setStatus] = useState('');
    const [amount, setAmount] = useState('');
    //const [residual_amount, setResidual] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            const claimData = {
                email,
                InsuranceId,
                //status,
                amount,
                //residual_amount,
                reason
            };
            response = await axios.post('http://localhost:3033/api/v1/view/addClaim', claimData);
            console.log(response)
            alert('Claim added successfully!');
            setShowClaimForm(false)
            //navigate('/adminHomepage');
        } catch (error) {
            alert('Error adding claim:', error);
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-center">{formTitle}</h1>
            <hr />
            <InputType
                labelText={'UserEmail'}
                inputType={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
                labelText={'Insurance ID'}
                inputType={'text'}
                value={InsuranceId}
                onChange={(e) => setInsuranceId(e.target.value)}
            />
            {/* <InputType
                labelText={'Status'}
                inputType={'text'}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            /> */}
            <InputType
                labelText={'Amount'}
                inputType={'text'}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            {/* <InputType
                labelText={'Residual Amount'}
                inputType={'text'}
                value={residual_amount}
                onChange={(e) => setResidual(e.target.value)}
            /> */}
            <InputType
                labelText={'Reason'}
                inputType={'text'}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />
            <div className="d-flex flex-row flex-column justify-content-between">
                <button type="submit" className="btn btn-primary">
                    {submitBtn}
                </button>
            </div>
        </form>
    );
};

export default ClaimForm;
