import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './Pages/HomePage';
import HomePagePerson from './Pages/HomePagePerson';
import { CreatePageAbsence } from './Pages/CreatePageAbsence';
import { CreatePageAdress } from './Pages/CreatePageAdress';
import { CreatePageBusnessTrip } from './Pages/CreatePageBusnessTrip';
import { CreatePagePerson } from './Pages/CreatePagePerson';
import { CreatePageTicket } from './Pages/CreatePageTicket';
import { DetailPagePerson } from './Pages/DetailPagePerson';
import { EditPageAbsence } from './Pages/EditPageAbsence';
import { EditPageAdress } from './Pages/EditPageAdress';
import { EditPageBusnessTrip } from './Pages/EditPageBusnessTrip';
import { EditPageTicket } from './Pages/EditPageTicket';
import { IndexPageAbsence } from './Pages/IndexPageAbsence';
import { IndexPageBusnessTrip } from './Pages/IndexPageBusnessTrip';
import { IndexPagePerson } from './Pages/IndexPagePerson';
import { IndexPageTicket } from './Pages/IndexPageTicket';
import { IndexPageAdress } from './Pages/IndexpageAdress';


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Persons" element={<HomePagePerson />} />
          <Route path="/Persons/Index" element={<IndexPagePerson />} />
          <Route path="/Persons/Create" element={<CreatePagePerson />} />
          <Route path="/Adresses" element={<IndexPageAdress />} />
          <Route path="/Adresses/Create" element={<CreatePageAdress />} />
          <Route path="/Absence" element={<IndexPageAbsence />} />
          <Route path="/Absence/Create" element={<CreatePageAbsence />} />
          <Route path="/BusnessTrips" element={<IndexPageBusnessTrip />} />
          <Route path="/BusnessTrips/Create" element={<CreatePageBusnessTrip />} />
          <Route path="/Tickets" element={<IndexPageTicket />} />
          <Route path="/Tickets/Create" element={<CreatePageTicket />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
