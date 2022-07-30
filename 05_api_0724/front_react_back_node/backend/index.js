// NodeJsのexpressとはNodeJsで利用できるWebアプリケーションフレームワーク。
// ---------------express、MySQL、path、portを初期化する------------------------------------
// expressを呼び出し変数expressに格納
// （Nodejsのようにサーバー側でJsを実行する場合はimportやscriptタグが使えないためrequire）
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const mysql = require('mysql2');
const path = require('path');
// Stripe機能を実現させるためのもの
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3001;

// ---------------ミドルウェアとしての設定------------------------------------
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// ---------------MySQLの接続情報【START】------------------------------------
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Reototetu33',
  database: 'future_db_01'
});

// ---------------------------------------------------
//          各種APIは以下に記載すること
// ---------------------------------------------------

// image情報に関するAPI
app.post("/api/test", (req,res)=>{
  console.log('いけてるね');

  let erUserId  = req.body.user_id;
  console.log(req.files.profileFile)
  // バック画像が更新されている場合は、バック画像をMySQLに登録する
  if(req.files.file){
    let imageFile = req.files.file;
    let uploadPath = './frontend/public/uploads/uploads-backImg-er/' +imageFile.name;
    console.log("バック画像を更新するよ"+imageFile.name);

    // バック画像ファイルを指定のディレクトリに格納する処理
    imageFile.mv(uploadPath, function(err){
      if(err)return console.log("バック画像アップロードに失敗しました");
      console.log("バック画像のアップロードに成功しました")
    })
  // DBに画像ファイルの名前を追加して保存
  connection.query(
    `UPDATE T_ER_USER_MYPAGE_INF`
    +` SET  BACK_IMG = `+`'`+`${imageFile.name}`+`'`
    +` WHERE PK_ER_USER_ID = `+`'`+`${erUserId}`+`'`,
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
    }
  );
  console.log("接続終了(正常)");
  }


  // プロフィール画像が更新されている場合は、プロフィール画像をMySQLに登録する
  if(req.files.profileFile){
    let imageProfileFile = req.files.profileFile;
    let uploadPathProfile = './frontend/public/uploads/uploads-profileImg-er/' +imageProfileFile.name;
    console.log("プロフィール画像を更新するよ"+imageProfileFile.name);
    // プロフィール画像ファイルを指定のディレクトリに格納する処理
    imageProfileFile.mv(uploadPathProfile, function(err){
      if(err)return console.log("プロフィール画像アップロードに失敗しました");
      console.log("プロフィール画像のアップロードに成功しました")

    // DBに画像ファイルの名前を追加して保存
    connection.query(
      `UPDATE T_ER_USER_MYPAGE_INF`
      +` SET PROFILE_IMG = `+`'`+`${imageProfileFile.name}`+`'`
      +` WHERE PK_ER_USER_ID = `+`'`+`${erUserId}`+`'`,
      function(err, results, fields) {
        if(err) {
          console.log("接続終了(異常)");
          throw err;
        }
      }
    );
    console.log("接続終了(正常)");

    })
  }






});

// 1. ユーザー情報の作成関連のAPI----------------------------------------------------
// トレーニーのユーザ情報を登録するために、ユーザーIDの最大値を取得するAPI
app.get("/api", (req, res) => {
  connection.query(
    'SELECT LPAD(IfNull(MAX(PK_EE_USER_ID)+1,0000000001),10,0) as PK_EE_USER_ID FROM `T_EE_USER_KHN`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({user_id: results[0].PK_EE_USER_ID});
    }
  );
  console.log("接続終了(正常)");
});

// トレーニーのユーザ情報を登録するAPI
app.get("/api/tork", (req, res) => {
  const user_id = req.query.user_id;
  const nick_name = req.query.nick_name;
  const sexkbn = req.query.sexkbn;
  const birthday = req.query.birthday;
  const telno = req.query.telno;
  const address1 = req.query.address1;
  
  const email = req.query.email;
  const id = req.query.id;
  const password = req.query.password;

  connection.query(
    'INSERT INTO `T_EE_USER_KHN` SET ?',
    {PK_EE_USER_ID:user_id
      , NICK_NAME:nick_name
      , SEX_KBN:sexkbn
      , BIRTH_DAY:birthday
      , TEL_NO:telno
      , ADDRESS1:address1
      , MAIL_ADDRESS:email
      , ID:id
      , PASSWORD:password},

      function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
    }
  );
  console.log("接続終了(正常)");
});

// トレーナーのユーザ情報を登録するために、ユーザーIDの最大値を取得するAPI
 app.get("/api/search/user_id_er", (req, res) => {
  connection.query(
    'SELECT LPAD(IfNull(MAX(PK_ER_USER_ID)+1,0000000001),10,0) as PK_ER_USER_ID FROM `T_ER_USER_KHN`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({user_id: results[0].PK_ER_USER_ID});
    }
  );
  console.log("接続終了(正常)");
});

