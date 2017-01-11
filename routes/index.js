
/*
 * GET home page.
 */

var postList = [
	{ id: 1, name: "Apple", msg: "I have a pen.‬" },
	{ id: 2, name: "Zoe", msg: "I have an apple." },
	{ id: 3, name: "Cathy", msg: "Unnnnnnnnn" }
]; 
var count = postList.length;

var Login = false;
var checkLogin = function(req, res){
	Login = false;
	if(req.signedCookies.userid && req.signedCookies.password){
		Login = true;
	}
}

//首頁
exports.index = function(req, res){
  checkLogin(req, res);
  res.render('index', { 
	  title: 'Express',
	  loginStatus: Login,
	  post: postList
  });
};

//註冊頁面
exports.reg = function(req, res){
	checkLogin(req, res);
	res.render( 'reg', {
		title : '註冊',
		loginStatus: Login
	});
};

//執行註冊
exports.doReg = function(req, res){
	if(req.body['Repassword'] != req.body['password']){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body['password']);
		console.log('第二次輸入的密碼：' + req.body['Repassword']);
		return res.redirect('/reg');
	}
	else{
		//register success, redirect to index
		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};

//登入頁面
exports.login = function(req, res){
	checkLogin(req, res);
	res.render( 'login', {
		title : '登入',
		loginStatus : Login
	});
};

//執行登入
exports.doLogin = function(req, res){
	if(req.body['Repassword'] != req.body['password']){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body['password']);
		console.log('第二次輸入的密碼：' + req.body['Repassword']);
		return res.redirect('/reg');
	}
	else{
		//register success, redirect to index
		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};

//執行登出
exports.logout = function(req, res){
	res.clearCookie('userid', { path: '/' });
	res.clearCookie('password', { path: '/' });
	return res.redirect('/');
};

//發表訊息
exports.post = function(req, res){
	var element = { id: count++, name: req.signedCookies.userid, msg: req.body['post'] };
	postList.push(element);

	return res.redirect('/');	
};

//使用者頁面
exports.user = function(req, res){
	var userName = req.params.user;
	var userPosts = [];
	
	for (var i = 0; i < postList.length; i++) { 
		if(postList[i].name == userName){
			userPosts.push(postList[i]);
		}
	}
	
	checkLogin(req, res);
	res.render( 'user', {
		title : userName + '的頁面',
		loginStatus : Login,
		post : userPosts
	});
	
};

