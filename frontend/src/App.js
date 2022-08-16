import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SelectPage from "./SelectPage";
import ResultPage from "./ResultPage";
import HistoryPage from "./HistoryPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/selectPage" element={<SelectPage />} />
        <Route path="/resultPage" element={<ResultPage />} />
        <Route path="/historyPage" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
