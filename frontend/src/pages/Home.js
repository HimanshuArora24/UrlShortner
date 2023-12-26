import { useEffect } from "react";
import { useUrlsContext } from "../hooks/useUrlContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import UrlDetails from '../components/UrlDetails';
import UrlAddtionForm from '../components/UrlAdditionForm';

const Home = () => {
  const { urls, dispatch } = useUrlsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchUrls = async () => {
      const response = await fetch('https://url-shortner-backend-himanshu-aroras-projects.vercel.app/api/urls', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'SET_URLS', payload: json})
      }
    }

    if(user){
      fetchUrls()
    }
    
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="urls">
        {urls && urls.map(url => (
          <UrlDetails url={url} key={url._id} />
        ))}
      </div>
      <UrlAddtionForm />
    </div>
  )
}

export default Home;