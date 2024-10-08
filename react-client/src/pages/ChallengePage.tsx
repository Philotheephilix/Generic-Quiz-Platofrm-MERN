import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Challenge } from "../types/types";
import { API_URL } from "../services/api/constant";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import "../styles/index.css";

const ChallengePage: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flag, setFlag] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`${API_URL}/challenges/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token") || "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch challenge");
        }
        const data = await response.json();
        setChallenge(data);
      } catch (err) {
        setError("Error fetching challenge data");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleFlagSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset previous status

    try {
      const response = await fetch(`${API_URL}/verify/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({ flag }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit flag");
      }

      const result = await response.json();
      alert("Flag submitted successfully!");
      navigate(-1);
    } catch (err) {
      setSubmissionStatus("Wrong flag");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br text-2xl glow-text text-white font-bold from-gray-800 to-gray-600 flex items-center justify-center">
        Loading...
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!challenge) return <div>Challenge not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center text-blue-500 font-bold"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2 text-white" />
          <span className="text-white glow-text text-xl">Back</span>
        </div>
        <br></br>
        <h1 className="text-2xl font-bold text-white mb-2">
          {challenge.title}
        </h1>
        {challenge.imageUrl && (
          <img src={challenge.imageUrl} alt="Challenge" className="my-4" />
        )}
        <p className="text-white mb-4">{challenge.description}</p>
        <p className="text-white font-bold glow-text">
          Points: {challenge.points}
        </p>
        <form onSubmit={handleFlagSubmission} className="mt-4">
          <input
            type="text"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            placeholder="Flag format: FLAG{...}"
            className="border p-2 w-full"
            required
          />
          <br></br>
          <button
            type="submit"
            className="bg-gray hover:bg-white text-white hover:text-black font-bold glow-button p-2 mt-2 w-full rounded"
          >
            Submit Flag
          </button>
        </form>
        {submissionStatus && <div className="mt-4">{submissionStatus}</div>}
      </div>
    </div>
  );
};
export default ChallengePage;

