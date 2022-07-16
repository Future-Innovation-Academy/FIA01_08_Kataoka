import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';
import {TextField } from "@mui/material";

const Component_EE_Form_NickName = () => {
    const navigate = useNavigate()
    const changeNickName = (e) => {
        // nick_nameの値をnick_nameをkeyとして格納する
        localStorage.setItem('nick_name',e.target.value);
    }

    return (
        <div class="component-ee">
            <p>ニックネームを教えてください</p>
               <label class="contact-douki">
                    <TextField id="standard-basic" 
                                defaultValue = {localStorage.getItem('nick_name')}
                                variant="standard"
                                aria-required="true"
                                onChange={changeNickName}
                                type="text"/>
                </label>
                <div class="component-ee-btn">
                    <Button variant="contained" onClick={() => navigate('/Component_EE_Form_Sex')}>次へ</Button>
                </div>
        </div>
    )
}
// デザイン：次へボタンはContained、前へボタンはOutlined
export default Component_EE_Form_NickName