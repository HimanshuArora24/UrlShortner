import React, { useEffect, useState } from "react";

const NotFound = ({ short_id }) => {
  const [longUrl, setLongUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/urls/getLongUrl/${short_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.long_url) {
          setLongUrl(data.long_url);
          console.log(longUrl);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [longUrl, short_id]);

  useEffect(() => {
    // Redirect to the long_url when it is available
    if (longUrl) {
      window.location.href = longUrl;
    }
  }, [longUrl]);

  return (
    <div className="not-found">
      {longUrl && <h1>Redirecting...</h1>}
      {!longUrl && <h1>404! That Page Doesn't Exist</h1>}
    </div>
  );
};

export default NotFound;
