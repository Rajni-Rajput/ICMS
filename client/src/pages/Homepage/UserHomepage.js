import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminPage.css'
import { useNavigate } from 'react-router-dom';

const UserHomepage = () => {
    const [pdata, setpData] = useState(null);
    const [cdata, setcData] = useState(null);
    const [showPolicyForm, setShowPolicyForm] = useState(false); // State to control visibility of policy form
    //const [showClaimForm, setShowClaimForm] = useState(false);
    const navigate =useNavigate();

    const fetchPolicies = async () => {
        try {
            const response = await axios.get('http://localhost:3033/api/v1/view/userPolicyList',{_id : userId});
            
            setpData(response.data.data);
            setcData(null);
            
        } catch (error) {
            console.error('Error fetching policies:', error);
        }
    };
    useEffect(() => {
        console.log(pdata);
    }, [pdata]); // Log pdata when it changes
    function policies() {
        fetchPolicies();
    }
    function logout(){
        navigate('/');
    }
    return (
        <div>
            <div className='navbar'>
                <div className='content'>
                    <span>Policies</span>
                    <span>Claims</span>
                    
                </div>
                <span className='btn' onClick={logout}>Logout</span>
            </div>
        <h2 className='forcolor'>...Welcome to User Page...</h2>
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
        </div>
    );
};

export default UserHomepage;
