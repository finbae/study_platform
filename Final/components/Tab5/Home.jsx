import React, { useEffect } from "react";
import "./Home.css";
import { setPageTitle } from '../../../util';


function Home() {
  
  useEffect(()=>{
    setPageTitle("홈페이지")
  },[]);

  return (
    <div>
      <div className="imge">
      </div>
      <div className="link">
      <a href="https://www.dongseo.ac.kr/kr/?pCode=main">
        <h2>DSU 홈페이지 바로가기</h2>
      </a>
      <a href="https://eclass1.dongseo.ac.kr/">
        <h2>e-Class 바로가기</h2>
      </a>
      <a href="https://mydex.dongseo.ac.kr/">
        <h2>MYDEX 바로가기</h2>
      </a>
    </div>

    </div>
  );
}

export default Home;
