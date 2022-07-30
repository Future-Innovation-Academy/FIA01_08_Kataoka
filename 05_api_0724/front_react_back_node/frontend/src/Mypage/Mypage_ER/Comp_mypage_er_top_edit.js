import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import Button from '@mui/material/Button';
import { TextField,Select,MenuItem } from "@mui/material";
import Box from '@mui/material/Box';
import {useState,useEffect,useLayoutEffect, useRef} from "react";
import axios from 'axios';

const Comp_mypage_er_top = () => {
    const navigate = useNavigate()
    const inputRefBackImg = useRef();
    const inputRefProfileImg = useRef();    
    const [erUserId ,setErUserId] = useState("");
    const [file,setFile] = useState(); 
    const [profileFile,setProfileFile] = useState(); 
    const [userEigyoStartTime, setEigyoStartTime] = useState();
    const [userEigyoEndTime, setEigyoEndTime] = useState();
    const [userHitokotoMessage, setHitokotoMessage] = useState();
    const [userRate, setRate] = useState("");
    const [backImg, setBackImg] = useState();

    const [profileImg, setProfileImg] = useState();
    const [displayFlg ,setDisplayFlg] = useState("");
    const [selectValues ,setSelectValues] = useState([
        "AM0:00","AM0:30","AM1:00","AM1:30","AM2:00","AM2:30","AM3:00","AM3:30",
        "AM4:00","AM4:30","AM5:00","AM5:30","AM6:00","AM6:30","AM7:00","AM7:30",
        "AM8:00","AM8:30","AM9:00","AM9:30","AM10:00","AM10:30","AM11:00","AM11:30",
        "PM12:00","PM12:30","PM1:00","PM1:30","PM2:00","PM2:30","PM3:00","PM3:30",
        "PM4:00","PM4:30","PM5:00","PM5:30","PM6:00","PM6:30","PM7:00","PM7:30",
        "PM8:00","PM8:30","PM9:00","PM9:30","PM10:00","PM10:30","PM11:00","PM11:30"
    ]);
    useLayoutEffect(()=>{
        setErUserId(JSON.parse(sessionStorage.getItem("user_data")).PK_ER_USER_ID);
            if(JSON.parse(sessionStorage.getItem("user_data")).PK_ER_USER_ID){
                setDisplayFlg("none");
                setErUserId(JSON.parse(sessionStorage.getItem("user_data")).PK_ER_USER_ID);
             }else{
                setDisplayFlg("");
             };
        },[]
    )
    useEffect(()=>{    
        axios.get(`/api/search/user_er_mypage`, {
            params:{
                      er_user_id : JSON.parse(sessionStorage.getItem("user_data")).PK_ER_USER_ID
                    }
                 }
        ).then(
                res=>{
                    const eigyoStartTimeHensu = res.data.results[0].EIGYO_START_TIME;
                    const eigyoEndTimeHensu = res.data.results[0].EIGYO_END_TIME;
                    const hitokotoMessageHensu = res.data.results[0].HITOKOTO_MESSAGE;
                    const rateHensu = res.data.results[0].RATE;
                    const backImgHensu = "./uploads/uploads-backImg-er/"+ res.data.results[0].BACK_IMG;
                    const profileImgHensu = "./uploads/uploads-profileImg-er/"+ res.data.results[0].PROFILE_IMG;

                    setEigyoStartTime(eigyoStartTimeHensu);
                    setEigyoEndTime(eigyoEndTimeHensu);
                    setHitokotoMessage(hitokotoMessageHensu);
                    setRate(rateHensu);
                    setBackImg(backImgHensu);
                    setProfileImg(profileImgHensu);
                }
        )},[])
    
    
    // バック画像をクリックしたら、fileタグをクリックする仕組み
    const handleClickBackImg=()=>{
        inputRefBackImg.current.click();
    }
    // バック画像をローカルから選択させて、画像ファイルだったら、バック画像を差し替える。画像ファイルじゃなければエラーメッセージを流す。
    // 「選択しない」を選択した場合は元の画像が入る。
    // また、URLは変数として保持しておく
    const imgUploadBackImg=(e)=>{
        if(e.target.files[0]){
            e.preventDefault();
            const filedesu = e.target.files[0];
            setFile(filedesu);            

        }else{
            console.log('アップロードはキャンセルされました')
        }

    }
// プロフィール画像をクリックしたときに、選択された画像ファイルを保持する
    const handleClickProfileImg=()=>{
        inputRefProfileImg.current.click();
    }

    const imgUploadProfileImg=(e)=>{
        if(e.target.files[0]){
            e.preventDefault();
            const profileFiledesu = e.target.files[0];
            setProfileFile(profileFiledesu);

        }else{
            console.log('アップロードはキャンセルされました')
        }
    }
    

    // 営業開始時刻を変更したときに値をセッションストアレージに詰める
    const ChangeEigyoStartTime=(e)=>{
        setEigyoStartTime(e.target.value);
        console.log(userEigyoStartTime)

    }
    // 営業終了時刻を変更したときに値をセッションストアレージに詰める
    const ChangeEigyoEndTime=(e)=>{
        setEigyoEndTime(e.target.value);
        console.log(userEigyoEndTime)
    }
    // 一言メッセージを変更したときに値をセッションストアレージに詰める    
    const ChangeHitokotoMessage=(e)=>{
        setHitokotoMessage(e.target.value);
        console.log(userHitokotoMessage)
    }
     /**
     * 送信ボタンクリック
     * （DBに登録内容を反映する）
     */
    const clickSubmit = () => {
        alert("登録完了しました");        
        axios.get(`/api/tork/er_mypage`, {
            params:{
                user_id : erUserId
            ,   eigyoStartTime : userEigyoStartTime
            ,   eigyoEndTime : userEigyoEndTime
            ,   hitokotoMessage : userHitokotoMessage
              }
            })
        // 画像データの変更がある場合は、専用のAPIを呼ぶ
        submitImg();
        navigate('/Comp_mypage_er_top');        
        sessionStorage.removeItem("urlBackImg");

    }
    // 画像データを変更した場合にDBに登録するAPI
    const submitImg = () =>{
         const params = new FormData();
         params.append("profileFile",profileFile);
         params.append("file",file);
         params.append("user_id",erUserId);

         console.log(profileFile)
         console.log(file)

        console.log("apitest実行するよ");
        axios.post(`/api/test`, params)
            .then(function (response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
    };
  
    return (
        <div className="component-ee">
            <div className="mypage-er-img">
                <img src={backImg} onClick={handleClickBackImg}/>
                <div className="mypage-er-smr">
                    <div className="mypage-er-edit-btn">
                    </div>
                    <div>
                    <p className="img-profile-ee">
                        <img src={profileImg} onClick={handleClickProfileImg}>
                        </img>
                    </p>
                    <p>
                    <TextField label="ニックネーム" variant="outlined"
                        size="small"  
                        defaultValue={JSON.parse(sessionStorage.getItem("user_data")).NICK_NAME}
                        ></TextField>
                    </p>
                    <p>
                        <Select
                                    label="営業開始時刻" 
                                    variant="outlined" 
                                    size="small"  
                                    onChange={ChangeEigyoStartTime}
                                    style={{width : 120}}
                                    value = {userEigyoStartTime}>
                                    {selectValues.map((value) => (
                                        <MenuItem value={value} key={value}>
                                        {value}
                                        </MenuItem>
                                    ))}
                        </Select>
                        <Select 
                                    label="営業終了時刻" 
                                    variant="outlined"
                                    size="small"
                                    onChange={ChangeEigyoEndTime} 
                                    style={{width : 120}}
                                    value = {userEigyoEndTime}>
                                    {selectValues.map((value) => (
                                    <MenuItem value={value} key={value}>
                                    {value}
                                    </MenuItem>
                                  ))}
                        </Select>
                    </p>
                    <p>
                        <TextField  label="一言メッセージ" 
                                    variant="outlined"
                                    size="small"  
                                    style={{width : 400}} 
                                    value={userHitokotoMessage}
                                    onChange={ChangeHitokotoMessage}
                                    >
                        </TextField>

                    </p>
                    <Box component="div">
                        <Button variant="outlined"  onClick={clickSubmit}>
                            これで登録する
                        </Button>
                    </Box>
                    {/* <button onClick={log}></button> */}
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
                        <img src={sessionStorage.getItem('urlBackImg')} />


                    </div>


                    <div>
                        <input  style={{display: 'none'}}   ref={inputRefBackImg}   type="file" onChange={imgUploadBackImg} />
                    </div>
                    <div>
                        <input  style={{display: 'none'}}   ref={inputRefProfileImg}   type="file" onChange={imgUploadProfileImg}/>
                    </div>        
               </div>
           
        </div>
    )
}
export default Comp_mypage_er_top