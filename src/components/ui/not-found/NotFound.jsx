import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = ({
  title = "Not Found",
  message = "The item you're looking for doesn't exist.",
  backLink = "/",
  backText = "Go Back"
}) => {
  return (
    <div className="container not-found-container">
      <h2>{title}</h2>
      <p>{message}</p>
      <Link to={backLink} className="btn btn-primary">{backText}</Link>
    </div>
  );
};

export default NotFound;
