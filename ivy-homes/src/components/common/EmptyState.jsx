export default function EmptyState({ message = "No results found." }) {
  return (
    <div className="empty-state">
      <p>{message}</p>
    </div>
  );
}