import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import { Button, Input } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { IconContext } from 'react-icons'
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Select,MenuItem,InputBase } from "@mui/material";
import {useState,useEffect} from "react";
import axios from "axios";

function Use_top_mypage_login_er_modal()  {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [searchResultNum ,setSearchResultNum] = useState(0);
    const [userErId ,setUserErId] = useState("");

    const changeId = (e) => {
        // IDを格納する
        sessionStorage.setItem('id', e.target.value);
    }

    const changePassWord = (e) => {
        // パスワードを格納する
        sessionStorage.setItem('password', e.target.value);
    }

    const loginLogic = () =>{
        axios.get(`/api/search/user_er_login`, {
            params:{
                      id : sessionStorage.getItem('id')
                    , password : sessionStorage.getItem('password')
                    }
                 }
        ).then(
                res=>{
                        setUserData(res.data.results[0]);
                        // IDが存在すれば1をセット。無ければ0をセット。
                        if(res.data.results[0].PK_ER_USER_ID){
                            setUserErId(res.data.results[0].PK_ER_USER_ID);
                            sessionStorage.setItem('user_id',res.data.results[0].PK_ER_USER_ID);
                            sessionStorage.setItem('user_data',JSON.stringify(res.data.results[0]));
                            navigate('/Comp_mypage_er_top');
                        }else{
                            setSearchResultNum(0);            
                            setUserErId("");
                        }
                    }
        )
        console.log(searchResultNum + userErId);
        console.log(userData);

        // 初期化
        setUserData([]);
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('password');

    }
    return (
        <div>
            <div>
                <nav>
                    <ul class="nav-list">
                        <li class="nav-item"><a href="#ABOUT">トレーナーの方はこちらから</a></li>
                        <li class="nav-item"><a href="/Component_EE_Form_NickName">会員登録/ログイン</a></li>
                    </ul>
                </nav>
                <div class="top-img">
                    <img src="https://pft-fitness.com/wp-content/uploads/2019/04/1_pc_article.jpg"></img>
                    <p>最高のパーソナルトレーナーを見つけよう</p>
                    <div class="top-search">
                        <div className="search">
                            <div className='search__bar'>
                                <IconContext.Provider value={{size: '30px' }}>
                                    <FiSearch onClick={() => navigate('/top_search_modal')}/>
                                </IconContext.Provider>
                                <input  className="search__bar__input" placeholder="Search" onClick={() => navigate('/top_search_modal')}/>
                                <div class="overlay">
                                    <div class="content-login">
                                        <div class="close-modal">
                                            <Button class="close-btn-modal" onClick={()=>navigate('/')}>
                                            <AiOutlineCloseCircle/>
                                            </Button>
                                        </div>
                                        <div>
                                            <h3>ログイン</h3>
                                        </div>

                                        <div className="login-inputs">
                                            <div className="login-input">
                                                <TextField id="standard-basic" 
                                                        defaultValue = {sessionStorage.getItem('id')}
                                                        variant="standard"
                                                        aria-required="true"
                                                        placeholder ="ID"
                                                        onChange={changeId}
                                                        type="text"
                                                        className="text-login-er"/>
                                            </div>
                                            <div className="login-input">
                                                <TextField id="standard-basic" 
                                                        defaultValue = {sessionStorage.getItem('password')}
                                                        variant="standard"
                                                        placeholder ="パスワード"
                                                        aria-required="true"
                                                        onChange={changePassWord}
                                                        type="text"
                                                        className="text-login-er" />
                                            </div>
                                        </div>
                                        <div class="btn-search-modal">
                                            <Button variant="contained" color="inherit" onClick={loginLogic}>
                                                    ログインする
                                            </Button>
                                            <div class="text-for-tork">
                                                <a href="/Component_ER_Form_Name">
                                                            新しく登録する
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}
export default Use_top_mypage_login_er_modal;