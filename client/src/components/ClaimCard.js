import React, { useState } from 'react';
import axios from 'axios';
import InputType from './Shared/Form/InputType';

const ClaimApprovalCard = ({ submitBtn, formTitle, claimId, setShowClaimApprovalCard}) => {
    const [approval, setApproval] = useState(''); // State to track the selected approval option
    const [remarks, setRemarks] = useState('');

    const handleApprovalChange = (e) => {
        setApproval(e.target.value);
    };
    const handleRemarksChange = (e) => {
        setRemarks(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            if (approval === 'approve' || approval === 'reject') {
                // Create an object with the necessary fields including remarks
                const requestData = {
                    _id: claimId,
                    status: approval,
                    remarks: remarks // Include remarks in the request
                };
                if (approval === 'approve') {
                    await axios.post('http://localhost:3033/api/v1/view/approveClaim', requestData);
                    alert('Claim approved successfully!');
                } else {
                    await axios.post('http://localhost:3033/api/v1/view/rejectClaim', requestData);
                    alert('Claim rejected successfully!');
                }
                setShowClaimApprovalCard(false); // Hide the form after successful submission
            } else {
                // Handle case where no option is selected
                alert('Please select an option.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error response here
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-center">{formTitle}</h1>
            <hr />
            <div>
                <input
                    type="radio"
                    id="approve"
                    name="approval"
                    value="approve"
                    checked={approval === 'approve'}
                    onChange={handleApprovalChange}
                />
                <label htmlFor="approve">Approve</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="reject"
                    name="approval"
                    value="reject"
                    checked={approval === 'reject'}
                    onChange={handleApprovalChange}
                />
                <label htmlFor="reject">Reject</label>
            </div>
            <InputType
                labelText="Remarks"
                inputType="text"
                value={remarks}
                onChange={handleRemarksChange}
            />
            <div className="d-flex flex-row flex-column justify-content-between">
                <button type="submit" className="btn btn-primary">
                    {submitBtn}
                </button>
            </div>
        </form>
    );
};

export default ClaimApprovalCard;
