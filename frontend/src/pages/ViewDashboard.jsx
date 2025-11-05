import React, { useState, useEffect } from 'react';
import DashboardNavbar from "../components/DashboardNavbar";

import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import Filter from '../components/Filter';
import Card from '../components/Card';
import { useAuth } from "../store/auth"; 


export default function ViewDashboard() {

  
  const { user } = useAuth();
  const cardCache = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);
  const [filtercards, setfiltercards] = useState([]);
  const [filterData, setFilterData] = useState([]); // ✅ defined properly

  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("scet-user");
  navigate("/");
};


  const [activefilters, setactivefilters] = useState([
    { type: "Domain", options: [] },
    { type: "Company", options: [] },
    { type: "Year", options: [] },
    { type: "Type", options: [] }
  ]);

  // ✅ 1. Fetch internships data
 useEffect(() => {
  const fetchData = async () => {
    try {
      if (!cardCache.current) {
        const res = await fetch("http://localhost:5000/api/internships");
        const data = await res.json();
        console.log("✅ cards from API:", data);
        cardCache.current = data.data;
      }

      setCards(cardCache.current);
      setfiltercards(cardCache.current);
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  fetchData();
}, []);


  // ✅ 2. Fetch filters
 useEffect(() => {
  const fetchFilters = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/filters");
      const data = await res.json();
      console.log("Filters:", data); // ✅ Shows object directly with keys

      setFilterData([
        {
          id: "Domain",
          name: "Domain",
          options: data.domainOptions.map((d) => ({
            label: d,
            value: d,
          })),
        },
        {
          id: "Company",
          name: "Company",
          options: data.companyOptions.map((c) => ({
            label: c,
            value: c,
          })),
        },
        {
          id: "Year",
          name: "Year",
          options: data.yearOptions.map((y) => ({
            label: y,
            value: y,
          })),
        },
        {
          id: "Type",
          name: "Type",
          options: [
            { label: "Internship", value: "Internship" },
            { label: "Research Project", value: "Research Project" },
          ],
        },
      ]);
    } catch (error) {
      console.error("❌ Error fetching filters:", error);
    }
  };

  fetchFilters();
}, []);


  // ✅ 3. Apply filters + search
useEffect(() => {
  if (!Array.isArray(cards)) {
    console.error("❌ cards is not an array:", cards);
    return;
  }

  const filtered = cards.filter((card) => {
    const matchesFilters = activefilters.every((filter) => {
  if (filter.options.length === 0) return true;

  const field = filter.type.toLowerCase();

  // ✅ Special handling for Year filter
  if (field === "year") {
    const cardYear = new Date(card.startDate).getFullYear();
    return filter.options.includes(cardYear);
  }

  const cardValue = String(card[field] || '').toLowerCase();
  return filter.options.some((opt) => String(opt).toLowerCase() === cardValue);
});

    const matchesSearch = (() => {
      if (!searchText.trim()) return true;
      const keywords = searchText.toLowerCase().split(/\s+/);
      const searchableValues = Object.values(card)
        .map((val) => String(val).toLowerCase())
        .join(" ");
      return keywords.some((word) => searchableValues.includes(word));
    })();

    return matchesFilters && matchesSearch;
  });

  setfiltercards(filtered);
}, [activefilters, cards, searchText]);

  return (
    <div className='bg-gray-300 min-h-screen'>
      {user && (
  <DashboardNavbar 
    searchText={searchText} 
    setSearchText={setSearchText}  
    userEmail={user.email}  
    onLogout={handleLogout} 
  />
)}

      


      {/* ✅ Mobile Filter */}
      <div className="md:hidden overflow-x-auto px-4 py-3 bg-white shadow-sm">
        <div className="flex flex-nowrap gap-4">
          {filterData.map((section) => (
            <div key={section.id} className="min-w-[130px] flex-shrink-0">
              <label className="text-xs font-medium text-gray-600 block mb-1">
                {section.name}
              </label>
              <select
                value={activefilters.find((f) => f.type === section.id)?.options[0] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = activefilters.map((filter) => {
                    if (filter.type === section.id) {
                      return {
                        ...filter,
                        options: value ? [value] : [],
                      };
                    }
                    return filter;
                  });
                  setactivefilters(updated);
                }}
                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All</option>
                {section.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Desktop Layout */}
      <div className="flex flex-col md:flex-row px-4 mt-4 gap-4">
        {/* Sidebar Filter */}
        <div className="md:block hidden md:w-1/4 w-full md:pr-4 mb-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
              <button
                type="button"
                onClick={() => {
                  setactivefilters([
                    { type: "Domain", options: [] },
                    { type: "Company", options: [] },
                    { type: "Year", options: [] },
                    { type: "Type", options: [] },
                  ]);
                  setfiltercards(cards);
                }}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Reset
              </button>
            </div>

            <form>
              {filterData.map((section, sectionidx) => (
                <Filter
                  key={section.id}
                  section={section}
                  sectionidx={sectionidx}
                  activefilters={activefilters}
                  setactivefilters={setactivefilters}
                  activefilteroptions={
                    activefilters.find((af) => af.type === section.id)?.options || []
                  }
                />
              ))}
            </form>
          </div>
        </div>

        {/* ✅ Cards Section */}
        <div className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(filtercards) && filtercards.length > 0 ? (
            filtercards.map((card) => <Card key={card._id} card={card} />)
          ) : (
            <div className="col-span-full text-center text-gray-600 p-4">No data found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
