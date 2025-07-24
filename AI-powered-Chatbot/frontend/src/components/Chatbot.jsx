import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, replaceLastMessage } from './redux/newChatSlice';
import { MessageSquarePlus } from 'lucide-react'

function Gemini() {
  const KEY = process.env.REACT_APP_API_KEY;
  const dispatch = useDispatch();
  let convers = useSelector((state) => state.counter.gemini);
  let [conversation,setConversation] = useState(convers)
  const chatID = useSelector((state) => state.counter.chatId);
  //console.log(conversation)
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  let [chatId,setChatId]=useState(chatID)
  let user = localStorage.getItem('user')
  user = JSON.parse(user)

  let [res,setRes] = useState('')
  
  useEffect(()=>{

    const uplaodConversation = async()=>{
      const data = await fetch('http://localhost:5000/api/chat/uploadConvo',{
        method:'post',
        headers:{
          'Content-type':'application/json',
          'authorization':`Bearer ${user.token}`
        },
        body:JSON.stringify({
          userId:user.userId,
          chatId:chatId,
          messages:[conversation[conversation.length-2],conversation[conversation.length-1]]
        })
      })

      const result = await data.json()
      console.log("result:",result)
      setChatId(result.convo._id)
    }
    //console.log(conversation[conversation.length-1])
    uplaodConversation();
  },[res])

  const fetchData = async () => {
    if (!query.trim()) return;

    const userMsg = { sender: 'user', message: query };
    const botPlaceholder = { sender: 'bot', message: 'Typing...' };
    dispatch(addMessage({ bot: 'gemini', message: userMsg }));
    dispatch(addMessage({ bot: 'gemini', message: botPlaceholder }));
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg.message }] }],
          }),
        }
      );

      const data = await res.json();
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
      setRes(responseText)

      const updatedBotMsg = { sender: 'bot', message: responseText };
      dispatch(replaceLastMessage({ bot: 'gemini', message: updatedBotMsg }));
    } catch (err) {
      dispatch(
        replaceLastMessage({
          bot: 'gemini',
          message: { sender: 'bot', message: 'Failed to fetch response.' },
        })
      );
    }
    setLoading(false);
    //setConversation(convers)
  };

  const newChat = ()=>{
    setConversation([])
    setChatId('')
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-24 pb-32">
      <div className='flex items-center justify-between'>
        <div className="text-3xl font-bold text-center mb-6">Gemini-Powered Chatbot</div>
        <MessageSquarePlus className="w-10 h-10" onClick={()=>{newChat()}}/>
      </div>

      <div className="w-full max-w-4xl h-[450px] overflow-y-auto bg-gray-50 rounded-xl p-6 shadow-inner space-y-4">
        {convers.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-base shadow-md ${
                item.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <ReactMarkdown>{item.message}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="fixed bottom-0 w-full flex justify-center items-center px-4 pb-6">
        <div className="w-[70%] max-w-3xl flex bg-white border border-gray-300 shadow-md rounded-full overflow-hidden xs:w-[50%] sm:w-[50%] md:w-[60%]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none "
            placeholder="Ask anything..."
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
          />
          <button
            onClick={fetchData}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gemini;













































// // import React, { useEffect, useState } from 'react'
// // import ReactMarkdown from 'react-markdown';
// // import {v4 as uuidv4} from 'uuid'
// // import { useDispatch,useSelector } from 'react-redux';
// // import { increment, reNewChatID } from './redux/newChatSlice';
// // import chatStore from './redux/chatStore';
// // function Chatbot() {

// //   const KEY = process.env.REACT_APP_API_KEY;
// //   let [query,setQuery] = useState('');
// //     let [response,setResponse] = useState('')
// //     let [conversation,setConversation] = useState([])
// //     let [title,setTitle] = useState("")
// //     let newChatId = useSelector(state=>state.counter.chatId)
// //     //let [chatId, setChatId] = useState(newChatId)
// //     let [convo,setConvo] = useState()
    
// //     const [currentChatId, setCurrentChatId] = useState(null);

// // useEffect(() => {
// //   if (newChatId && newChatId.length > 5) {
// //     setCurrentChatId(newChatId);  // wait until Redux updates, then sync
// //   }
// // }, [newChatId]);





// //     useEffect(()=>{
// //       if(!response) return
// //       setConversation(prev => {
// //         if (!title && query) {
// //           setTitle(query);
// //           console.log('inside setConvo title set')
// //         }
// //         console.log('inside setConvo outside title set')

// //         return [...prev, { sender: 'user', message: query }, { sender: 'bot', message: response }];
// //       })
// //     },[response])

// //     useEffect(()=>{
// //       fetchConvoById()
// //     },[newChatId])

// //     useEffect(()=>{
// //       if(conversation.length===0)return
// //       if (!currentChatId || currentChatId.length < 5) return;
// //       uploadConversation(currentChatId);
// //     },[conversation,newChatId])

// //     const uploadConversation = async(chatID)=>{
// //       let result = await fetch("http://localhost:5000/data",{
// //         method:'post',
// //         headers:{
// //           'Content-Type':'application/json',
// //         },
// //         body:JSON.stringify({
// //           messages: conversation.filter((c) => c.sender && c.message),
// //           title:title || query,
// //           chatID:chatID
// //         })
// //       })
// //       result = await result.json()
// //       console.log("from upload conversation Results :: ",result,newChatId)
// //     }

// //     const requestBody = {
// //     contents: [
// //       {
// //         parts: [
// //           {
// //             text: query
// //           }
// //         ]
// //       }
// //     ]
// //   };
  

// //     const fetchData = async() =>{
// //         if (!query.trim()) return;
// //         const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEY}`,{
// //             method:'post',
// //             headers:{
// //                 "Content-type" : 'application/json'
// //             },
// //             body: JSON.stringify(requestBody
// //             )   
// //         })
// //         const data = await res.json();
// //         const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
// //         setResponse(responseText);
// //     }

// //     const handleChange = (e) =>{
// //         setQuery(e.target.value)
// //     }
// //     const dispatch = useDispatch()
// //     const newChat = ()=>{
// //       let id = uuidv4()
// //       setQuery('')
// //       setResponse('')
// //       setConversation([])
// //       //setChatId(id)
// //       setTitle('')
// //       dispatch(increment())
// //       dispatch(reNewChatID(id))
// //       setTimeout(() => {
// //         console.log("Current Redux Chat ID:", chatStore.getState().counter.chatId); // if you import `store`
// //       }, 100);
// //     }


// //     const fetchConvoById = async()=>{
// //       try{
// //       let res = await fetch('http://localhost:5000/oneConvo',{
// //         method:'post',
// //         headers:{
// //           'Content-type' : 'application/json'
// //         },
// //         body:JSON.stringify({chatId:newChatId})
// //       })
// //       const text = await res.text(); // read raw text

// //       if (!text) {
// //         console.warn("⚠️ Empty response from server.");
// //         setConvo(null); // clear old convo
// //         return;
// //       }
  
// //       const data = JSON.parse(text); // manually parse to catch empty
// //       if (!data?.messages?.length) {
// //         setConvo(null); // or setConvo({ messages: [] })
// //         return;
// //       }
  
// //       setConvo(data);
// //       }catch(err){
// //         console.log("error : ",err, "newChatID : ",newChatId)
// //         setConvo(null)
// //       }
// //     }

// //    // useEffect(()=>{},[convo]) //chatgpt i am highlighting this for you

// //   return (
// //     <>
// //     <div className='w-[90%] flex flex-col justify-center items-center'>
// //     <div className='bg-gray-200 w-screen lg:ml-96 sm:ml-80 p-4 fixed top-0 h-20'>
// //         <button className='border border-black p-2 fixed top-4 right-4' onClick={newChat}>new-chat</button>
// //       </div>
// //     <div className='h-[600px] overflow-y-auto p-4 mt-12'>
// //       {convo?.messages?.length > 0 ? (
// //       convo.messages.map((item,index)=>( 
// //         <div key={index} className='flex flex-col text-xl' >
// //           {item.sender === "bot" ?
// //           <div className='m-4 p-2'><ReactMarkdown>{item.message}</ReactMarkdown></div>
// //           :
// //           <div className='flex bg-gray-100 rounded-xl m-2 p-4 self-end'>
// //             {item.message}
// //           </div>
// //           }
// //         </div>
// //       ))
// //     ) : (
// //       <p className="text-gray-500 text-center mt-4">No conversation yet.</p>
// //     )}
// //     </div>

// //     <div className='fixed bottom-0 flex justify-center items-center border m-4 w-[70%] md:w-[55%] sm:w-[50%] rounded-xl border-gray-700 m-8 p-2' >
// //         <input className='border rounded-xl p-2 m-2 w-[85%]'  type='text' placeholder='Ask anything.....' value={query} onChange={handleChange}/>
// //         <button className='border border-gray-700 w-[20%] ml-0 m-4' onClick={fetchData}>Send</button>
// //     </div>
// //     </div>
// //     </>
// //   )

// // }
// // export default Chatbot


// import React, { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// //import { v4 as uuidv4 } from 'uuid';
// import { useSelector } from 'react-redux';
// //import { increment, reNewChatID } from './redux/newChatSlice';

// function Gemini() {
//   const KEY = process.env.REACT_APP_API_KEY;
//   const [query, setQuery] = useState('');
//   const [response, setResponse] = useState('');
//   const [conversation, setConversation] = useState([]);
//   const [title, setTitle] = useState('');
//   const newChatId = useSelector((state) => state.counter.chatId);
//   const [chatId, setChatId] = useState(newChatId);

//   useEffect(() => {
//     if (!response) return;
//     setConversation((prev) => {
//       if (!title && query) {
//         setTitle(query);
//       }
//       return [...prev, { sender: 'user', message: query }, { sender: 'bot', message: response }];
//     });
//   }, [response]);

//   const requestBody = {
//     contents: [
//       {
//         parts: [{ text: query }],
//       },
//     ],
//   };

//   const fetchData = async () => {
//     const res = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEY}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       }
//     );
//     const data = await res.json();
//     console.log(data);

//     if (data.candidates && data.candidates.length > 0) {
//       setResponse(data.candidates[0].content.parts[0].text);
//     } else {
//       setResponse('No response generated.');
//     }
//   };

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   };

//   return (
//     <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-24 pb-32">
//       <div className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
//         Gemini-Powered Chatbot
//       </div>

//       {/* Chat display area */}
//       <div className="w-full max-w-4xl h-[600px] overflow-y-auto bg-gray-50 rounded-xl p-6 shadow-inner space-y-4">
//         {conversation.map((item, index) => (
//           <div key={index} className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div
//               className={`max-w-[80%] px-4 py-3 rounded-2xl text-base shadow-md ${
//                 item.sender === 'user'
//                   ? 'bg-blue-600 text-white rounded-br-none'
//                   : 'bg-gray-200 text-gray-800 rounded-bl-none'
//               }`}
//             >
//               <ReactMarkdown>{item.message}</ReactMarkdown>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input box */}
//       <div className="fixed bottom-0 w-full flex justify-center items-center px-4 pb-6">
//         <div className="w-full max-w-3xl flex bg-white border border-gray-300 shadow-md rounded-full overflow-hidden">
//           <input
//             type="text"
//             className="flex-1 px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none md:w-[50%]"
//             placeholder="Ask anything..."
//             onChange={handleChange}
//           />
//           <button
//             onClick={fetchData}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Gemini;


