
import './App.css';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
} from 'react-router-dom';

import NavBar from './components/NavBar';
import routes from './routes';

import Toast from './components/Toast';
import useToast from './hooks/toast';

import { UseSelector, useSelector } from 'react-redux';

function App() {
  const toasts = useSelector(state => state.toast.toasts);
  const { deleteToast } = useToast();

  return (
    
    <Router>
      
      <NavBar/>
      <Toast toasts={toasts} deleteToast={deleteToast}/>
      
      <div className='container mt-5'>
        <Switch>
          
            {routes.map((route) => {
              //const Component = route.component;

              return <Route 
                key={route.path} 
                exact path={route.path} 
                component={route.component} 
              >
                {/* 모든 페이지에 addToast 함수를 파라미터로 전달하고 있음 => 이후 수정 예정 
                <Component addToast = {addToast} /> */}
              </Route>
            })}
          
        </Switch>
      </div>
      
    </Router>
    
  );
}

export default App;
