import { useNavigate } from "react-router-dom"
import 'C:/Users/kataoka3063/Desktop/front_react_back_node/frontend/src/Top.css';
import { Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { IconContext } from 'react-icons'
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Select,MenuItem } from "@mui/material";



function useTopSearchModal()  {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <nav>
                    <ul class="nav-list">
                        <li class="nav-item"><a href="#ABOUT">トレーナーの方はこちらから</a></li>
                        <li class="nav-item"><a href="/Component_EE_Form_NickName">会員登録/ログイン</a></li>
                    </ul>
                </nav>
                <div class="top-img">
                    <img src="https://pft-fitness.com/wp-content/uploads/2019/04/1_pc_article.jpg"></img>
                    <p>最高のパーソナルトレーナーを見つけよう</p>
                    <div class="top-search">
                    <div className="search">
                <div className='search__bar'>
                    <IconContext.Provider value={{size: '30px' }}>
                        <FiSearch onClick={() => navigate('/top_search_modal')}/>
                    </IconContext.Provider>
                    <input  className="search__bar__input" placeholder="Search" onClick={() => navigate('/top_search_modal')}/>
                    <div class="overlay">
                        <div class="content">
                            <div class="close-modal">
                                <Button class="close-btn-modal" onClick={()=>navigate('/')}>
                                   <AiOutlineCloseCircle/>
                                </Button>
                            </div>
                            <h3>パーソナルトレーナー検索</h3>
                            <table>
                                <tr>都道府県
                                    <td>
                                        <Select size="small" >
                                            <MenuItem value="01">東京都</MenuItem>
                                            <MenuItem value="02">神奈川県</MenuItem>
                                            <MenuItem value="03">千葉県</MenuItem>
                                            <MenuItem value="04">埼玉県</MenuItem>
                                        </Select>
                                    </td>
                                </tr>
                                <tr>市区町村
                                    <td>
                                        <Select size="small" >
                                            <MenuItem value="01">東京都</MenuItem>
                                            <MenuItem value="02">神奈川県</MenuItem>
                                            <MenuItem value="03">千葉県</MenuItem>
                                            <MenuItem value="04">埼玉県</MenuItem>
                                        </Select>
                                    </td>
                                </tr>
                            </table>
                            <div class="btn-search-modal">
                                <Button variant="contained" color="inherit" onClick={()=>navigate('/search_result')}>検索</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>                
        </div>
    </div>
    );
}
export default useTopSearchModal;