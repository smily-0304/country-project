import React, { useState, createContext } from "react";
import Filter from "../Components/Filter";
import Fetch from "../Components/Fetch";
import FooterOf from "../Components/Footer";


export const SearchContext = createContext();

function Home() {
  const [apiData, setApiData] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [apiError, setApiError] = useState(null);
  const [regionChoice, setRegionChoice] = useState("");

 return (
    <SearchContext.Provider
      value={{ userInput, setUserInput, regionChoice, setRegionChoice, apiData, setApiData, apiError, setApiError }}
    >
     <>
     <div className="home-page">
    

        <Filter />
        <Fetch />
      <FooterOf/>
      </div>
      </>
     </SearchContext.Provider>
     
    
  );
}

export default Home;

