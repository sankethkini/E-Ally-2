import React, { useEffect, useRef, useState } from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom";
import elem from "./Home";
import SelectBranch from "./Skills/SelectBranch"
import login from "./Auth/Login"
import signup from "./Auth/Signup"
import SelectSkills from "./Skills/SelectSkills"
import AskSkills from "./Skills/AskSkills"
import MainPage from "../src/Main/MainPage"
import AddResource from "../src/Main/AddResource"
import Search from "../src/Main/Search"
import Resource from './Main/Resource'
import Skills from './Main/Skills'
import Profile from './Main/Profile'
import Chat from './Chat'

function App() {
 

  useEffect(()=>{
   
  })
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/"  exact component={elem}  />
        <Route path="/login" exact component={login} />
        <Route path="/signup" exact component={signup} />
        <Route path="/branch" exact component={SelectBranch}/>
        <Route path="/:branchname/selectskills" exact component={SelectSkills}/>
        <Route path="/:branchname/askforskills" exact component={AskSkills}/>
        <Route path="/main" exact component={()=><MainPage></MainPage>} />
        <Route path="/:branchname/contribute" exact component={AddResource} />
        <Route path="/search" exact component={Search}></Route>
        <Route path="/resource/:id" exact component={Resource}></Route>
        <Route path="/skill/:id" exact component={Skills}></Route>
        <Route path="/myprofile" exact component={Profile}></Route>
        <Route path="/chat/:username" exact component={Chat}/>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
