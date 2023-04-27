import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Opertable from './components/Opertable';
import Operview from './components/Operview';
import SignIn from './components/SignIn';
import Register from './components/Operator/Register';
import Operdashboard from './components/Operator/Operdashboard';
import Astregister from './components/Operator/OperAsset/Astregister';
import Astedit from './components/Operator/OperAsset/Astedit';
import Asttable from './components/Operator/OperAsset/Asttable';
import Astview from './components/Operator/OperAsset/Astview';
import Empregister from './components/Operator/OperEmployee/Empregister';
import Empedit from './components/Operator/OperEmployee/Empedit';
import Empview from './components/Operator/OperEmployee/Empview';
import Emptable from './components/Operator/OperEmployee/Emptable';
import Routeregister from './components/Operator/OperRoute/Routeregister';
import Rutedit from './components/Operator/OperRoute/Rutedit';
import Rutview from './components/Operator/OperRoute/Rutview';
import Ruttable from './components/Operator/OperRoute/Ruttable';
import RouteStageMap from './components/Operator/OperRouteStage/RouteStageMap';
import Stageregister from './components/Operator/OperStage/Stageregister';
import Stgedit from './components/Operator/OperStage/Stgedit';
import Stgtable from './components/Operator/OperStage/Stgtable';
import Stgview from './components/Operator/OperStage/Stgview';
import Assets from './components/Assets';
import Employees from './components/Employees';
import Operators from './components/Operators';
import Users from './components/Users';
import Admins from './components/Admins';
import ViewAdmin from './components/ViewAdmin';
import ViewUser from './components/ViewUser';
import ViewOperator from './components/ViewOperator';
import ViewEmployee from './components/ViewEmployee';
import ViewAsset from './components/ViewAsset';
import AdmiCreate from './components/AdmiCreate';
import TicketType from './components/TicketType';
import TicketTypes from './components/TicketTypes';
import ViewTicketType from './components/ViewTicketType';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				
				<Route path='/' element={<SignIn />} />
				<Route path='/register' element={<Register />} />
				<Route path='/admin/dashboard' element={<Dashboard />} />
				<Route path='/admin/addAdmin' element={<AdmiCreate />} />
				<Route path='admin/approveopersview' element={<Opertable />} />
				<Route path='/admin/approveoper/:OperId' element={<Operview />} />
				<Route path='/operdashboard' element={<Operdashboard />} />
				<Route path='/approve/:OperId' element={<Opertable />} />
				<Route path='/empregister' element={<Empregister />} />
				<Route path='/empupdate/:EmpId' element={<Empedit />} />
				<Route path='/empview' element={<Emptable />} />
				<Route path='/employee' element={<Empview />} />
				<Route path='/employee/:EmpId' element={<Empview />} />
				<Route path='/astregister' element={<Astregister />} />
				<Route path='/astupdate/:AstId' element={<Astedit />} />
				<Route path='/astview' element={<Asttable />} />
				<Route path='/operator/asset/:AstId' element={<Astview />} />
				<Route path='/stageregister' element={<Stageregister />} />
				<Route path='/stgview' element={<Stgtable />} />
				<Route path='/operator/stage/:StageID' element={<Stgview />} />
				<Route path='/stgupdate/:StageID' element={<Stgedit />} />
				<Route path='/routeregister' element={<Routeregister />} />
				<Route path='/rutview' element={<Ruttable />} />
				<Route path='/operator/route/:RouteID' element={<Rutview />} />
				<Route path='/rutupdate/:RouteID' element={<Rutedit />} />
				<Route path='/routemap' element={<RouteStageMap />} />
				<Route path='/admin/assetsview' element={<Assets />} />
				<Route path='/admin/assetsview/:AstId' element={<ViewAsset />} />
				<Route path='/admin/employeesview' element={<Employees />} />
				<Route path='/admin/employeesview/:EmpId' element={<ViewEmployee />} />
				<Route path='/admin/operatorsview' element={<Operators />} />
				<Route path='/admin/operatorsview/:OperId' element={<ViewOperator />} />
				<Route path='/admin/adminview' element={<Admins />} />
				<Route path='/admin/adminview/:AdminId' element={<ViewAdmin />} />
				<Route path='/admin/usersview' element={<Users />} />
				<Route path='/admin/usersview/:UserId' element={<ViewUser />} />
				<Route path='/admin/ticket-type/add' element={<TicketType />} />
				<Route path='/admin/ticket-types' element={<TicketTypes />} />
				<Route path='/admin/ticket-types/:TTid' element={<ViewTicketType />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
