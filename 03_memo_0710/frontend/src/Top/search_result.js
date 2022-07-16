import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import { Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { IconContext } from 'react-icons'
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import {useState,useEffect} from "react";

function useSearchResult()  {

    const [inputValue, setInputValue] = useState("");
    const [userData, setUserData] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    // DB接続(ユーザのIDを取得する)
    useEffect(() =>{
        fetch('/api/search/user_er_all')
          .then((res) => res.json())
          .then((data) => setUserData(data.userEeData))
          ;
        },[]

    )

    const convertSexKbnRnrNm = (Btrkbn) => {
        if(Btrkbn=='1'){
            return "男性"
        }else if(Btrkbn=='2'){
            return "女性"
        }
    }

    const search = () =>{
        
        setSearchResult(userData.map((value, index, userData) => {

            return (
            <div calssName="search-result">
                <label>
                    <li key={index} class="record">
                            <tr calssName="tr-style">
                                <td className="photo-part">
                                    写真
                                </td>
                                <td className="shoukai-part">
                                    お客様の目的やニーズに合わせて最適なトレーニングを提供させて頂きます！
                                <br/>{userData[index].NICK_NAME}
                                <br/>★★★★★
                                <br/>9,500/時間
                                <br/>@目黒
                                    
                                </td>
                            </tr>
                    </li>
                </label>

                </div>
            );
    }))
    }
    

    return (
        <div className="out">
            <div>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/Component_ER_Form_Name">トレーナーの方はこちらから</a></li>
                        <li className="nav-item"><a href="/Component_EE_Form_NickName">会員登録/ログイン</a></li>
                    </ul>
                </nav>
            </div>
            <div>{userData.length}人のおすすめのパーソナルトレーナー</div>
            <div className="search-bg">
                <ul className="search-ul">
                    {searchResult}
                </ul>
                <button onClick={search}>再検索する</button>
            </div>
            </div>


    );
}
export default useSearchResult;