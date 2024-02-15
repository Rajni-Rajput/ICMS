export const handleLogin =(e, role, email, password) =>{
    e.preventDefault()
    try{
        if(!role || !email || !password){
            return alert('Please provied all fields!')
        }
        console.log('login',e, role, email, password)
    }catch(error){
        console.log(error)
    }
}

export const handleRegister=(e,role, name,email, phone,address,password) =>{
        e.preventDefault()
        try{
            if(!role || !name ||!email || !password || !phone || !address){
                return alert('Please provied all fields!')
            }
            console.log('login',e, role, name,email, phone,address,password)
        }catch(error){
            console.log(error)
        }
    }