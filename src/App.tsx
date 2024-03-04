import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import {HomePage} from "./page/Home/HomePage";
import {WifiPageContent} from "./page/Wifi/WifiPageContent";
import {VoicePageContent} from "./page/Voice/VoicePageContent";

function App() {
    return (
        <Router>
            <Sidebar/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/wifi' element={<WifiPageContent/>}/>
                <Route path='/voice' element={<VoicePageContent/>}/>
            </Routes>
        </Router>
    );
}

export default App;