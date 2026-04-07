/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import VetLocator from './pages/VetLocator';
import Appointments from './pages/Appointments';
import Community from './pages/Community';
import Blog from './pages/Blog';
import './i18n';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="vets" element={<VetLocator />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="community" element={<Community />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
