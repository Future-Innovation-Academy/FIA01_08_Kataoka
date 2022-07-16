import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import { Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { IconContext } from 'react-icons'
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";

function useTop()  {
    
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <nav>
                    <ul class="nav-list">
                        <li class="nav-item"><a href="/Component_ER_Form_Name">トレーナーの方はこちらから</a></li>
                        <li class="nav-item"><a href="/Component_EE_Form_NickName">会員登録/ログイン</a></li>
                    </ul>
                </nav>
                <div class="top-img">
                    <img src="https://pft-fitness.com/wp-content/uploads/2019/04/1_pc_article.jpg"></img>
                    <p>最高のパーソナルトレーナーを見つけよう</p>
                    <div class="search">
                        <div class='search__bar'>
                            <IconContext.Provider value={{size: '30px' }}>
                                <FiSearch onClick={() => navigate('/top_search_modal')}/>
                            </IconContext.Provider>
                            <input  class="search__bar__input" placeholder="エリア・駅名からおすすめのパーソナルトレーナーを探す" onClick={() => navigate('/top_search_modal')}/>
                        </div>
                    </div>
                </div>                
            </div>
            <div>

            </div>
        </div>

    );
}
export default useTop;