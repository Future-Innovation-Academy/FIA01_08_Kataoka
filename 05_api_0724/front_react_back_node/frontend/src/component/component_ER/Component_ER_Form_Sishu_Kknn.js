import { useNavigate } from "react-router-dom"
import {useState, useEffect} from "react";
import axios from 'axios';
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';

const Component_ER_Form_Sishu_Kknn = () => {
    const navigate = useNavigate()
    const [user_id, setUserId] = useState('');

    // DB接続(ユーザのIDを取得する)
    useEffect(() =>{
        fetch('/api/search/user_id_er')
          .then((res) => res.json())
          .then((data) => setUserId(data.user_id))
          ;
        },[])
        const convertSexKbnRnrNm = (Btrkbn) => {
            if(Btrkbn=='1'){
                return "男性"
            }else if(Btrkbn=='2'){
                return "女性"
            }
        }
  
      /**
     * 送信ボタンクリック
     * （DBに登録内容を反映する）
     */
       const clickSubmit = () => {
        alert("登録完了しました");        
        axios.get(`/api/tork/er`, {
            params:{
                   nick_name : localStorage.getItem('nick_name')
                 , sexkbn : localStorage.getItem('sexKbn')
                 , birthday : localStorage.getItem('birthDay')
                 , telno : localStorage.getItem('tel')
                 , address1 : localStorage.getItem('address')
                 , email : localStorage.getItem('email')
                 , id : sessionStorage.getItem('Id')
                 , password : sessionStorage.getItem('password')
                 , user_id : user_id
              }
            })
        nv();
  

        localStorage.clear()
        sessionStorage.clear()
        }

        const nv =()=>{
            navigate('/')
        }
  
    return (
        <div class="component-ee-sishu-kknn">
            <p>登録内容をご確認下さい</p>
               <label class="contact-douki">
                <table class="ee-sishu-kknn-table">
                    <tr>
                        <th>ニックネーム</th>
                        <td>{localStorage.getItem('nick_name')}</td>
                    </tr>
                    <tr>
                        <th>性別</th>
                        <td>{convertSexKbnRnrNm(localStorage.getItem('sexKbn'))}</td>
                    </tr>
                    <tr>
                        <th>生年月日</th>
                        <td>{localStorage.getItem('birthDay')}</td>
                    </tr>
                    <tr>
                        <th>電話番号</th>
                        <td>{localStorage.getItem('tel')}</td>
                    </tr>
                    <tr>
                        <th>住所</th>
                        <td>{localStorage.getItem('address')}</td>
                    </tr>
                    <tr>
                        <th>メールアドレス</th>
                        <td>{localStorage.getItem('email')}</td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <td>{sessionStorage.getItem('Id')}</td>
                    </tr>
                    <tr>
                        <th>パスワード</th>
                        <td>{sessionStorage.getItem('password')}</td>
                    </tr>
                </table>

               </label>
               <p>問題なければ、登録ボタンを押下</p>
               <div class="component-ee-btn">
                    <Button variant="outlined" onClick={() => navigate('/Component_ER_Form_IdPassword')}>戻る</Button>    
                    <Button type="submit" variant="contained" onClick={clickSubmit}>登録</Button>
                </div>
        </div>
    )
}
export default Component_ER_Form_Sishu_Kknn