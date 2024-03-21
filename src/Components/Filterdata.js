import React, { useContext, useState } from "react";
import CountryCard from "./CountryCard";
import { SearchContext } from "../Pages/Home";
import { Pagination } from "@mui/material";

function Filterdata() {
  const { userInput, regionChoice, apiData } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

 
  let filteredData = apiData.filter((country) => {
    const name = country.name.common.toLowerCase();
    const input = userInput.toLowerCase();
    return name.startsWith(input) && (regionChoice === "" || country.region === regionChoice);
  });


  const displayedData = filteredData.slice(startIndex, endIndex).map((country, index) => (
    <CountryCard
      key={index}
      flag={country.flags.png}
      name={country.name.common}
      population={country.population}
      region={country.region}
      capital={country.capital}
    />
  ));


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {displayedData.length === 0 ? (
        <div
          style={{
            color: "red",
            fontSize: "20px",
            textAlign: "center",
            letterSpacing: "0.7px",
            
          }}
        >
          <p>Not Country found matching your input or filter, please try something different.</p>
        </div>
      ) : (
        <>
          {displayedData}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <br/><br/>
           
          </div>
         <div>
         
         <div style={{marginLeft:"600px"}} >
          {/* <Pagination
              count={20}
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
              variant="outlined"
               shape="rounded"
               
               sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: "bold",        
                  color: "black", 
                  position:"relative",          
                  backgroundColor: "white",
                  width:"70px",
                  right:"270px",
                
                  
                 
                }
              }}
              
            /> */}
            <Pagination
  count={20}
  page={currentPage}
  onChange={handlePageChange}
  color="secondary"
  variant="outlined"
  shape="rounded"
  sx={{
    "& .MuiPaginationItem-root": {
      fontWeight: "bold",        
      color: "black", 
      position:"relative",          
      backgroundColor: "white",
      width:"70px",
      right:"270px",
      '&.Mui-selected': {
        backgroundColor:"blue",
        color: "white" 
      }
    }
  }}
/>

           


          </div>
         </div>
        </>
      )}
    </>
  );
}

export default Filterdata;
