import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

const Comp_mypage_ee_top = () => {
    const navigate = useNavigate()
    /**
     * 住所の値変更処理
     */
    const changeAddress = (e) => {
    // 入力欄の値をaddressをkeyとして格納する
      localStorage.setItem('address', e.target.value);
    }    
  
    return (
        <div class="component-ee">
            <p>住所を教えてください</p>
               <label class="contact-douki">
                    <TextField id="standard-basic" 
                        label="住所"
                        defaultValue = {localStorage.getItem('address')}
                        variant="standard"
                        onChange={changeAddress}/>
               </label>
               <div class="component-ee-btn">
                    <Button variant="outlined" onClick={() => navigate('/Component_EE_Form_Sex')}>戻る</Button>    
                    <Button variant="contained" onClick={() => navigate('/Component_EE_Form_BirthDay')}>次へ</Button>
               </div>
           
        </div>
    )
}
export default Comp_mypage_ee_top