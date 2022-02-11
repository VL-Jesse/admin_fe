import './App.css';
import { Loading } from './Components/Loading';
import { Router } from './Routes/Routes';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <Loading/>
      <Router/>
    </div>
  );
}

export default App;
