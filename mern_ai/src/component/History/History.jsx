import React, { useState, useEffect, useContext } from 'react'
import styles from './History.module.css';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';
const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userInfo } = useContext(AuthContext);
  useEffect(() => {
    if (!userInfo?._id) return;

    const fetchUserData = async () => {
      setLoader(true);
      try {
        const results = await axios.get(`/api/resume/get/${userInfo._id}`);
        setData(results.data.resumes);
      } catch (err) {
        console.log(err);
        alert("Something went Wrong");
      } finally {
        setLoader(false);
      }
    };

    fetchUserData();
  }, [userInfo]);
  return (
    <div className={styles.History}>
      <div className={styles.HistoryCardBlock}>

        {
          loader && 
          <>
          <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={266} height={200} />
          <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={266} height={200} />
          <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={266} height={200} />
          <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={266} height={200} />
          </>
        }

        {
          data.map((item, index) => {
            return (
              <div key={item._id} className={styles.HistoryCard}>
                <div className={styles.cardPersentage}>{item.score}%</div>
                <h2>Frontend</h2>
                <p>Resume Name: {item.resume_name}</p>
                <p>
                  {item.feedback}
                </p>
                <p>Dated : {item.createdAt.slice(0,10)}</p>
              </div>

            )
          })
        }

      </div>
    </div>
  )
}

export default WithAuthHOC(History)