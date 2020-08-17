import http from './request.js'
//累计到账
function letxje(data){
	return http({
		url: '/finace/total',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 每日到账
function ledz(data){
	return http({
		url: '/finace/day/amount',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 提现详情
function txxq(data){
	return http({
		url: '/finace/info',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 提现记录
function txjl(data){
	return http({
		url: '/finace/list',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
//立即体现
function ljtx(data){
	return http({
		url: '/finace/cash-out',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
//add del 商品
function add(data){
	return http({
		url: '/business/dmb-spzl/add',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
function del(data){
	return http({
		url: '/business/dmb-spzl/del',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
//获取商户信息
function list(data){
	return http({
		url: '/business/kc-spzl/list',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
// 提现

function businesstxjs(data){
	return http({
		url: '/business/user/info',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
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
		url: '/business/dj-sk/income',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
function cash(data){
	return http({
		url: '/business/cash-out/list',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
function business(data){
	return http({
		url: '/business/dj-sk/list/all',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 更换手机号
function update(data){
	return http({
		url: '/business/user/update/verification',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}

function updatemobile(data){
	return http({
		url: '/business/user/update/mobile',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
function mobile(data){
	return http({
		url: '/system//getCode/new-mobile',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// 修改银行卡
function yhkupdate(data){
	return http({
		url: '/business/user/update',
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
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
function total(data){
	return http({
		url: '/business/xs-dj2020/total',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
// business
// cash
//获取指定日期的销售收入与销售数量
function day(data){
	return http({
		url: '/business/xs-dj2020/amount/day',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
function businessreal(data){
	return http({
		url: '/business/xs-dj2020/amount/real/day',
		method: 'GET', // 严格区分大小写,必须是大写
		data
	})
}
//商品管理数量
function spnum(data){
	return http({
		url: '/business/dmb-spzl/list',
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}
//获取指定月份和日的提现金额
function outam(data){
	return http({
		url: '/business/dj-sk/amount/month',
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
		url: '/business/user/update',
		method: 'post', // 严格区分大小写,必须是大写
		data
	})
}
export default {
	yzm,
	login,
	payed,
	list,
	ljtx,
	add,
	txjl,
	del,
	yzms,
	business,
	total,
	txxq,
	txjl,
	orderall,
	day,ledz,
	income,
	info,
	wx,
	spnum,
	businessupdate,
	businesstxjs,
	outam,
	businessamount,
	updatemobile,
	businessreal,
	amount,
	letxje,
	update,
	mobile,
	cash,
	infos,
	yhkupdate
}