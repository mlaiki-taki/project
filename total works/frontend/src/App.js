import { Switch, Route } from 'react-router-dom'

import Login from './Components/authComponent/Login';
import Register from './Components/authComponent/Register';
import AccountView from './Components/account/index'
import Home from "./Components/Home/Home"
import event from "./Components/events"
import groupe from "./Components/groupe/index"
import GroupeView from "./Components/groupe/GroupeView/index"

function App() {


  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/account" component={AccountView} />
        <Route path="/events" component={event} />
        {/* <Route path="/groupes" component={groupe} /> */}
        {/* <Route path="/groupes/:id" component={groupe} /> */}
        <Route path="/:id" component={GroupeView} />
      </Switch>
    </div>
  );
}

export default App;
