import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { SWIGGY_API } from "../utils/constants";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantData, setRestaurantList] = useState([]);
  const [filteredRestaurants,setFilteredRestaurants] = useState([]);
  const [textSearch, settextSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const json = await data.json();

    setRestaurantList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h1>No internet!!!!!!!!!!</h1>

  return restaurantData.length === 0 ? <Shimmer/> :
   (
    <div className="m-4 p-4">
      <div className="flex p-4 m-4 justify-center gap-8">
        <div>
          <input type="text" className="border w-64 h-10" value={textSearch} onChange={(e)=>{
            settextSearch(e.target.value);
          }}></input>
          <button className="p-2 bg-gray-400 rounded hover:bg-gray-300 hover:transform hover:scale-95" onClick={()=>{
            const filteredRestaurants = restaurantData.filter( (res) =>
                res.info.name.toLowerCase().includes(textSearch.toLowerCase()) ||
                res.info.locality.toLowerCase().includes(textSearch.toLowerCase())
            );
            setFilteredRestaurants(filteredRestaurants);
          }}>Search</button>
        </div>
        <div>
          <button
          className="bg-green-400 font-semibold text-black rounded p-2 hover:bg-yellow-500 hover:transform hover:scale-95"
          onClick={() => {
            const filterRestaurantList = restaurantData.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurants(filterRestaurantList);
          }}
        >
          Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-8">
        {filteredRestaurants?.map((res) => {
          return <Link key={res.info.id} to={"/restaurantmenu/" + res.info.id}><RestaurantCard resData={res} /></Link>;
        })}
      </div>
    </div>
  );
};

export default Body;
