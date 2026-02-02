import Skeleton from "react-loading-skeleton";

const DietaryBadges = ({ dietaryRestrictions, loading = false }) => {
  if (loading) {
    return (
      <div className="dietary-badges">
        <Skeleton width={70} height={24} style={{ marginRight: "8px" }} />
        <Skeleton width={80} height={24} style={{ marginRight: "8px" }} />
        <Skeleton width={75} height={24} />
      </div>
    );
  }

  if (!dietaryRestrictions || dietaryRestrictions.length === 0) {
    return null;
  }

  return (
    <div className="dietary-badges">
      {dietaryRestrictions.map((restriction, index) => (
        <span key={index} className="dietary-badge">
          {restriction}
        </span>
      ))}
    </div>
  );
};

export default DietaryBadges;
