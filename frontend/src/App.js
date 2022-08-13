import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectPage from "./SelectPage";
import ResultPage from "./ResultPage";
import HistoryPage from "./HistoryPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/select" element={<SelectPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
