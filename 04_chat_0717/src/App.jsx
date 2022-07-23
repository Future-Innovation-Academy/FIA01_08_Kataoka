import { useState, useEffect } from 'react'
import './App.css'
import {collection, query, onSnapshot, addDoc} from "firebase/firestore";
import {db, auth} from "./firebase";
import Add from './Add';

function App() {
  const [uenoku, setUenoku] = useState([
    {
      id:"",
      uenoku:"",
    },
  ]);

  const [nakanoku, setNakanoku] = useState([
    {
      id:"",
      nakanoku:"",
    },
  ]);

  const [shimonoku, setShimonoku] = useState([
    {
      id:"",
      shimonoku:"",
    },
  ]);


// useEffectで上の句をゲットする
  useEffect(()=>{

    uenokuDbGetter();
    nakanokuDbGetter();
    shimonokuDbGetter();

  },[uenoku, nakanoku, shimonoku]);




  const uenokuDbGetter=()=>{  
      const uenokuDb = query(collection(db, 'uenoku'));
      const getUenoku = onSnapshot(uenokuDb, (QuerySnapshot) =>{
        setUenoku(
          QuerySnapshot.docs.map((doc)=>({
            id: doc.id,
            uenoku:doc.data().uenoku,
          }))
        );
      });
  };

// useEffectで中の句をゲットする 
const nakanokuDbGetter=()=>{  
    const nakanokuDb = query(collection(db, 'nakanoku'));
    const getNakanoku = onSnapshot(nakanokuDb, (QuerySnapshot) =>{
      setNakanoku(
        QuerySnapshot.docs.map((doc)=>({
          id: doc.id,
          nakanoku:doc.data().nakanoku,
        }))
      );
    });
  };

  // useEffectで下の句をゲットする
 const shimonokuDbGetter=()=>{
    const shimonokuDb = query(collection(db, 'shimonoku'));
    const getShimonoku = onSnapshot(shimonokuDb, (QuerySnapshot) =>{
      setShimonoku(
        QuerySnapshot.docs.map((doc)=>({
          id: doc.id,
          shimonoku:doc.data().shimonoku,
        }))
      );
    });
  };  

  //4. inputのonChangeのイベントを記述
  const handleInputChange1 = (e) => {
    sessionStorage.setItem('uenoku',e.target.value)
    console.log(sessionStorage.getItem('uenoku'))
  };
  //4. inputのonChangeのイベントを記述
  const handleInputChange2= (e) => {
    sessionStorage.setItem('nakanoku',e.target.value)
    console.log(sessionStorage.getItem('nakanoku'))
  };
  //4. inputのonChangeのイベントを記述
  const handleInputChange3 = (e) => {
    sessionStorage.setItem('shimonoku',e.target.value)
    console.log(sessionStorage.getItem('shimonoku'))
  };

// db接続して更新する
  const addData = async() => {
      // db接続し、haikuを更新
      await  addDoc (
        collection(db, 'haiku'),
        {
          haiku:sessionStorage.getItem('uenoku')+sessionStorage.getItem('nakanoku')+sessionStorage.getItem('shimonoku'),
        }
      );

  };





  return (
    <div className="App">
      <div>
        <Add     
          handleInputChange1={handleInputChange1}
          uenoku={uenoku}
          handleInputChange2={handleInputChange2}
          nakanoku={nakanoku}
          handleInputChange3={handleInputChange3}
          shimonoku={shimonoku}
        />
      </div>

      <div>
          <div className="haiku-sozai-list">
                  <div className="haiku-sozai-item">
                    <p>上の句一覧</p>
                    {uenoku.map((item, index) => 
                      <div key={index}>
                        <div>{item.uenoku}</div>
                      </div>
                    )}
                  </div>
                  <div className="haiku-sozai-item">
                    <p>中の句一覧</p>
                    {nakanoku.map((item, index) => 
                      <div key={index}>
                        <div>{item.nakanoku}</div>
                      </div>
                    )}
                  </div>
                  <div className="haiku-sozai-item">
                    <p>下の句一覧</p>
                    {shimonoku.map((item, index) => 
                      <div key={index}>
                        <div>{item.shimonoku}</div>
                      </div>
                    )}
                  </div>
          </div>
        </div>

        <div><button onClick={addData}>俳句として登録する</button></div>

    </div>
  )
}

export default App
