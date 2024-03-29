import { CLD_ID } from "../utils/constants";

const RestaurantCard = (resData) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    area,
    deliveryTime,
    costForTwoString,
    avgRating,
  } = resData;

  return (
    <div className="res-card">
      <img className="res-logo" src={CLD_ID + cloudinaryImageId} />
      <div className="resDetails">
        <h3>{name}</h3>
        <h4>{cuisines.join(" , ")}</h4>
        <h4>{costForTwoString}</h4>
        <h4>{area}</h4>
        <h4>
          {deliveryTime} minutes {avgRating} ⭐ ratings
        </h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
