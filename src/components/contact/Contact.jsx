import { useEffect, useState } from "react";
import "./Contact.css";

const Contact = ({ state }) => {
  const [resumeLink, setResumeLink] = useState("");
  useEffect(() => {
    const { contarct } = state;
    const resumeHandler = async () => {
      const res = await contarct.methods.resumeLink().call();
      setResumeLink(res);
      console.log(resumeLink);
    };
    contarct && resumeHandler();
  }, [state]);
  return (
    <section className="contact-section">
      <h1 className="title">Interested? Let's Get In Touch!</h1>
      <a
        href={resumeLink.length > 0 ? resumeLink : "https://pin.ski/459gjzU"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="downlodeBTN">View Resume</button>
      </a>
    </section>
  );
};

export default Contact;
