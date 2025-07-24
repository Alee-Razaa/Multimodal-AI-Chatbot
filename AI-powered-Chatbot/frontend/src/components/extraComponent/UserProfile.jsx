import React, { useState } from "react";
import img from '../../assets/me.jpg'

const UserProfile = () => {
  let [res,setRes] = useState()
  const use = localStorage.getItem('user');
  //console.log("use :",use)
  const user1 = use ? JSON.parse(use) : null;
  //console.log("user1 : ",user1)
  const token = user1?.token;
 // console.log("token :",token)

  console.log(token)
  const me = async ()=>{ 
    const result = await fetch('http://localhost:5000/api/auth/me',{
       method: 'GET',
      headers:{
        'Content-type':'application/json',
        'authorization': `Bearer ${token}`
      },
    })

    const dat = await result.json()
    
    console.log("me res : " , dat.message)
  }
  const user = {
    name: "Aadil Shah",
    email: "aadil.shah@example.com",
    bio: "Full Stack Developer | MERN Enthusiast | Building AI-powered apps 🚀",
    avatar: img,
    followers: 1200,
    following: 300,
    posts: 45,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-2 text-sm text-gray-600">{user.bio}</p>
        </div>

        <div className="mt-6 flex justify-around text-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{user.followers}</h3>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{user.following}</h3>
            <p className="text-sm text-gray-500">Following</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{user.posts}</h3>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
        </div>

        <div className="mt-6">
          <button onClick={()=>{alert("US MOMENT!, because I am also useless like you bro ")}} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300">
            Edit Profile
          </button>
          <button className='bg-blue-600 hover:bg-blue-700 w-full py-2 px-4 mt-2 border rounded-xl text-white ' onClick={()=>{me()}}>SeeMaGiC</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
