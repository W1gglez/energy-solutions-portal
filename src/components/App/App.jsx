import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/inter';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { Box } from '@mui/joy';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../UserHomePage/HomePage';

import Q1 from '../Assessment/Q1Page';
import Q2 from '../Assessment/Q2Page';
import Q3 from '../Assessment/Q3Page';
import Q4 from '../Assessment/Q4Page';
import Q5 from '../Assessment/Q5Page';
import Q6 from '../Assessment/Q6Page';
import Q7 from '../Assessment/Q7Page';
import AdditionalEquipment from '../Assessment/AdditionalEquipmentPage';
import FacilityPage from '../FacilityPage/FacilityPage';
import EnergyCost from '../Assessment/EnergyCost';

import AdminFacilityPage from '../FacilityPage/AdminFacilityPage';

import AssessmentReview from '../Assessment/AssessmentReview';
import ReportList from '../ReportPages/ReportLists/AdminReportList';
import AdminHomePage from '../AdminHomePage/AdminHomePage';
import EnergyReport from '../ReportPages/EnergyReport/EnergyReport';
import UserReportList from '../ReportPages/ReportLists/UserReportList';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <Box
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(to right bottom, white, #E7ECFA, white)'
        }}
      >
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/login */}
          <Redirect
            exact
            from='/'
            to='/login'
          />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path='/about'
          >
            <AboutPage />
          </Route>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/info'
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/report/:id'
          >
            <EnergyReport />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/admin-reports'
          >
            <ReportList />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/user-reports'
          >
            <UserReportList />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/admin-home-page'
          >
            <AdminHomePage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/home-page'
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/assessment/q1'
          >
            <Q1 />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/q2'
          >
            <Q2 />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/q3'
          >
            <Q3 />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/q4'
          >
            <Q4 />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/q5'
          >
            <Q5 />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/q6'
          >
            <Q6 />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/q7'
          >
            <Q7 />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/additional-equipment'
          >
            <AdditionalEquipment />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/energy-cost'
          >
            <EnergyCost />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/assessment/review'
          >
            <AssessmentReview />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/facilities'
          >
            <FacilityPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/admin-facilities'
          >
            <AdminFacilityPage />
          </ProtectedRoute>
          <Route
            exact
            path='/login'
          >
            {user.id ? (
              user.admin === true ? (
                <Redirect to='/admin-home-page' />
              ) : (
                <Redirect to='/home-page' />
              )
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route
            exact
            path='/registration'
          >
            {user.id ? (
              user.admin === true ? (
                <Redirect to='/admin-home-page' />
              ) : (
                <Redirect to='/home-page' />
              )
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
