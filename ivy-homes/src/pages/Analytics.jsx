import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Analytics() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListings() {
      try {
        const allListings = [];
        let offset = 0;
        const limit = 50;

        while (true) {
          const response = await api.get("/v1/listings/", {
            params: {
              limit,
              offset,
            },
          });

          const results = response.data.results || [];

          allListings.push(...results);

          if (!response.data.has_more || results.length === 0) {
            break;
          }

          offset += results.length;
        }

        setListings(allListings);
      } catch (err) {
        console.error(err);
        setError("Unable to load analytics data.");
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  const analytics = useMemo(() => {
    if (!listings.length) {
      return null;
    }

    const liveListings = listings.filter(
      (listing) => listing.is_live === true
    );

    const validPrices = liveListings.filter(
      (listing) =>
        Number.isFinite(Number(listing.price)) &&
        Number(listing.price) > 0
    );

    const validAreas = liveListings.filter(
      (listing) =>
        Number.isFinite(Number(listing.carpet_area)) &&
        Number(listing.carpet_area) > 0
    );

    const averagePrice =
      validPrices.length > 0
        ? validPrices.reduce(
            (sum, listing) => sum + Number(listing.price),
            0
          ) / validPrices.length
        : 0;

    const averageArea =
      validAreas.length > 0
        ? validAreas.reduce(
            (sum, listing) => sum + Number(listing.carpet_area),
            0
          ) / validAreas.length
        : 0;

    const bhkCounts = {};

    liveListings.forEach((listing) => {
      const bhk = Number(listing.bedroom);

      if (Number.isFinite(bhk) && bhk > 0) {
        bhkCounts[bhk] = (bhkCounts[bhk] || 0) + 1;
      }
    });

    const propertyTypeCounts = {};

    liveListings.forEach((listing) => {
      const type = listing.property_type || "unknown";

      propertyTypeCounts[type] =
        (propertyTypeCounts[type] || 0) + 1;
    });

    const localityCounts = {};

    liveListings.forEach((listing) => {
      const locality = listing.locality || "unknown";

      localityCounts[locality] =
        (localityCounts[locality] || 0) + 1;
    });

    const furnishingCounts = {};

    liveListings.forEach((listing) => {
      const furnishing = listing.furnishing || "unknown";

      furnishingCounts[furnishing] =
        (furnishingCounts[furnishing] || 0) + 1;
    });

    const twoBhkListings = liveListings.filter(
      (listing) =>
        Number(listing.bedroom) === 2 &&
        Number(listing.price) > 0 &&
        Number(listing.carpet_area) > 0
    );

    const averageTwoBhkPricePerSqft =
      twoBhkListings.length > 0
        ? twoBhkListings.reduce(
            (sum, listing) =>
              sum +
              Number(listing.price) /
                Number(listing.carpet_area),
            0
          ) / twoBhkListings.length
        : 0;

    const topLocalities = Object.entries(localityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topPropertyTypes = Object.entries(propertyTypeCounts)
      .sort((a, b) => b[1] - a[1]);

    const topBhk = Object.entries(bhkCounts)
      .sort((a, b) => Number(a[0]) - Number(b[0]));

    return {
      total: listings.length,
      live: liveListings.length,
      inactive: listings.length - liveListings.length,
      averagePrice,
      averageArea,
      averageTwoBhkPricePerSqft,
      topLocalities,
      topPropertyTypes,
      topBhk,
      furnishingCounts,
    };
  }, [listings]);

  function formatPrice(value) {
    if (!value) {
      return "₹0";
    }

    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }

    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  }

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          Loading market insights...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="analytics-error">
          {error}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="analytics-page">
        <div className="analytics-empty">
          No analytics data available.
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <p className="analytics-eyebrow">
            MARKET INSIGHTS
          </p>

          <h1>Property Analytics</h1>

          <p>
            Insights calculated from the available listing
            dataset.
          </p>
        </div>
      </div>

      {/* Main statistics */}

      <div className="analytics-stats">
        <div className="analytics-stat-card">
          <span>Total Listings</span>
          <strong>
            {analytics.total.toLocaleString("en-IN")}
          </strong>
          <small>Records available</small>
        </div>

        <div className="analytics-stat-card">
          <span>Live Listings</span>
          <strong>
            {analytics.live.toLocaleString("en-IN")}
          </strong>
          <small>
            {(
              (analytics.live / analytics.total) *
              100
            ).toFixed(1)}
            % of total
          </small>
        </div>

        <div className="analytics-stat-card">
          <span>Inactive Listings</span>
          <strong>
            {analytics.inactive.toLocaleString("en-IN")}
          </strong>
          <small>Currently not live</small>
        </div>

        <div className="analytics-stat-card">
          <span>Average Price</span>
          <strong>
            {formatPrice(analytics.averagePrice)}
          </strong>
          <small>Live listings</small>
        </div>

        <div className="analytics-stat-card">
          <span>Average Carpet Area</span>
          <strong>
            {Math.round(
              analytics.averageArea
            ).toLocaleString("en-IN")}
          </strong>
          <small>sq ft</small>
        </div>

        <div className="analytics-stat-card highlight">
          <span>2 BHK Price / Sq Ft</span>
          <strong>
            ₹
            {Math.round(
              analytics.averageTwoBhkPricePerSqft
            ).toLocaleString("en-IN")}
          </strong>
          <small>Average for live 2 BHK listings</small>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Property types */}

        <section className="analytics-panel">
          <div className="analytics-panel-header">
            <h2>Property Types</h2>
            <span>Live listings</span>
          </div>

          <div className="analytics-list">
            {analytics.topPropertyTypes.map(
              ([type, count]) => {
                const percentage =
                  (count / analytics.live) * 100;

                return (
                  <div
                    className="analytics-row"
                    key={type}
                  >
                    <div className="analytics-row-top">
                      <span>{type}</span>
                      <strong>{count}</strong>
                    </div>

                    <div className="analytics-bar">
                      <div
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* BHK distribution */}

        <section className="analytics-panel">
          <div className="analytics-panel-header">
            <h2>BHK Distribution</h2>
            <span>Live listings</span>
          </div>

          <div className="bhk-grid">
            {analytics.topBhk.map(([bhk, count]) => (
              <div className="bhk-card" key={bhk}>
                <strong>{bhk} BHK</strong>
                <span>
                  {count.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Localities */}

        <section className="analytics-panel">
          <div className="analytics-panel-header">
            <h2>Top Localities</h2>
            <span>By listing count</span>
          </div>

          <div className="analytics-list">
            {analytics.topLocalities.map(
              ([locality, count], index) => (
                <div
                  className="locality-row"
                  key={locality}
                >
                  <div className="locality-rank">
                    {index + 1}
                  </div>

                  <div className="locality-name">
                    {locality}
                  </div>

                  <strong>{count}</strong>
                </div>
              )
            )}
          </div>
        </section>

        {/* Furnishing */}

        <section className="analytics-panel">
          <div className="analytics-panel-header">
            <h2>Furnishing</h2>
            <span>Live listings</span>
          </div>

          <div className="furnishing-grid">
            {Object.entries(
              analytics.furnishingCounts
            ).map(([type, count]) => (
              <div
                className="furnishing-card"
                key={type}
              >
                <span>{type}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* API status */}

      
    </div>
  );
}