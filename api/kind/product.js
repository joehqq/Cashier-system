import request from '@/api/request.js'

function productList(data){
	return request({
		url: '/api/leju/front/product/list',
		method: 'get',
		data
	})
}
function detail(data){
	return request({
		url: '/api/leju/front/product/detail',
		method: 'get',
		data
	})
}
export default {
	productList,
	detail
}