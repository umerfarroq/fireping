const FIRE_INCIDENT_LOCATIONS = [
  {
    id: 1,
    latitude: 34.063989,
    longitude: 74.794424,
    address: "Downtown Area",
    severity: "high"
  },
  {
    id: 2,
    latitude: 34.073989,
    longitude: 74.804424,
    address: "Industrial Zone",
    severity: "medium"
  },
  {
    id: 3,
    latitude: 34.053989,
    longitude: 74.784424,
    address: "Residential Area",
    severity: "high"
  },

    {
    id: 4,
    latitude: 34.099015,
    longitude: 74.763206,
    address: "Residential Area",
    severity: "high"
  }
];

const fireFighterLocation = {
    latitude: 34.063989,
    longitude: 74.794424,
}






const calculateDistance =(lat1 , lon1, lat2, lon2) => {

    const Radius= 6371e3;

    const dlat1=(lat1 * Math.PI)/180;
    const dlat2=(lat2 * Math.PI)/180;

    const deltaLat=((lat2 - lat1) * Math.PI)/180;
    const deltaLon=((lon2 - lon1) * Math.PI)/180;


    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(dlat1) * Math.cos(dlat2) * Math.sin(deltaLon/2) * Math.sin(deltaLon/2)

   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   const distance = Radius * c ;

   return distance


}





const calculateDistanceFromIncident = () => {

    let minDistance = Infinity;
        let nearest = null;

    FIRE_INCIDENT_LOCATIONS.forEach((incident) => {
        const distance = calculateDistance(
            fireFighterLocation.latitude,
            fireFighterLocation.longitude,
            incident.latitude,
            incident.longitude
        )

        console.log(`Distance to incident ${incident.address} : ${distance}`)

        if(distance < minDistance){
            minDistance = distance;
            nearest = { ...incident , distanceToFireFighter : distance}
        }
    })
     

    console.log("nearest location:", minDistance)

    return  nearest
}




const nearestIncident = calculateDistanceFromIncident();
console.log("Nearest Incident",nearestIncident)