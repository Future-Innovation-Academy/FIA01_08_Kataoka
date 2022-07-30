import { useNavigate } from "react-router-dom"
import {useState} from "react";
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/App.css';
import Button from '@mui/material/Button';

const Component_EE_Form_Mktk = () => {
    const navigate = useNavigate()
    const [mktk, setMktk] = useState(localStorage.getItem('mktk'))
    /**
     * トレーニングの目的の値変更処理
     */
    const changeMktk = (e) => {
    // 入力欄の値をtelに詰める
        setMktk(e.target.value);
    // telの値をtelをkeyとして格納する
        localStorage.setItem('mktk', mktk);
    }

    return (
      <div class="component-ee">
            <p>トレーニングの目的を選択してください</p>
            <div class="component-mktk-check-boxs">
               <label class="contact-douki">
                                <input type="checkbox" name="志望動機1"/>健康的な体作り</label>
                              <label class="contact-douki">
                                <input  type="checkbox" name="志望動機2"/>美しい体作り
                              </label>
                              <label class="contact-douki">
                                <input  type="checkbox" name="志望動機3"/>運動不足解消
                              </label>
                              <label class="contact-douki">
                                <input  type="checkbox" name="志望動機4"/>大会に出場するためサポートしてほしい
                              </label>
            </div>
            <div class="component-ee-btn">
                <Button variant="outlined" onClick={() => navigate('/Component_EE_Form_Tel')}>戻る</Button>    
                <Button variant="contained" onClick={() => navigate('/Component_EE_Form_IdPassword')}>次へ</Button>
            </div>
        </div>
    )
}
export default Component_EE_Form_Mktk