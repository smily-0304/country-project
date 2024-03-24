import React, { useContext, useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import { SearchContext } from "../Pages/Home";
import { Pagination } from "@mui/material";

function Filterdata() {
  const { userInput, regionChoice, apiData } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 12;

  useEffect(() => {
    const filtered = apiData.filter((country) => {
      const name = country.name.common.toLowerCase();
      const input = userInput.toLowerCase();
      return (
        name.startsWith(input) &&
        (regionChoice === "" || country.region === regionChoice)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [userInput, regionChoice, apiData]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = filteredData
    .slice(startIndex, endIndex)
    .map((country, index) => (
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
          <p>
            No countries found matching your input or filter. Please try
            something different.
          </p>
        </div>
      ) : (
        <>
          {displayedData}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div>
              {!userInput && (
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="secondary"
                  variant="outlined"
                  shape="rounded"
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 9999,
                    "& .MuiPaginationItem-root": {
                      fontWeight: "bold",
                      color: "black",
                      backgroundColor: "white",
                      width: "60px",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "white",
                      color: "blue",
                    },
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Filterdata;
