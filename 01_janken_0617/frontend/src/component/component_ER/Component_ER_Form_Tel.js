import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';
import {TextField } from "@mui/material";

const Component_ER_Form_Tel = () => {
    const navigate = useNavigate()
    /**
     * 電話番号の値変更処理
     */
    const changeTel = (e) => {
    // 入力欄の値をtelをkeyとして格納する
        localStorage.setItem('tel', e.target.value);
    }
  
    return (
        <div class="component-ee">
            <p>電話番号を教えてください</p>
            <label class="contact-douki">
                <TextField id="standard-basic" 
                            defaultValue = {localStorage.getItem('tel')}
                            variant="standard"
                            onChange={changeTel}
                            type="tel"/>
            </label>
            <div class="component-ee-btn">
                <Button variant="outlined" onClick={() => navigate('/Component_ER_Form_Mail')}>戻る</Button>    
                <Button variant="contained" onClick={() => navigate('/Component_ER_Form_IdPassword')}>次へ</Button>
            </div>
        </div>
    )
}
export default Component_ER_Form_Tel