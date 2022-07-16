import { BrowserRouter, Routes, Route } from "react-router-dom";
import Component_EE_Form_NickName from "./component/component_EE/Component_EE_Form_NickName";
import Component_EE_Form_Sex from "./component/component_EE/Component_EE_Form_Sex";
import Component_EE_Form_Address from "./component/component_EE/Component_EE_Form_Address";
import Component_EE_Form_BirthDay from "./component/component_EE/Component_EE_Form_BirthDay";
import Component_EE_Form_Mail from "./component/component_EE/Component_EE_Form_Mail";
import Component_EE_Form_Tel from "./component/component_EE/Component_EE_Form_Tel";
import Component_EE_Form_Mktk from "./component/component_EE/Component_EE_Form_Mktk";
import Component_EE_Form_IdPassword from "./component/component_EE/Component_EE_Form_IdPassword";
import Component_EE_Form_Sishu_Kknn from "./component/component_EE/Component_EE_Form_Sishu_Kknn";


import Component_ER_Form_Name from "./component/component_ER/Component_ER_Form_Name";
import Component_ER_Form_Sex from "./component/component_ER/Component_ER_Form_Sex";
import Component_ER_Form_Address from "./component/component_ER/Component_ER_Form_Address";
import Component_ER_Form_BirthDay from "./component/component_ER/Component_ER_Form_BirthDay";
import Component_ER_Form_Mail from "./component/component_ER/Component_ER_Form_Mail";
import Component_ER_Form_Tel from "./component/component_ER/Component_ER_Form_Tel";
import Component_ER_Form_IdPassword from "./component/component_ER/Component_ER_Form_IdPassword";
import Component_ER_Form_Sishu_Kknn from "./component/component_ER/Component_ER_Form_Sishu_Kknn";


import Top_search_modal from "./Top/top_search_modal";
import Top from "./Top/top";
import Search_result from "./Top/search_result";



const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                // 初期遷移の際のTop画面
                <Route path="/" element={<Top/>}/>
                // マイページ登録の際のコンポーネント群（トレーニング希望者用）
                <Route path="/Component_EE_Form_NickName" element={<Component_EE_Form_NickName/>}/>                
                <Route path="/Component_EE_Form_Sex" element={<Component_EE_Form_Sex/>}/>
                <Route path="/Component_EE_Form_Address" element={<Component_EE_Form_Address/>}/>
                <Route path="/Component_EE_Form_BirthDay" element={<Component_EE_Form_BirthDay/>}/>
                <Route path="/Component_EE_Form_Mail" element={<Component_EE_Form_Mail/>}/>
                <Route path="/Component_EE_Form_Tel" element={<Component_EE_Form_Tel/>}/>
                <Route path="/Component_EE_Form_Mktk" element={<Component_EE_Form_Mktk/>}/>
                <Route path="/Component_EE_Form_IdPassword" element={<Component_EE_Form_IdPassword/>}/>
                <Route path="/Component_EE_Form_Sishu_Kknn" element={<Component_EE_Form_Sishu_Kknn/>}/>
                // マイページ登録の際のコンポーネント群（パーソナルトレーナー用）
                <Route path="/Component_ER_Form_Name" element={<Component_ER_Form_Name/>}/>                
                <Route path="/Component_ER_Form_Sex" element={<Component_ER_Form_Sex/>}/>
                <Route path="/Component_ER_Form_Address" element={<Component_ER_Form_Address/>}/>
                <Route path="/Component_ER_Form_BirthDay" element={<Component_ER_Form_BirthDay/>}/>
                <Route path="/Component_ER_Form_Mail" element={<Component_ER_Form_Mail/>}/>
                <Route path="/Component_ER_Form_Tel" element={<Component_ER_Form_Tel/>}/>
                <Route path="/Component_ER_Form_IdPassword" element={<Component_ER_Form_IdPassword/>}/>
                <Route path="/Component_ER_Form_Sishu_Kknn" element={<Component_ER_Form_Sishu_Kknn/>}/>


                <Route path="/top_search_modal" element={<Top_search_modal/>}/>

                <Route path="/search_result" element={<Search_result/>}/>

            </Routes>
        </BrowserRouter>
    )
}
export default Routers