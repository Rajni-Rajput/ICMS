import React from 'react';
import Form from '../../components/Shared/Form/Form';

const Register =()=>{
    return(
        <>
            <div className='row g-0'>
                <div className='col form-banner' >
                    <img src='./assets/images/cms2.jpg' alt='registerImage' />

                </div>
                <div className='col form-container'>
                    <Form formTitle={'Register'} submitBtn={'Register'} formType={'register'} />
                </div>

            </div>
        </>
    )
}

export default Register;