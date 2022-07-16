import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';
import {TextField } from "@mui/material";

const Component_EE_Form_Mail = () => {
    const navigate = useNavigate()
    /**
     * メールアドレスの値変更処理
     */
    const changeEmail = (e) => {
    // 入力欄の値をemailをkeyとして格納する
        localStorage.setItem('email', e.target.value);
    }
    
    return (
        <div class="component-ee">
            <p>メールアドレスを教えてください</p>
             <label class="contact-douki">
                <TextField id="standard-basic" 
                            defaultValue = {localStorage.getItem('email')}
                            variant="standard"
                            onChange={changeEmail}
                            type="email"/>
             </label>
             <div class="component-ee-btn">
                <Button variant="outlined" onClick={() => navigate('/Component_EE_Form_BirthDay')}>戻る</Button>    
                <Button variant="contained" onClick={() => navigate('/Component_EE_Form_Tel')}>次へ</Button>
             </div>
        </div>
    )
}
export default Component_EE_Form_Mail