import { useState, useEffect } from "react";
import { apiGetTrips, apiStartTrip, apiFinishTrip } from "./api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const useTrips = () => {
  const [tripsPending, setTripsPending] = useState([]);
  const [tripsStarted, setTripsStarted] = useState([]);
  const [tripsCompleted, setTripsCompleted] = useState([]);
  const { data: sessionData } = useSession();
  const city = sessionData?.user?.city;

  const fetchTrips = async () => {
    if (!city) return;
    try {
      console.log(city.id)
      const { data } = await apiGetTrips(city.id);
      setTripsPending(data[0]);
      setTripsStarted(data[1]);
      setTripsCompleted(data[2]);
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [sessionData]);

  const startTrip = async (tripId) => {
    try {
      const result = await apiStartTrip(tripId);
      toast.success(result.data.Message);
      fetchTrips();
    } catch (error) {
      toast.error("Error: " + error.message);
      console.error("Error starting trip:", error);
    }
  };

  const finishTrip = async (tripId) => {
    try {
      const result = await apiFinishTrip(tripId);
      toast.success(result.data.Message);
      fetchTrips();
    } catch (error) {
      toast.error("Error: " + error.message);
      console.error("Error finishing trip:", error);
    }
  };

  return {
    tripsPending,
    tripsStarted,
    tripsCompleted,
    startTrip,
    finishTrip,
    fetchTrips,
  };
};

export default useTrips;
