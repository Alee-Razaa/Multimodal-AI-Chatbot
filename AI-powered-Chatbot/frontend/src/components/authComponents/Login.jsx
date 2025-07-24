import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Login() {

  const navigate = useNavigate()

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  const incorrectPass = "Password must be at least 8 characters, and include uppercase, lowercase, number, and special character"
  let [invalidCredentials,setInvalidCredentials] = useState(false)
  let [anv,setAnv]=useState(false)


  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },

    validationSchema : Yup.object({
      email:Yup.string().email().required("Required"),
      password: Yup.string().min(8).matches(passwordRegex,incorrectPass).required("Password is required")
    }),

    onSubmit:async(data)=>{
      const result = await fetch('http://localhost:5000/api/auth/login',{
        method:'post',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(data)
      })
      console.log('data : ',data)
      const dat = await result.json()
      
      console.log("dat : " , dat)
      if(dat.message === 'Invalid credentials'){
        setInvalidCredentials(true)
        console.log(invalidCredentials)
      }else if(dat.message === 'Account is not verified'){
        console.log("Account is not verified")
        setAnv(true)
      }else{    
        localStorage.setItem("user",JSON.stringify({
          userId:dat._id,name:dat.name,email:dat.email,token:dat.token
        }))
        window.dispatchEvent(new Event("authChanged")); // // used for navbar hiding on login and signup pages
        navigate('/')
      }
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <div className="bg-gradient-to-b from-purple-400 via-pink-500 to-my_color p-8 rounded-tl-3xl rounded-br-3xl shadow-lg w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 ">Get Started 🚀</h1>
        <p className="text-center text-gray-500 mb-8 ">Continue the AI conversation revolution!</p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              name='email'
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e);
                setInvalidCredentials(false); // clear invalid credentials error
                setAnv(false); // clear account not verified error
              }}
              onBlur={formik.handleBlur}
             
            />
          </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-[-30px]">{formik.errors.email}</div>
            )}

            {invalidCredentials && (
              <div className="text-red-500 mt-[-30px]">User doesn't exist</div>
            )}
            {anv && (
              <div className="text-red-500 mt-[-30px]">Account is not verified <button className='bg-blue-500 border rounded-lg p-2 text-white'>Resend Verification Email</button> </div>
            )}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            
            />
          </div>
          {formik.touched.password && formik.errors.password && (<div className='text-red-500 mt-[-30px]'>Invalid Password</div>)}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-xl transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer" onClick={()=>{navigate('/signup')}}>Signup</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
