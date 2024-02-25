import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import PolicyCard from '../../components/Policy/PolicyCard';
import './adminPage.css'
import { useNavigate } from 'react-router-dom';
import PolicyForm from '../../components/Shared/Form/AddPolicyForm';
import ClaimForm from '../../components/Shared/Form/AddClaimForm';
import ClaimApprovalCard from '../../components/ClaimCard';

const AdminHomepage = () => {
    const [pdata, setpData] = useState(null);
    const [cdata, setcData] = useState(null);
    const [showPolicyForm, setShowPolicyForm] = useState(false); // State to control visibility of policy form
    const [showClaimForm, setShowClaimForm] = useState(false);
    const [showClaimApprovalCard, setShowClaimApprovalCard] = useState(false);
    const [selectedClaimId, setSelectedClaimId] = useState(null);

    const handleAddPolicyClick = () => {
        //console.log("hello")
        setShowPolicyForm((prevShowPolicyForm) => !prevShowPolicyForm); 
        fetchPolicies();
    };
    const handleAddClaimClick = () => {
        setShowClaimForm((prevShowClaimForm) => !prevShowClaimForm);
        fetchClaims(); 
    };
    const handleClaimApprovalClick = (claimId) => {
      setShowClaimApprovalCard((prevShowClaimApprovalForm) => !prevShowClaimApprovalForm);
      setSelectedClaimId(claimId);
      //fetchClaims();
  };
    //const [showTable, setShowTable] = useState(false);
    const navigate =useNavigate();

    const fetchPolicies = async () => {
        try {
            const response = await axios.get('http://localhost:3033/api/v1/view/listp');
            
            setpData(response.data.data);
            setcData(null);
            
        } catch (error) {
            console.error('Error fetching policies:', error);
        }
    };
    const fetchClaims = async () => {
        try {
            const response = await axios.get('http://localhost:3033/api/v1/view/listc');
            
            setcData(response.data.data);
            setpData(null);
            
        } catch (error) {
            console.error('Error fetching policies:', error);
        }
    };
    

    // Log pdata when it changes

    useEffect(() => {
      fetchPolicies();
  }, []);

    function policies() {
        fetchPolicies();
    }
    function claims(){
        fetchClaims();
    }
    async function deletePolicy(policyId) {
        try {
            await axios.post('http://localhost:3033/api/v1/view/deletePolicies',{ _id: policyId });
            alert('Policy deleted successfully');
            fetchPolicies(); // Fetch policies again after deletion
        } catch (error) {
            console.error('Error deleting policy:', error);
        }
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
        {/* <h2 className='forcolor'>...Welcome to admin Page...</h2> */}
        
        {pdata !== null && (
            <>
            {showPolicyForm && (
                <PolicyForm formTitle="Add Policy" submitBtn="Submit"  setShowPolicyForm={setShowPolicyForm}/>
            )}
            <div>
            
            <button className='add-btn' onClick={handleAddPolicyClick} >ADD</button>
          <table>
            <thead>
              <tr>
                <th>Policy Type</th>
                <th>Email</th>
                <th>InsuranceId</th>
                <th>Coverage</th>
                <th>Premium</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pdata) &&
                pdata.map((policy) => (
                  <tr key={policy._id}>
                    <td>{policy.policyType}</td>
                    <td>{policy.email}</td>
                    <td>{policy._id}</td>
                    <td>{policy.coverage}</td>
                    <td>{policy.premium}</td>
                    <td>
                      {/* Edit button implementation */}
                      <button>Edit</button>
                    </td>
                    <td>
                      {/* Delete button implementation */}
                      <button onClick={() => deletePolicy(policy._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
          </>
        )}
        {cdata !== null && (
            <>
            {showClaimForm && (
                <ClaimForm formTitle="Add Claim" submitBtn="Submit"  setShowClaimForm={setShowClaimForm}/>
            )}
            {showClaimApprovalCard && (
                <ClaimApprovalCard formTitle="Claim_Status" submitBtn="Submit" claimId={selectedClaimId} 
                setShowClaimApprovalCard={setShowClaimApprovalCard}/>
            )}

           <div>
            <button className='add-btn' onClick={handleAddClaimClick}>ADD</button>
          <table>
            <thead>
              <tr>
                <th>Insurance_Id</th>
                <th>Email</th>
                <th>Status</th>
                <th>Amount</th>
                {/* <th>Residual Amount</th> */}
                <th>Reason</th>
                <th>Requested Date</th>
                <th>Edit_Status</th>
                <th>Add_Remarks</th>
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
                    <td>
                      {/* Edit button implementation */}
                      <button onClick={() => handleClaimApprovalClick(claim._id)}>A/R</button>
                    </td>
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

export default AdminHomepage;
