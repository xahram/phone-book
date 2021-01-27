import './App.css';
import Layout from './components/Layout/Layout';
import ContactsPage from './components/ContactsPage/ContactsPage';
import { Route, Switch, Redirect } from 'react-router-dom'
import AddContact from './components/AddContact/AddContact';
function App() {

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/add-contact" exact component={AddContact} />
          <Route path="/" component={ContactsPage} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
