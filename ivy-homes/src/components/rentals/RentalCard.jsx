export default function RentalCard({ rental }) {
  return (
    <article className="rental-card">
      <h3>{rental.apartment_name || "Rental Property"}</h3>

      <p>
        {rental.bedroom} BHK
      </p>

      <p>{rental.locality}</p>

      <div className="rental-price">
        ₹{Number(rental.price || 0).toLocaleString("en-IN")}
        /month
      </div>

      {rental.furnishing && (
        <p>{rental.furnishing}</p>
      )}
    </article>
  );
}