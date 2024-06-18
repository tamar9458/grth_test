import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { UseDispatch, useDispatch } from 'react-redux';
import { getPackages } from './service/packageServices'
import PackageList from './componnents/PackageList';
import AddPackage from './componnents/AddPackage';
import Package from './componnents/Package';
import './App.css';

export const API_URL = `https://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e`

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPackages('', navigate))
    navigate('/package')
  }, [])
  return (
    <div className="App">
      <header >
      </header>
      <Routes>
        <Route path="/package" element={<PackageList />}></Route>
        <Route path="/add" element={<AddPackage />}></Route>
        <Route path="/details" element={<Package />}></Route>
      </Routes>
    </div>
  );
}

export default App;
