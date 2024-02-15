import React  from 'react';
import Form from '../../components/Shared/Form/Form';


const Login =()=>{

    return (
      <>
        <div className="row g-0 ">
          <div className="col form-banner">
          <div className="background-image"></div>
            <img src="./assets/images/cms1.jpg" alt="loginImage" />
          </div>
          <div className="col form-container">
          <Form formTitle={'Login Page'} submitBtn={'Login'} formType={'login'}/>
         
          </div>
        </div>
      </>
    );
}

export default Login;