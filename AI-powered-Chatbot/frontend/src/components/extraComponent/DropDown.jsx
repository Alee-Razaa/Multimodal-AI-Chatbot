import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { putGemini,reNewChatID } from "../redux/newChatSlice";
import { useDispatch } from "react-redux";

const Dropdown = ({label = "History" }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [options,setOptions]=useState([])
  const dispatch = useDispatch()

  let user = localStorage.getItem('user')
  user = JSON.parse(user)

  const GeminiAllConvos = async()=>{
    const allConvos = await fetch(`http://localhost:5000/api/chat/allConvos/${user.userId}`,{
      method:'get',
      headers:{
        'content-type':"application/json",
        "authorization":`Bearer ${user.token}`
      }
    })
    const res = await allConvos.json()
    console.log('All convos : ',res)
    setOptions(res)
  }

  const GeminiOneConvo = async(chatId)=>{
    const oneConvo = await fetch(`http://localhost:5000/api/chat/getConvo/${user.userId}/${chatId}`,{
      method:'get',
      headers:{
        'content-type':"application/json",
        "authorization":`Bearer ${user.token}`
      },
    })
    const res = await oneConvo.json()
    console.log('One convo : ',res)
    console.log(res.messages)
    dispatch(putGemini(res.messages))
    dispatch(reNewChatID(chatId))

  }


  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        onClick={() => {setOpen(!open);GeminiAllConvos()}}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none flex justify-between items-center"
      >
        <span>{selected || label}</span>
        <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto transition-all duration-200">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {GeminiOneConvo(option._id)}}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer  border-b border-gray-300 w-full my-4 truncate"
            >
              {option.title}
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
