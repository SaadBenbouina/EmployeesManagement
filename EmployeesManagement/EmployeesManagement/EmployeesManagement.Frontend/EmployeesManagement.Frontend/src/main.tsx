import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './Pages/HomePage';
import HomePagePerson from './Pages/HomePagePerson';
import { IndexPagePerson } from './Pages/IndexPagePerson';
import { CreatePagePerson } from './Pages/CreatePagePerson';

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

        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
