import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './Pages/HomePage';
import HomePagePerson from './Pages/HomePagePerson';
import { IndexPagePerson } from './Pages/IndexPagePerson';
import { CreatePagePerson } from './Pages/CreatePagePerson';
import { DetailPagePerson } from './Pages/DetailPagePerson';
import { IndexPageAdress } from './Pages/IndexpageAdress';
import { CreatePageAdress } from './Pages/CreatePageAdress';
import { EditPageAdress } from './Pages/EditPageAdress';
import { IndexPageAbsence } from './Pages/IndexPageAbsence';
import { CreatePageAbsence } from './Pages/CreatePageAbsence';
import { IndexPageBusnessTrip } from './Pages/IndexPageBusnessTrip';
import { CreatePageBusnessTrip } from './Pages/CreatePageBusnessTrip';
import { EditPageAbsence } from './Pages/EditPageAbsence';
import { EditPageBusnessTrip } from './Pages/EditPageBusnessTrip';
import { IndexPageTicket } from './Pages/IndexPageTicket';
import { CreatePageTicket } from './Pages/CreatePageTicket';
import { EditPageTicket } from './Pages/EditPageTicket';

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
          <Route path="/Persons/Details/:id" element={<DetailPagePerson />} />
          <Route path="/Adresses" element={<IndexPageAdress />} />
          <Route path="/Adresses/Create" element={<CreatePageAdress />} />
          <Route path="/Adresses/Edit/:id" element={<EditPageAdress />} />
          <Route path="/Absence" element={<IndexPageAbsence />} />
          <Route path="/Absence/Edit/:id" element={<EditPageAbsence />} />
          <Route path="/Absence/Create" element={<CreatePageAbsence />} />
          <Route path="/BusnessTrips" element={<IndexPageBusnessTrip />} />
          <Route path="/BusnessTrips/Create" element={<CreatePageBusnessTrip />} />
          <Route path="/BusnessTrips/Edit/:id" element={<EditPageBusnessTrip />} />
          <Route path="/Tickets" element={<IndexPageTicket />} />
          <Route path="/Tickets/Create" element={<CreatePageTicket />} />
          <Route path="/Tickets/Edit/:id" element={<EditPageTicket />} />


        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
