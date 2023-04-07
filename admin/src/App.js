import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Astregister from './components/Astregister';
import Dashboard from './components/Dashboard';
import Empregister from './components/Empregister';
import Operdashboard from './components/Operdashboard';
import Opertable from './components/Opertable';
import Stageregister from './components/Stageregister';
import Operview from './components/Operview';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Routeregister from './components/Routeregister';
import RouteStageMap from './components/RouteStageMap';
import Astview from './components/Astview';
import Empview from './components/Empview';
import Emptable from './components/Emptable';
import Asttable from './components/Asttable';


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/opertable' element={<Opertable />} />
        <Route path='/operdashboard' element={<Operdashboard />} />
        <Route path='/approve/:OperId' element={<Opertable />} />
        <Route path='/operator/:OperId' element={<Operview />} />
        <Route path='/empregister' element={<Empregister />} />
        <Route path='/empview' element={<Emptable/>}/>
        <Route path='/astregister' element={<Astregister />} />
        <Route path='/astview' element={<Asttable/>}/>
        <Route path='/operator/asset/:AstId' element={<Astview/>}/>
        <Route path='/employee' element={<Empview/>}/>
        <Route path='/employee/:EmpId' element={<Empview/>}/>
        <Route path='/stageregister' element={<Stageregister/>} />
        <Route path='/routeregister' element={<Routeregister/>} /> 
        <Route path='/routemap' element={<RouteStageMap/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
