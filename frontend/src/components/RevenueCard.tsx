interface Props {
  visitors:number;
}

const RevenueCard = ({
 visitors
}:Props)=>{

 const revenue =
 visitors * 1500;

 return(

  <div
   style={{
     background:"#fff",
     padding:"20px",
     borderRadius:"12px"
   }}
  >

   <h4>
     Estimated Revenue
   </h4>

   <h1>
     ₹{revenue.toLocaleString()}
   </h1>

  </div>

 );

};

export default RevenueCard;