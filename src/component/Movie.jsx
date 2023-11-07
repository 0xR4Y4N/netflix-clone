import React,{useState,useEffect} from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {UserAuth} from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, getDoc, updateDoc,arrayRemove } from 'firebase/firestore';

const Movie = ({item}) => {
  const [like, setLike] = useState(false);
  const { user } = UserAuth();
  const [saved, setSaved] = useState(false);
  const movieID = doc(db, 'users', `${user?.email}`);

  // Fetch liked movies for the current user from the database when the component mounts
  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (user?.email) {
        const movieID = doc(db, 'users', `${user.email}`);
        const docSnap = await getDoc(movieID);
        if (docSnap.exists()) {
          const likedMovies = docSnap.data().savedShows.map(show => show.id);
          setLike(likedMovies.includes(item.id));
        }
      }
    };

    fetchLikedMovies();
  }, [item.id, user?.email]);
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      // Update liked movies in the database
      await updateDoc(movieID, {
        savedShows: !like
          ? arrayUnion({ id: item.id, title: item.title, img: item.backdrop_path })
          : // Remove the movie from the savedShows array if it was liked previously
            arrayRemove({ id: item.id, title: item.title, img: item.backdrop_path }),
      });
    } else {
      alert('Please log in to save a movie');
    }
  };

    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
          <img
            className='w-full h-auto block'
            src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
            alt={item?.title}
          />
          <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
            <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
              {item?.title}
            </p>
            <p onClick={saveShow}>
              {like ? (
                <FaHeart className='absolute top-4 left-4 text-gray-300' />
              ) : (
                <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
              )}
            </p>
          </div>
        </div>
      );
}

export default Movie