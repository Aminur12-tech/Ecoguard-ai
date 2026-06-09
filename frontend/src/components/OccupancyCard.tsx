interface Props {
  occupancy: number;
}

const OccupancyCard = ({
  occupancy,
}: Props) => {

 return (

  <div
   style={{
     background:"#fff",
     padding:"20px",
     borderRadius:"12px"
   }}
  >

   <h4>
     Occupancy Rate
   </h4>

   <h1>
     {occupancy}%
   </h1>

  </div>

 );

};

export default OccupancyCard;