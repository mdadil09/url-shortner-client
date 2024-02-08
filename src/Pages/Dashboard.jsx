/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { UrlState } from "../context/UrlProvider";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import UpdateModal from "../components/updateModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [urlData, setUrlData] = useState([]);
  const [url, setUrl] = useState("");
  const [urlId, setUrlId] = useState();
  const { user } = UrlState();

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (id) => {
    setUrlId(id);
    setIsOpen(true);
  };

  const fetchURL = async () => {
    try {
      const token = user?.token;

      if (user) {
        const result = await axios.get(`${BASE_URL}api/urlShortner/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUrlData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateURL = async () => {
    try {
      const token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await axios.patch(
        `${BASE_URL}api/urlShortner/update/${urlId}`,
        { url },
        config
      );
      setIsOpen(false);
      toast.success("URL Updated Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteURL = async (id) => {
    try {
      const token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await axios.delete(
        `${BASE_URL}api/urlShortner/delete/${id}`,
        config
      );

      setUrlData(urlData.filter((link) => link._id !== id));
      toast.success("URL deleted Successfully!");
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

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        {user ? (
          <div className="dashboard-data">
            <h3>My URL</h3>
            <table className="link-table">
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>URL</th>
                  <th>Clicks</th>
                  <th>Copy</th>
                  <th>Update</th>
                  <th>Delete</th>
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
                    <td>{link.visitHistory.length}</td>
                    <td>
                      {" "}
                      <button
                        className="copy-btn"
                        onClick={() =>
                          copyLinkToClipboard(BASE_URL + link.shortId, index)
                        }
                      >
                        {link.copied === true ? "Copied" : "Copy"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => openModal(link._id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="del-btn"
                        onClick={() => deleteURL(link._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="dash-btn">
            <Link to="/login" className="btn">
              Sign In
            </Link>
          </div>
        )}
        <UpdateModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          url={url}
          setUrl={setUrl}
          updateURL={updateURL}
        />
      </div>
    </div>
  );
};

export default Dashboard;
