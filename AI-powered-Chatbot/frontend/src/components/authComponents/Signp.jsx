import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Signp() {
  const navigate = useNavigate()

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const incorrectPass = "Password must be at least 8 characters, and include uppercase, lowercase, number, and special character"
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },

    validationSchema: Yup.object({
      name: Yup.string().min(4).required('Required'),
      email: Yup.string().email().required("Required"),
      password: Yup.string().min(8).matches(passwordRegex, incorrectPass).required("Password is required")
    }),

    onSubmit: async (data) => {
      const result = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const dat = await result.json()

      console.log("res : ", dat)

      if (dat.message === 'User already exists') {
        setUserAlreadyExists(true);
      } 
      else if(dat.message==='Internal Server Error'){
        alert('Internal Server Error')
      }
      else if(dat.message==='Verification email sent'){
        alert('Verification email sent, click the link to verify')
        navigate('/login')
      }
      else {
        setUserAlreadyExists(false);
        localStorage.setItem("user", JSON.stringify({
          userId:dat._id,name: dat.name, email: dat.email, token: dat.token
        }))
        window.dispatchEvent(new Event("authChanged")); // used for navbar hiding on login and signup pages
        navigate('/')
      }
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <div className="bg-gradient-to-b from-purple-400 via-pink-500 to-my_color p-8 rounded-2xl shadow-lg w-[90%] max-w-md h-[50%] ">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 font-mono">Create Account 🚀</h1>
        <p className="text-center text-gray-500 mb-8 ">Join the AI conversation revolution!</p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.name && formik.errors.name && (<div className='text-red-500 mt-[-30px]'>{formik.errors.name}</div>)}

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
          </div>
          {(formik.touched.email && formik.errors.email) ? (
            <div className='text-red-500 mt-[-30px]'>{formik.errors.email}</div>
          ) : userAlreadyExists ? (
            <div className='text-red-500 mt-[-30px]'>User already exists</div>
          ) : null}
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
          {formik.touched.password && formik.errors.password && (<div className='text-red-500 mt-[-30px]'>{formik.errors.password}</div>)}

          <button
            type="submit"
            className="w-full bg-brand-dark hover:bg-blue-800 text-white font-semibold p-3 rounded-xl transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => { navigate('/login') }}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signp;
