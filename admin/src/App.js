import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Admin Components/Admin/Dashboard';
import Opertable from './components/Admin Components/Operators/Opertable';
import Operview from './components/Admin Components/Operators/Operview';
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
import Assets from './components/Admin Components/Assets/Assets';
import Employees from './components/Admin Components/Employees/Employees';
import Operators from './components/Admin Components/Operators/Operators';
import Users from './components/Admin Components/Users/Users';
import Admins from './components/Admin Components/Admin/Admins';
import ViewAdmin from './components/Admin Components/Admin/ViewAdmin';
import ViewUser from './components/Admin Components/Users/ViewUser';
import ViewOperator from './components/Admin Components/Operators/ViewOperator';
import ViewEmployee from './components/Admin Components/Employees/ViewEmployee';
import ViewAsset from './components/Admin Components/Assets/ViewAsset';
import AdmiCreate from './components/Admin Components/Admin/AdmiCreate';
import TicketType from './components/Admin Components/Ticket Type/TicketType';
import TicketTypes from './components/Admin Components/Ticket Type/TicketTypes';
import ViewTicketType from './components/Admin Components/Ticket Type/ViewTicketType';
import IndividualOperatorCard from './components/Admin Components/AdminLayout/IndividualStats/SingleOperDashboard';
import SingleAssetDashboard from './components/Admin Components/AdminLayout/IndividualStats/SingleAssets';
import IndiviualOperAsset from './components/Admin Components/AdminLayout/IndividualStats/SingleOperAsset/IndiviualOperAsset';
import AssetTable from './components/Admin Components/AdminLayout/IndividualStats/SingleOperAsset/AssetTable';
import IndiviualOperEmployee from './components/Admin Components/AdminLayout/IndividualStats/SingleOperEmployee/IndiviualOperEmployee';
import EmployeeTable from './components/Admin Components/AdminLayout/IndividualStats/SingleOperEmployee/EmployeeTable';
import SingleEmployeeDashboard from './components/Admin Components/AdminLayout/IndividualStats/SingleEmployees';
import IndividualTransAssetData from './components/Operator/OperLayout/IndividualTransactiondata/IndividualTransAssetData';
import IndividualTransAssetRouteData from './components/Operator/OperLayout/IndividualTransactiondata/IndividualTransAssetRouteData';
import SingleOperator from './components/Admin Components/AdminLayout/individualTransStats/SingleOperator';
import IndiviualTransAsset from './components/Admin Components/AdminLayout/individualTransStats/IndiviualTransAsset';
import IndiviualTransRoute from './components/Admin Components/AdminLayout/individualTransStats/IndiviualTransRoute';
import Home from './components/Home';
import PrivacyPolicy from './components/PivacyPolicy';
import RefundsAndCancels from './components/RefundsAndCancels';
import TermsAndConditions from './components/TermsAndConditions';
import ForgotPassword from './components/ForgotPassword';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/privacypolicy' element={<PrivacyPolicy />} />
				<Route path='/refundandcancellations' element={<RefundsAndCancels />} />
				<Route path='/termsandconditions' element={<TermsAndConditions />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/register' element={<Register />} />
				<Route path='/forgotpassword' element={<ForgotPassword />} />
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
				<Route
					path='/transactionasset'
					element={<IndividualTransAssetData />}
				/>
				<Route
					path='/transactionassetroute/:AstId'
					element={<IndividualTransAssetRouteData />}
				/>
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
				<Route
					path='/admin/singleoperstats'
					element={<IndividualOperatorCard />}
				/>
				<Route path='/admin/singleassets' element={<SingleAssetDashboard />} />
				<Route
					path='/admin/singleemployee'
					element={<SingleEmployeeDashboard />}
				/>
				<Route
					path='/admin/operator/asset/:OperId'
					element={<IndiviualOperAsset />}
				/>
				<Route
					path='/admin/operator/employee/:OperId'
					element={<IndiviualOperEmployee />}
				/>
				<Route path='/admin/asset/:OperId' element={<AssetTable />} />
				<Route path='/admin/employee/:OperId' element={<EmployeeTable />} />
				<Route path='/admin/singleoperator' element={<SingleOperator />} />
				<Route
					path='/admin/operator/assetdata/:OperId'
					element={<IndiviualTransAsset />}
				/>
				<Route
					path='/admin/transactionassetroute/:AstId'
					element={<IndiviualTransRoute />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
