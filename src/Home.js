import { useState, useEffect } from 'react';
import BlogList from './BlogList';
    
const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true); 
    const [error, setError] = useState(null); 
    
    
    
    // useeffect used to run a function everytime the component renders 
    useEffect(() => {
        fetch("http://localhost:8000/blogs")
            .then(res => {
                if (!res.ok) {
                    throw Error("Couldn't fetch data for that resource.")
                }
                return res.json(); 
            })
            .then(data => {
                console.log(data);
                setBlogs(data);
                setIsPending(false);
                setError(false);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            })
    }, []); 
    
    return (
        <div className="home">
            {error && <div> {error} </div> }
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} />}
        </div>
     );
}
 
export default Home;