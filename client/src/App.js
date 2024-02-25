import {Routes,Route} from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminHomepage from './pages/Homepage/AdminHomepage';
import UserHomepage from './pages/Homepage/UserHomepage';
import PolicyForm from './components/Shared/Form/AddPolicyForm';
//import adminPolicies from './pages/Homepage/adminPolicies';
import ClaimForm from './components/Shared/Form/AddClaimForm';


function App() {
  return (
    < >
      <Routes>
        <Route path='/' element={<Login/>} />  
        <Route path='/register' element={<Register/>} />  
        <Route path='/adminHomepage' element={<AdminHomepage/>} />
        <Route path='/userHomepage' element={<UserHomepage/>} />
        <Route path='/admin/addPolicy' element={<PolicyForm/>} />
        <Route path='/admin/claimPolicy' element={<ClaimForm/>} />
      </Routes>
    </>
  );
}

export default App;
