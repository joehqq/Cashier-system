function toast(title, duration = 3000) {
	uni.showToast({
		title: title,
		icon: 'none',
		duration: duration
	})
}

export default toast
