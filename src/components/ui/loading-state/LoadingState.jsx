import './LoadingState.css';

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="container loading-state-container">
      <h2>{message}</h2>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingState;
