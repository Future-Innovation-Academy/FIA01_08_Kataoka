import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';
import {Radio ,RadioGroup, FormControlLabel} from "@mui/material";

const Component_EE_Form_Sex = () => {
    const navigate = useNavigate()
    /**
     * 性別の値変更処理
     */
      const changeSexKbn = (e) => {
          // sexKbnの値をsexKbnをkeyとして格納する
          localStorage.setItem('sexKbn', e.target.value);
        }

    return (
        <div class="component-ee">
            <p>性別を教えてください</p>
               <RadioGroup class="contact-douki" name ="性別" defaultValue={localStorage.getItem('sexKbn')}>
                   <FormControlLabel value="1" control={<Radio/>} label="男性" onChange={changeSexKbn}/>
                   <FormControlLabel value="2" control={<Radio/>} label="女性" onChange={changeSexKbn}/>
               </RadioGroup>
            <div class="component-ee-btn">
                <Button variant="outlined" onClick={() => navigate('/Component_EE_Form_NickName')}>戻る</Button>    
                <Button variant="contained" onClick={() => navigate('/Component_EE_Form_Address')}>次へ</Button>
            </div>
        </div>
    )
}
export default Component_EE_Form_Sex