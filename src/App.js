import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import UserInputForm from './components/UserInputForm';
import UserList from './components/UserList';

function App() {
  const [regForm, showRegForm] = useState(true);
  const [userState, setUserState] = useState({
    edit: false,
    userId: 0,
  });
  const openRegForm=(e)=>{
    const tempUserData = {...userState};
    tempUserData.edit = false;
    tempUserData.userId = 0;
    setUserState(tempUserData);
    !regForm?showRegForm(true):showRegForm(false);
  }
  const editUserForm=(id)=>{
    const tempUserData = {...userState};
    tempUserData.edit = true;
    tempUserData.userId = id;
    setUserState(tempUserData);
    !regForm?showRegForm(true):showRegForm(false);
  }
  return (
    <div className="App">
      <Navbar onChange={openRegForm}/>
      <UserList editUserForm={(id) => editUserForm (id)}/>
      {regForm && <UserInputForm hideFrom={openRegForm} userState={userState}/>}
    </div>
  );
}

export default App;
