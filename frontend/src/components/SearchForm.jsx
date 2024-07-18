import React, { useState } from 'react';
import axios from 'axios';
import './form.css'
import logo from '../assets/CL-logo.png'

const SearchForm = () => {
    const [textBoxQuery, setTextBoxQuery] = useState('');
    const [keyword1, setKeyword1] = useState('');
    const [keyword2, setKeyword2] = useState('');
    const [excludeWord, setExcludeWord] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3001/search', {
                params: {
                    textBoxQuery,
                    keyword1,
                    keyword2,
                    excludeWord
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    return (
      <>
        <div className="flex flex-row w-screen overflow-x-hidden">
          <img
            className=" ml-[2rem] mt-[1rem] cursor-pointer inline-block"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="mx-40 pb-20 pt-8 overflow-x-hidden">
          <form
            className="flex justify-between mb-20 bg-white p-4 shadow-lg rounded-lg"
            onSubmit={handleSearch}
          >
            <div className="flex-1">
              <input
                type="text"
                value={textBoxQuery}
                onChange={(e) => setTextBoxQuery(e.target.value)}
                className="text-black w-full p-4 rounded-l-lg border-t border-l border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search the web"
              />
            </div>
            <div className="flex-1">
              <select
                value={keyword1}
                onChange={(e) => setKeyword1(e.target.value)}
                className="w-full p-4 border-t border-l border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Category</option>
                <option value="Awards">Awards</option>
                <option value="Conferences">Conferences</option>
                <option value="Journals">Journals</option>
                <option value="Judging">Judging</option>
                <option value="Membership">Membership</option>
                <option value="Speaker">Speaker</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={keyword2}
                onChange={(e) => setKeyword2(e.target.value)}
                className="w-full p-4 border-t border-l border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Feild</option>
                <option value="Data">Data</option>
                <option value="Technology">Technology</option>
                <option value="Fintech">Fintech</option>
                <option value="Cloud">Cloud</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Biomedicals">Biomedicals</option>
                <option value="Aviation">Aviation</option>
                <option value="Engineering">Engineering</option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Business">Business</option>
                <option value="Business Intelligence">
                  Business Intelligence
                </option>
                <option value="Telecom">Telecom</option>
                <option value="Computer Network">Computer Network</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={excludeWord}
                onChange={(e) => setExcludeWord(e.target.value)}
                className="w-full p-4 border-t border-l border-b border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-lg"
              >
                <option value="none">Exclude Word</option>
                <option value="closed">closed</option>
                <option value="Expired">Expired</option>
                <option value="Non-technical">Non-technical</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white p-4 rounded-lg ml-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </form>
          <div className="results">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-separate space-y-6 border-spacing-y-2">
                <thead className="shadow-md">
                  <tr className="bg-blue-100 text-black">
                    <th className="w-1/4 px-4 py-2 border border-gray bg-blue-100">
                      Title
                    </th>
                    <th className="w-1/4 px-4 py-2 border border-gray bg-blue-100">
                      Link
                    </th>
                    <th className="w-1/4 px-4 py-2 border border-gray bg-blue-100">
                      Submission Status
                    </th>
                    <th className="w-1/4 px-4 py-2 border border-gray bg-blue-100">
                      Expiry Dates
                    </th>
                  </tr>
                </thead>
                <tbody className="shadow-md">
                  {results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4  py-2">{result.title}</td>
                      <td className="border px-4 text-justify text-wrap py-2">
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-500 text-wrap hover:underline"
                        >
                          {result.link}
                        </a>
                      </td>
                      <td className="border px-4 py-2">
                        {result.submissionLinks &&
                        result.submissionLinks.length > 0 ? (
                          result.submissionLinks.map((link, idx) => (
                            <div key={idx}>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 text-wrap hover:underline"
                              >
                                {link}
                              </a>
                            </div>
                          ))
                        ) : (
                          <p>Submission link not found</p>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {result.expiryDates.length > 0 ? (
                          <ul>
                            {result.expiryDates.map((date, i) => (
                              <li key={i}>{date}</li>
                            ))}
                          </ul>
                        ) : (
                          "No expiry dates found"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
};

export default SearchForm;
