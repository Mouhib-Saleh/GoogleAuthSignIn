import './App.css';
import {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';



function App() {

const [user,setUser] = useState({});
var [hideButton, setHideButton] = useState(true);

 function handelCallbackResponse(response){
 var object_user = jwt_decode(response.credential);
 setUser(object_user);
 setHideButton(false);
 console.log("pressed log in "+hideButton);
 } 

 function handleSignOut(e){
setUser({});
setHideButton(true);
console.log(hideButton);
google.accounts.id.renderButton(
  document.getElementById("signInDiv"),
  {theme: "outline",size: "large"}
)
 }

useEffect(()=>{
/* global google */
google.accounts.id.initialize({
  client_id:'enterurClientID',
  callback: handelCallbackResponse
})
google.accounts.id.renderButton(
  document.getElementById("signInDiv"),
  {theme: "outline",size: "large"}
)
},[]);


useEffect(()=>{
  if(hideButton){  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {theme: "outline",size: "large"}
  )}

},[hideButton]);


  return (
    <div className="App">
      {  hideButton &&
        <div id="signInDiv"></div>
      }
      
      { user && 
      <div className='info'>
        <img src = {user.picture}></img>
        <h3>{user.name}</h3>
      </div>
      }
      {
        !hideButton &&
      <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
    }
    </div>
  );
}

export default App;
