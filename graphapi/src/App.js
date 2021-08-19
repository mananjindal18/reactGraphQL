import React,{useEffect,useState} from "react";
import axios from "axios";
import './App.css';
const endpoint = "http://localhost:4000/graphql/";
const GET_ALL_Payment = `
query{
  getAllPayment{
    isSuccess
    data {
      paymentID
      price
    }
    message
  }
}
`;
const ADD_Payment = `
mutation{
  addPayment(paymentID:"333",price:"10000"){
    message
    data {
      paymentID
      price
    }
    isSuccess
  }
}
`;
function App() {
  const [data,setData]=useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      const queryResult = await axios.post(endpoint,{query:GET_ALL_Payment});
      const result = queryResult.data.data.getAllPayment.data;
      console.log("Result from GraphQL",result);
      const queryResult2 = await axios.post(endpoint,{query:ADD_Payment});
      const result2 = queryResult2.data.data.addPayment;
      console.log("Result2 after adding new payment",result2);
      setData(result);
    };
    fetchData();
  },[])
  return (
    <div className="App">
      {data.map((item,index)=>(
        <div key={index}>
          <h1>Payment ID: {item.paymentID}</h1>
          <h2>Price: {item.price}</h2>
        </div>
      ))}
    </div>
  );
}
export default App;
