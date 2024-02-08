/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { UrlState } from "../context/UrlProvider";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, loggedIn } = UrlState();
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState([]);

  const handleSubmit = async () => {
    try {
      const token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await axios.post(
        `${BASE_URL}api/urlShortner/`,
        { url },
        config
      );
      fetchURL();
      toast.success("URL Generated Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchURL = async () => {
    try {
      const token = user?.token;
      const result = await axios.get(`${BASE_URL}api/urlShortner/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUrlData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const copyLinkToClipboard = async (link, index) => {
    try {
      await navigator.clipboard.writeText(link);
      const updatedUrlData = [...urlData];
      updatedUrlData[index].copied = true;
      setUrlData(updatedUrlData);
      setTimeout(() => {
        updatedUrlData[index].copied = false;
        setUrlData(updatedUrlData);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchURL();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>
          Empower Your Links, Unleash Your Impact –{" "}
          <span style={{ color: "tomato" }}>BoniUrl</span>,<br></br> Where Every
          Link Tells a Heroic Tale
        </h1>
        <p>
          Create short links, Link-in-bio pages. Share them anywhere.<br></br>{" "}
          Track what’s working, and what’s not.{" "}
        </p>
      </div>
      <div className="container">
        <div className="form-container">
          <div className="form">
            <h1>Shorten a long URL</h1>
            <div className="input-group">
              <div className="input-label">
                {" "}
                <label>Paste a long URL</label>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Example: https://super-long-link.com/jibrish"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="input-btn">
                {loggedIn === true ? (
                  <button className="btn" onClick={handleSubmit}>
                    Get Your URL
                  </button>
                ) : (
                  <Link to="/signup">Sign Up and get your URL</Link>
                )}
              </div>
            </div>
          </div>
          <div className="view-url">
            {user ? (
              <table className="link-table">
                <thead>
                  <tr>
                    <th>Serial No</th>
                    <th>URL</th>
                    <th>Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {urlData.map((link, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {BASE_URL}
                        {link.shortId}
                      </td>
                      <td>
                        <button
                          className="copy-btn"
                          onClick={() =>
                            copyLinkToClipboard(BASE_URL + link.shortId, index)
                          }
                        >
                          {link.copied === true ? "Copied" : "Copy"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
