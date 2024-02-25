import React, { useState } from 'react';
import axios from 'axios';
import InputType from './InputType';
import { useNavigate } from 'react-router-dom';

const PolicyForm = ({ submitBtn, formTitle , setShowPolicyForm}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [policyType, setPolicyType] = useState('');
    const [coverage, setCoverage] = useState('');
    const [premium, setPremium] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const policyData = {
                email,
                policyType,
                coverage,
                premium
            };
            
            await axios.post('http://localhost:3033/api/v1/view/selectPolicy', policyData);
            // Handle success response here (e.g., show success message, update UI)
            alert('Policy added successfully!');
            setShowPolicyForm(false)
            navigate('/adminHomepage');
        } catch (error) {
            console.error('Error adding policy:', error);
            // Handle error response here (e.g., show error message)
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
                labelText={'PolicyType'}
                inputType={'text'}
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
            />
            <InputType
                labelText={'Coverage'}
                inputType={'text'}
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
            />
            <InputType
                labelText={'Premium'}
                inputType={'text'}
                value={premium}
                onChange={(e) => setPremium(e.target.value)}
            />
            <div className="d-flex flex-row flex-column justify-content-between">
                <button type="submit" className="btn btn-primary">
                    {submitBtn}
                </button>
            </div>
        </form>
    );
};

export default PolicyForm;
