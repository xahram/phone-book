import './App.css';
import Layout from './components/Layout/Layout';
import React from 'react'
import ContactsPage from './components/ContactsPage/ContactsPage';
import { Route, Switch, Redirect } from 'react-router-dom'
import AddContact from './components/AddContact/AddContact';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init({duration: 500});
// import socket from '../src/utils/socket-io'
function App() {
  // const [users, setUsers] = React.useState(0)
  // socket.on("client-total", (data) => {
  //     console.log(data)
  //     setUsers(data)
  // }) 
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/add-contact" exact component={AddContact} />
          <Route path="/" component={ContactsPage} />
          <Redirect to="/" />
        </Switch>
        {/* <h3>{users}</h3> */}
      </Layout>
    </div>
  );
}

export default App;
