import { useNavigate,useParams,useLocation } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import {useState,useEffect,useLayoutEffect} from "react";
import { display } from '@mui/system';
import { FiEdit } from "react-icons/fi";
import axios from "axios";


const Comp_mypage_er_top = () => {
    const navigate = useNavigate()
    const {paramFromSearchResult} = useParams();
    const location = useLocation()
    const [erUserId ,setErUserId] = useState("");
    const [displayFlg ,setDisplayFlg] = useState("");
    const [userEigyoStartTime, setEigyoStartTime] = useState("");
    const [userEigyoEndTime, setEigyoEndTime] = useState("");
    const [userHitokotoMessage, setHitokotoMessage] = useState("");
    const [userRate, setRate] = useState("");
    const [backImg, setBackImg] = useState();
    const [profileImg, setProfileImg] = useState();

    useLayoutEffect(()=>{
            setErUserId(JSON.parse(sessionStorage.getItem("user_data")).PK_ER_USER_ID);
            if(JSON.parse(sessionStorage.getItem("user_data")).PK_ER_USER_ID){
                setDisplayFlg("");
             }else{
                setDisplayFlg("");
             };
        },[]
    )

    useEffect(()=>{    
        // 検索条件を遷移元の引数に応じて、可変とする。

    axios.get(`/api/search/user_er_mypage`, {
        params:{
                  er_user_id : JSON.parse(sessionStorage.getItem("user_data")).PK_ER_USER_ID
                }
             }
    ).then(
            res=>{
                setEigyoStartTime(res.data.results[0].EIGYO_START_TIME);
                setEigyoEndTime(res.data.results[0].EIGYO_END_TIME);
                setHitokotoMessage(res.data.results[0].HITOKOTO_MESSAGE);
                setRate(res.data.results[0].RATE);
                setBackImg("./uploads/uploads-backImg-er/"+ res.data.results[0].BACK_IMG);
                setProfileImg("./uploads/uploads-profileImg-er/"+ res.data.results[0].PROFILE_IMG);
            }
    )},[])

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

    
    return (
        <div className="component-ee">
            <div className="mypage-er-img">
                <p></p>
                <img src={backImg}/>

                <div className="mypage-er-smr">
                    <div className="mypage-er-edit-btn">
                        <p>
                            <FiEdit onClick={() => navigate('/Comp_mypage_er_top_edit')}/>
                        </p>
                    </div>
                    <div>
                    <p className="img-profile-ee">
                        <img src={profileImg}></img>
                    </p>
                    <p>
                        {JSON.parse(sessionStorage.getItem("user_data")).NICK_NAME}
                    </p>
                    <p>
                        評価：{NullConvRate(userRate)}
                    </p>
                    <p>
                        営業時間：{NullConv(userEigyoStartTime)}~{NullConv(userEigyoEndTime)}
                    </p>
                    <p>
                        一言メッセージ：{NullConv(userHitokotoMessage)}
                    </p>
                    <Box component="div" display={displayFlg}>
                        <Button variant="outlined"  onClick={() => navigate('/Make_payment_form_modal')}>
                            このトレーナーを予約する
                        </Button>
                    </Box>
                    </div>

                </div>

                </div>
               <label>
                    <ul className="mypage-er-list">
                        <li>
                            <a href="/Comp_mypage_er_top">トップ</a>
                        </li>
                        <li>
                            <a href="/">私について</a>
                        </li>
                        <li>
                            <a href="/">メニュー</a>
                        </li>
                        <li>
                            <a>コンタクト</a>
                        </li>
                        <li>
                            <a href="/">レビュー</a>
                        </li>
                    </ul>
               </label>
               <div className="mypage-er-underPart">
                    <div>
                        <h2>メニュー</h2>
                        <ul className="mypage-er-menu-list">
                            <li>
                                <div>
                                    aaa
                                </div>
                            </li>
                            <li>
                                <div>
                                    aaa
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>コンタクト</h2>
                    </div>
                    <div>
                        <h2>レビュー</h2>
                    </div>




               </div>
           
        </div>
    )
}
export default Comp_mypage_er_top