import { useNavigate,Link } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import { Select,MenuItem,Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { IconContext } from 'react-icons'
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import {useState,useEffect} from "react";

function useSearchResult()  {

    const [userData, setUserData] = useState([]);
    const [searchResult, setSearchResult] = useState("");
    const [profileImg, setProfileImg] = useState();

    const navigate = useNavigate();
    // DB接続(ユーザのIDを取得する)
    useEffect(() =>{
        fetch('/api/search/user_er_all')
          .then((res) => res.json())
          .then((data) => setUserData(data.userEeData))
          ;
        },[]
    )

    const NullConv=(param)=>{
        if(param){
            return param;
        }else{
            return "入力なし";
        }
    }
    const NullConvRate=(param)=>{
        if(param){
            return param;
        }else{
            return "集計中";
        }
    }
    const ConvImgNameToPath=(param)=>{
        if(param){
            return "./uploads/uploads-profileImg-er/"+param;
        }else{
            return "";
        }
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
            <div className="search-bg">
                <div className="search-headders">
                    <div className="search-headder">{userData.length}人のおすすめのパーソナルトレーナー</div>
                    並び替え<Select  className="search-shiborikomi-joken">
                        <MenuItem value="1">
                            <em>おすすめ順</em>
                        </MenuItem>
                        <MenuItem value="2">
                            <em>人気順</em>
                        </MenuItem>
                        <MenuItem value="3">
                            <em>近い順</em>
                        </MenuItem>
                    </Select>
                </div>
                <div className="search-result-part">
                    <div className="search-joken-panel">
                        <div className="search-joken-item-area">
                            <p>エリア選択</p>
                            <Select  className="search-shiborikomi-joken">
                                <MenuItem value="1">
                                    <em>東京</em>
                                </MenuItem>
                                <MenuItem value="2">
                                    <em>神奈川</em>
                                </MenuItem>
                                <MenuItem value="3">
                                    <em>千葉</em>
                                </MenuItem>
                            </Select>
                        </div>
                        <div className="search-joken-item-menu">
                            <p>メニュー選択</p>
                            <Select  className="search-shiborikomi-joken">
                                <MenuItem value="1">
                                    <em>脚トレ</em>
                                </MenuItem>
                                <MenuItem value="2">
                                    <em>胸トレ</em>
                                </MenuItem>
                                <MenuItem value="3">
                                    <em>背中トレ</em>
                                </MenuItem>
                            </Select>
                        </div>
                        <div className="search-joken-item-kodawari">
                            <p>こだわり選択</p>

                        </div>
                        <div className="search-joken-item-kodawari">
                            <Button variant="contained">再建策</Button>
                        </div>

                    </div>
                    <ul className="search-ul">
                        {userData.map((value, index, userData) => (
                            <div calssName="search-result">
                                <label>
                                    <li key={index} class="record">
                                            <tr calssName="tr-style" onClick={() => navigate('/Comp_mypage_er_top',
                                                                                            {state : {userErIdFromSearchResult : userData[index].PK_ER_USER_ID} })}>
                                                <td className="photo-part">
                                                    <img src={ConvImgNameToPath(userData[index].PROFILE_IMG)} alt="準備中"></img>
                                                </td>
                                                <td className="shoukai-part">
                                                    {userData[index].HITOKOTO_MESSAGE}
                                                    <br/>{userData[index].NICK_NAME}
                                                    <br/>{NullConvRate(userData[index].RANK)}
                                                    <br/>9,500/時間
                                                    <br/>#目黒エニタイムフィットネス #品川フィットネススタジオ
                                                </td>
                                            </tr>
                                    </li>
                                </label>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>


    );
}
export default useSearchResult;