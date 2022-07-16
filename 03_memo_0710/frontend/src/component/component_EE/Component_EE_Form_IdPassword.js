import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';
import {TextField } from "@mui/material";

const Component_EE_Form_IdPassword = () => {
    const navigate = useNavigate()
    /**
     * パスワードの値変更処理
     */
     const changePassword = (e) => {
        // passwordの値をpasswordをkeyとして格納する
        sessionStorage.setItem('password', e.target.value);
      }

    /**
     * IDの値変更処理
     */
     const changeId = (e) => {
      // Idの値をIdをkeyとして格納する
      sessionStorage.setItem('Id', e.target.value);
    }    

    return (
      <div class="component-ee">
            <p>IDとパスワードを入力してください</p>
               <div>
                  <TextField id="standard-basic" 
                        label="ID"
                        variant="standard"
                        onChange={changeId}
                        defaultValue={sessionStorage.getItem('Id')}
                        />
                  <p></p>
                  <TextField id="standard-basic" 
                        label="パスワード"
                        defaultValue = {sessionStorage.getItem('password')}
                        variant="standard"
                        onChange={changePassword}
                        type="password"/>

               </div>
               <div class="component-ee-btn">
                  <Button variant="outlined" onClick={() => navigate('/Component_EE_Form_Mktk')}>戻る</Button>    
                  <Button variant="contained" onClick={() => navigate('/Component_EE_Form_Sishu_Kknn')}>次へ</Button> 
               </div>
        </div>
    )
}
export default Component_EE_Form_IdPassword