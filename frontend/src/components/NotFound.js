import React, { useEffect, useState } from "react";

const NotFound = ({ short_id }) => {
  const [longUrl, setLongUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://url-shortner-backend-himanshu-aroras-projects.vercel.app/api/urls/getLongUrl/${short_id}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Error fetching data:", data.error);
          setLoading(false);
        }

        if (data.long_url) {
          setLongUrl(data.long_url);
          console.log(data.long_url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [short_id]);

  useEffect(() => {
    // Redirect to the long_url when it is available
    if (longUrl) {
      window.location.href = longUrl;
    }
  }, [longUrl]);

  return (
    <div className="not-found">
      {longUrl && <h1>Redirecting...</h1>}
      {!loading && !longUrl && <h1>404! That Page Doesn't Exist</h1>}
    </div>
  );
};

export default NotFound;