// トレーナーのユーザ情報を登録するAPI
app.get("/api/tork/er", (req, res) => {
  const user_id = req.query.user_id;
  const nick_name = req.query.nick_name;
  const sexkbn = req.query.sexkbn;
  const birthday = req.query.birthday;
  const telno = req.query.telno;
  const address1 = req.query.address1;
  
  const email = req.query.email;
  const id = req.query.id;
  const password = req.query.password;

  connection.query(
    'INSERT INTO `T_ER_USER_KHN` SET ?',
    {PK_ER_USER_ID:user_id
      , NICK_NAME:nick_name
      , SEX_KBN:sexkbn
      , BIRTH_DAY:birthday
      , TEL_NO:telno
      , ADDRESS1:address1
      , MAIL_ADDRESS:email
      , ID:id
      , PASSWORD:password},

      function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
    }
  );
  console.log("接続終了(正常)");
});

// 2. マイページの作成関連のAPI------------------------------------------------------------------
// マイページ（トレーナー用）で編集後に登録ボタン押下時にMERGEするクエリ
app.get("/api/tork/er_mypage", (req, res) => {
  const user_id = req.query.user_id;
  const eigyo_start_time = req.query.eigyoStartTime;
  const eigyo_end_time = req.query.eigyoEndTime;
  const hitokoto_message = req.query.hitokotoMessage;
  // const er_mypage_back_img = req.query.erMypageBackImg;

  connection.query(
    'INSERT INTO T_ER_USER_MYPAGE_INF  '
  +  '(PK_ER_USER_ID, EIGYO_START_TIME, EIGYO_END_TIME, HITOKOTO_MESSAGE) '
  +  'VALUES '
  +  '(?, ?, ?, ?) '
  +  'ON DUPLICATE KEY UPDATE '
  +  'EIGYO_START_TIME  =? , ' 
  +  'EIGYO_END_TIME    =? , '
  +  'HITOKOTO_MESSAGE  =? '
      ,
  [
    user_id
  , eigyo_start_time
  , eigyo_end_time
  , hitokoto_message
  , eigyo_start_time
  , eigyo_end_time
  , hitokoto_message
],
      function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
    }
  );
  console.log("接続終了(正常)");
});

// マイページ（トレーナー用）でバック画像やプロフィール画像をアップロードしたときにDBに保存する処理
app.get("/api/tork/er_mypage_back_img", (req, res) => {
// requestに画像情報がなければ、同じ画像を更新する（つまり変更しないようにする）
  const user_id = req.query.user_id;
  const eigyo_start_time = req.query.eigyoStartTime;
  const eigyo_end_time = req.query.eigyoEndTime;
  const hitokoto_message = req.query.hitokotoMessage;

  connection.query(
    'INSERT INTO T_ER_USER_MYPAGE_INF  '
  +  '(PK_ER_USER_ID, EIGYO_START_TIME, EIGYO_END_TIME, HITOKOTO_MESSAGE) '
  +  'VALUES '
  +  '(?, ?, ?, ?) '
  +  'ON DUPLICATE KEY UPDATE '
  +  'EIGYO_START_TIME  =? , ' 
  +  'EIGYO_END_TIME    =? , '
  +  'HITOKOTO_MESSAGE  =? '
      ,
  [
    user_id
  , eigyo_start_time
  , eigyo_end_time
  , hitokoto_message
  , eigyo_start_time
  , eigyo_end_time
  , hitokoto_message],
      function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
    }
  );
  console.log("接続終了(正常)");
});


// 3. 検索時のAPI------------------------------------------------------------------
// 検索ボタン押下時に詳細条件に応じた検索をするクエリ
// MVPにおいては自分の所属しているジムに登録されているトレーナーを一覧化するだけで良い。
app.get("/api/search/user_er_all", (req, res) => {
  connection.query(
    'SELECT' 
   +'  khn.PK_ER_USER_ID'
   +' , khn.NICK_NAME'
   +' , inf.EIGYO_START_TIME'
   +' , inf.EIGYO_END_TIME'
   +' , inf.HITOKOTO_MESSAGE'
   +' , inf.PROFILE_IMG'
   +' , inf.RANK '
   +'FROM '
   +' T_ER_USER_MYPAGE_INF inf '
   +'INNER JOIN T_ER_USER_KHN khn '
   +' on inf.PK_ER_USER_ID = khn.PK_ER_USER_ID',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({userEeData: results});
    }
  );
  console.log("接続終了(正常)");
});

// ログイン画面（トレーニー用）で、パーソナルトレーナーを検索する
app.get("/api/search/user_er_login", (req, res) => {
  const id = req.query.id;
  const password = req.query.password;
  console.log(id+password);
  connection.query(
    'SELECT * FROM `T_ER_USER_KHN` WHERE ID=? AND PASSWORD=?',
      [id,password],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({results});
      console.log(results);
    }
  );
  console.log("接続終了(正常)");
});

// マイページ画面（トレーナー用）で、マイページ情報を表示する
app.get("/api/search/user_er_mypage", (req, res) => {
  const er_user_id = req.query.er_user_id;
  connection.query(
    'SELECT * FROM `T_ER_USER_MYPAGE_INF` WHERE PK_ER_USER_ID=?',
      [er_user_id],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({results});
      console.log(results);
    }
  );
  console.log("接続終了(正常)");
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
});


// 4. Stripeによる決済を可能とするAPI------------------------------------------------------------------
app.post("/api/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

// 5. リスニング処理------------------------------------------------------------------
app.listen(port, () => {
  console.log(`バックエンドサーバー起動　ポート番号 *:${port}`);
})