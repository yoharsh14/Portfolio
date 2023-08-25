import { SlCalender } from "react-icons/sl";
import "./Experience.css";
import { useEffect, useState } from "react";

const Experience = ({ state }) => {
  const [experience, setExperience] = useState({});
  const [education, setEducation] = useState("");
  useEffect(() => {
    const { contract } = state;
    const educationHandler = async () => {
      const educationDetails = await contract.methods.allEducation().call();
      setEducation(educationDetails);
    };
    const experienceHandler = async () => {
      const experienceDetails = await contract.methods.allExperience().call();
      setExperience(experienceDetails);
    };
    contract && educationHandler() && experienceHandler();
  }, [state]);
  return (
    <section className="exp-section">
      <h1 className="title">Experience & Education </h1>

      <div className="container">
        <div className="education">
          <h1 className="edu-tittle">Education</h1>
          {education.length > 0 &&
            education.map((edu) => {
              return (
                <div className="edu-card">
                  <p className="card-text1">
                    <SlCalender className="icon" /> {edu.date}
                  </p>
                  <h3 className="card-text2">{edu.degree}</h3>
                  <p className="card-text3">{edu.knowledgeAcquired}</p>
                  <p className="card-text4">{edu.instutionName}</p>
                </div>
              );
            })}
        </div>
        <div className="education">
          <h1 className="edu-tittle">Experience</h1>
          {experience.length > 0 &&
            experience.map((exp) => {
              return (
                <div className="edu-card">
                  <p className="card-text1">
                    <SlCalender className="icon" /> {exp.duration}
                  </p>
                  <h3 className="card-text2">{exp.position}</h3>
                  <p className="card-text3">{exp.techStack}</p>
                  <p className="card-text4">{exp.company}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
