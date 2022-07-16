import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';
import {TextField } from "@mui/material";

const Component_ER_Form_BirthDay = () => {
    const navigate = useNavigate()
    /**
     * 生年月日の値変更処理
     */
    const changeBirthDay = (e) => {
    // 入力欄の値をbirthDayをkeyとして格納する
      localStorage.setItem('birthDay', e.target.value);
    }



    return (
        <div class="component-ee">
            <p>生年月日を教えてください</p>
            <label>
            <TextField id="standard-basic" 
                            defaultValue = {localStorage.getItem('birthDay')}
                            variant="standard"
                            onChange={changeBirthDay}
                            type="date"/>
            </label>
            <div class="component-ee-btn">
                <Button variant="outlined" onClick={() => navigate('/Component_ER_Form_Address')}>戻る</Button>    
                <Button variant="contained" onClick={() => navigate('/Component_ER_Form_Mail')}>次へ</Button>
            </div>
        </div>
    )
}
export default Component_ER_Form_BirthDay