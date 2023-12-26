import { useState } from "react";
import { useUrlsContext } from "../hooks/useUrlContext";
import { useAuthContext } from "../hooks/useAuthContext";

const UrlForm = () => {
  const { dispatch } = useUrlsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [preferred_alias, setPreferredAlias] = useState("");
  const [long_url, setLongUrl] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const url = {
      title,
      ...(preferred_alias && { preferred_alias }),
      long_url,
    };

    const response = await fetch(
      "https://url-shortner-backend-himanshu-aroras-projects.vercel.app/api/urls/createShortUrl",
      {
        method: "POST",
        body: JSON.stringify(url),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setPreferredAlias("");
      setLongUrl("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_URL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add URL to shorten</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Url:</label>
      <input
        type="text"
        onChange={(e) => setLongUrl(e.target.value)}
        value={long_url}
        className={emptyFields.includes("long_url") ? "error" : ""}
      />

      <label>Preferred Alias (If Any):</label>
      <input
        type="text"
        onChange={(e) => setPreferredAlias(e.target.value)}
        value={preferred_alias}
        className={emptyFields.includes("preferred_alias") ? "error" : ""}
      />

      <button>Shorten URL</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UrlForm;
