import React, { useContext, useState } from 'react'
import styles from './Dashboard.module.css';
import Suvajit from "../../assets/Suvajit.png";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';
const Dashboard = () => {
  const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("")

  const [result, setResult] = useState(null)

  const { userInfo } = useContext(AuthContext);

  const handleOnChangeFile = (e) => {

    const file = e?.target?.files?.[0];

    if (!file) {
      alert("No file selected");
      return;
    }

    setResumeFile(file);

    setUploadFileText(file.name);
  };


  const handleUpload = async () => {

    setResult(null);

    if (!jobDesc || !resumeFile) {
      alert("Please fill Job Description & Upload Resume");
      return;
    }

    if (!userInfo || !userInfo._id) {
      alert("User not logged in");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo._id);

    setLoading(true);

    try {

      const response = await axios.post(
        "/api/resume/addResume",
        formData
      );

      setResult(response.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeader}>
          <div className={styles.DashboardHeaderTitle}>Smart Resume Screening</div>
          <div className={styles.DashboardHeaderLargeTitle}>Resume Match Score</div>
        </div>

        <div className={styles.alertInfo}>
          <div>🔔 Important Instruction:</div>
          <div className={styles.dashboardInstruction}>
            <div> 📄Please paste te complete job description in the "Job Description" fild before submitting.</div>
            <div> ⏳Only PDF format(.pdf) resume are accepted </div>
          </div>
        </div>

        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>
            {uploadFiletext}
          </div>
          <div className={styles.DashboardInputField}>
            <label htmlFor='inputField' className={styles.analyzeAIBtn}>Uplod Resume</label>
            <input type='file' accept=".pdf" id='inputField' onChange={handleOnChangeFile} />
          </div>
        </div>

        <div className={styles.jobdesc}>
          <textarea value={jobDesc} onChange={(e) => { setJobDesc(e.target.value) }} className={styles.textarea} placeholder='Paste Your Job Description' rows={10} cols={50} />

          <div className={styles.AnalyzeBtn} onClick={handleUpload}>Analyze</div>
        </div>
      </div>

      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopcard}>
          <div>Analyze With AI</div>


          <img
            src={userInfo?.photoUrl}

            className={styles.profileImg}
          />
          <h2>{userInfo?.name}</h2>
        </div>

        {
          result && <div className={styles.DashboardRightTopcard}>
            <div>Result</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
              <h1>{result?.score}%</h1>
              <CreditScoreIcon sx={{ fontSize: 22 }} />
            </div>

            <div className={styles.feedback}>
              <h3>Feedback</h3>
              <p>
                {result?.feedback}
              </p>
            </div>
          </div>
        }
        {
          loading && <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
        }
      </div>
    </div>
  )
}

export default WithAuthHOC(Dashboard)