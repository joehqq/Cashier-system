import http from './request.js'
// 获取验证码
function yzm(data){
	return http({
		url: '/system/getCode',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
function yzms(data){
	return http({
		url: '/system/getCode/id',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 登录
 function login(data) {
  return http({
    url: '/system/login',
    method: 'POST',
	data
  })
}
//详情
function info(data){
	return http({
		url: '/business/cash-out/info',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
function infos(data){
	return http({
		url: '/business/xs-dj2020/info',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 首页数据

function income(data){
	return http({
		url: '/business/xs-dj2020/income',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
function cash(data){
	return http({
		url: '/business/cash-out/list',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
function business(data){
	return http({
		url: '/business/xs-dj2020/list',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
// 更换手机号
function update(data){
	return http({
		url: '/business/xt-dmb/update/verification',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
function mobile(data){
	return http({
		url: '/business/xt-dmb/update/mobile',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
// 修改银行卡
function yhkupdate(data){
	return http({
		url: '/business/xt-dmb/update',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
// 微信登录
function wx(data){
	return http({
		url: '/system/mobile-wx',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}

// 获取全部订单
function orderall(data){
	return http({
		url: '/business/xs-dj2020/list/mx',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
// 订单的到账金额和销售金额
function amount(data){
	return http({
		url: '/business/xs-dj2020/amount/month',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 每日报表金额排行
function businessamount(data){
	return http({
		url: '/business/xs-dj2020/amount',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
function total(data){
	return http({
		url: '/business/xs-dj2020/total',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
//获取指定日期的销售收入与销售数量
function day(data){
	return http({
		url: '/business/xs-dj2020/amount/day',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}

//获取指定月份和日的提现金额
function outam(data){
	return http({
		url: '/business/cash-out/amount',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
//累计体现金额
function payed(data){
	return http({
		url: '/business/cash-out/sum/payed',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
//修改用户信息
function businessupdate(data){
	return http({
		url: '/business/xt-dmb/update',
		method: 'post', // 严格区分大小写,必须是大写
		data
	})
}
export default {
	yzm,
	login,
	payed,
	yzms,
	business,
	total,
	orderall,
	day,
	income,
	info,
	wx,
	businessupdate,
	outam,
	businessamount,
	amount,
	update,
	mobile,
	cash,
	infos,
	yhkupdate
}