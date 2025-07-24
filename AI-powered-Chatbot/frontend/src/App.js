import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import TextToImg from './components/textToImg';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Models from './components/Models';
import OpenRouterDirect from './components/OpenRouter';
import Gemini from './components/Chatbot';
import Logout from './components/authComponents/logout';
import TextToSpeech from './components/TextToSpeech';
import VoiceToText from './components/VoiceToText';
import ImageToText from './components/ImageToText';
import Signp from './components/authComponents/Signp';
import PrivateComponents from './components/PrivateComponents';
import Login from './components/authComponents/Login';
import UserProfile from './components/extraComponent/UserProfile';
import { useEffect, useState } from 'react';



function App() {
  
  
  let [toggle,setToggle] = useState(localStorage.getItem('user'))

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('user');
      setToggle(!!auth);
    };

    checkAuth(); // run on first render

    // Listen to custom "authChanged" event
    window.addEventListener('authChanged', checkAuth);

    return () => window.removeEventListener('authChanged', checkAuth);
  }, []);

  
  return (
    <div className="">
      <BrowserRouter>
      <Navbar/>
        <div className={toggle?'ml-64 p-4':'p-0'}>
          <Routes>
            <Route element={<PrivateComponents/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/chatbots' element={<Models/>}>
                <Route path='gemini' element={<Gemini/>}/>
                <Route path='openrouter' element={<OpenRouterDirect/>}/>
              </Route>
              <Route path='/tti' element={<TextToImg/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/tts' element={<TextToSpeech/>}/>
              <Route path='/itt' element={<ImageToText/>}/>
              <Route path='/vtt' element={<VoiceToText/>}/>
              <Route path='/profile' element={<UserProfile/>}/>
            </Route>
            <Route path='/signup' element={<Signp/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
