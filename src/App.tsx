import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Page404 from "./components/Page404";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";
import Character from "./containers/Character";
import Layout from "./containers/Layout";
import useSearchAndPagination from "./hooks/useSearchAndPagination";

function App() {
  const { search, handleSearch, skip, handleSkip } = useSearchAndPagination();

  return (
    <CookiesProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout search={search} handleSearch={handleSearch} />}>
              <Route index element={<Characters search={search} skip={skip} handleSkip={handleSkip} />} />
              <Route path="/characters" element={<Characters search={search} skip={skip} handleSkip={handleSkip} />} />
              <Route path="/characters/:characterId" element={<Character />} />
              <Route path="/comics" element={<Comics search={search} skip={skip} handleSkip={handleSkip} />} />
              <Route path="/favorites" element={<Favorites username={"Plouc"} />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
