import { useUrlsContext } from "../hooks/useUrlContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useState } from "react";

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

const UrlDetails = ({ url }) => {
  const { dispatch } = useUrlsContext();
  const { user } = useAuthContext();
  const [toolTipMessage, setToolTipMessage] = useState("Copy");

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://url-shortner-backend-himanshu-aroras-projects.vercel.app/api/urls/" + url._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_URL", payload: json });
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(url.short_url);
    setToolTipMessage("Copied!");
    setTimeout(() => {
      setToolTipMessage("Copy");
    }, 2000);
  };

  return (
    <div className="url-details">
      <h4>{url.title}</h4>
      <p>
        <strong>Shortened Url: </strong>
        {url.short_url}
        <OverlayTrigger
          key={"top"}
          placement={"top"}
          overlay={
            <Tooltip
              id={`tooltip-${"top"}`}
              style={{
                backgroundColor: "#333333",
                color: "white",
                padding: "6px 10px",
                borderRadius: "8px",
                fontFamily: "Poppins",
                fontSize: "12px",
                width: "40px",
                height: "20px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {toolTipMessage}
            </Tooltip>
          }
        >
          <button
            onClick={copyToClipBoard}
            data-toggle="tooltip"
            data-placement="top"
            className="btn btn-outline-secondary copybtn"
            type="button"
          >
            <img src="/copy.svg" alt="Copy" style={{ cursor: "pointer" }} />
          </button>
        </OverlayTrigger>
      </p>
      <p>
        <strong>Original Url: </strong>
        {url.long_url}
      </p>
      <p>
        {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>
        <img src="/trashcan.svg" alt="Delete" style={{ cursor: "pointer" }} />
      </span>
    </div>
  );
};

export default UrlDetails;
