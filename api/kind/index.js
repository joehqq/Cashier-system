import request from '@/api/request.js'

function kindList(data){
	return request({
		url: '/api/leju/front/kind/list',
		method: 'get',
		data
	})
}

export default {
	kindList
}