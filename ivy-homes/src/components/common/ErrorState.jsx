export default function ErrorState({ message }) {
  return (
    <div className="error-state">
      <h3>Something went wrong</h3>
      <p>{message}</p>
    </div>
  );
}