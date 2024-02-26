import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './adminPage.css'
import { useNavigate,useLocation } from 'react-router-dom';

import ClaimForm from '../../components/Shared/Form/AddClaimForm';

const UserHomepage = () => {
    const location = useLocation();
    const {email} = location.state ;
    const [pdata, setpData] = useState(null);
    const [cdata, setcData] = useState(null);
    const [showClaimForm, setShowClaimForm] = useState(false);
    
    const navigate =useNavigate();

    const fetchPolicies = useCallback(async () => {
      try {
        console.log('Fetching policies for email:', email);
        const response = await axios.post('http://localhost:3033/api/v1/view/userPolicyList', { email: email });
        console.log('Response:', response.data);
        setpData(response.data.data);
        setcData(null);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    }, [email]);
    
    
    const fetchClaims = async () => {
        try {
            const response = await axios.post('http://localhost:3033/api/v1/view/userClaimList',{email : email});
            
            setcData(response.data.data);
            setpData(null);
            
        } catch (error) {
            console.error('Error fetching Claims:', error);
        }
    };

    const Requestp = async() =>{
        alert("Request sent to admin to Add policy.");
    }
    const handleAddClaimClick = () => {
        setShowClaimForm((prevShowClaimForm) => !prevShowClaimForm);
        fetchClaims(); 
    };

    useEffect(() => {
        fetchPolicies();
    }, [fetchPolicies]); 

    function policies() {
        fetchPolicies();
    }
    function claims(){
        fetchClaims();
    }
    
    function logout(){
        navigate('/');
    }

    return (
      <div>
        <div className="navbar">
          <div className="content">
            <span className="btn" onClick={policies}>
              Policies
            </span>
            <span className="btn" onClick={claims}>
              Claims
            </span>
          </div>
          <span className="btn" onClick={logout}>
            Logout
          </span>
        </div>
        {/* <h2 className='forcolor'>...Welcome to User Page...</h2> */}
        
        {pdata !== null && (
            <>
      
            <button className='add-btn' onClick={Requestp} >Request To Admin</button>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Policy Type</th>
                <th>Coverage</th>
                <th>Premium</th>
                <th>InsuranceId</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pdata) &&
                pdata.map((policy) => (
                  <tr key={policy._id}>
                    <td>{policy.email}</td>
                    <td>{policy.policyType}</td>
                    <td>{policy.coverage}</td>
                    <td>{policy.premium}</td>
                    <td>{policy._id}</td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
          </>
          
        
        )}
        {cdata !== null && (
            <>
            {showClaimForm && (
                <ClaimForm formTitle="Add Claim" submitBtn="Submit"  setShowClaimForm={setShowClaimForm}/>
            )}
           <div>
            <button className='add-btn' onClick={handleAddClaimClick}>ADD</button>
          <table>
            <thead>
              <tr>
                <th>Claim_Id</th>
                <th>Email</th>
                <th>Status</th>
                <th>Amount</th>
                {/* <th>Residual Amount</th> */}
                <th>Reason</th>
                <th>Requested Date</th>
                <th>Remarks</th>
                
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cdata) &&
                cdata.map((claim) => (
                  <tr key={claim._id}>
                    <td>{claim._id}</td>
                    <td>{claim.email}</td>
                    <td>{claim.status}</td>
                    <td>{claim.amount}</td>
                    {/* <td>{claim.residual_amount}</td> */}
                    <td>{claim.reason}</td>
                    <td>{claim.requestedDate}</td>
                    <td>{claim.remarks}</td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
          </>
        )}
      </div>

    );
};

export default UserHomepage;
