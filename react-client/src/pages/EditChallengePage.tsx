// src/components/pages/EditChallengePage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Challenge } from "../types/types";

const EditChallengePage: React.FC<{
  challenges: Challenge[];
  onUpdateChallenge: (updatedChallenge: Challenge) => void;
}> = ({ challenges, onUpdateChallenge }) => {
  const navigate = useNavigate();

  const challenge = challenges.find(
    (challenge) => challenge.id,
  ); // Added a fallback to '0'

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (challenge) {
      setTitle(challenge.title);
      setDescription(challenge.description);
    }
  }, [challenge]);

  const handleSave = () => {
    if (challenge) {
      onUpdateChallenge({ ...challenge, title, description });
      navigate("/challenges");
    }
  };

  return (
    <div className="p-6">
      <h2>Edit Challenge</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Challenge Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Challenge Description"
      />

      <button onClick={handleSave} className="bg-blue-500 text-white p-2">
        Save
      </button>
    </div>
  );
};

export default EditChallengePage;
