$(function () {
	$('nav').on('tap', 'a', function () {
		window.location.href = this.href;
	})

	$('#searchBtn').on('click', function () {

		var keyword = $('#keyword').val();

		if (!keyword) {

			alert('请输入关键字');

			return;

		}

		if (localStorage.getItem('keywords')) {

			var keywords = JSON.parse(localStorage.getItem('keywords'));
			// alert(keywords.indexOf(keyword))
			if(keywords.indexOf(keyword)==-1){
				keywords.unshift(keyword);
				localStorage.setItem('keywords', JSON.stringify(keywords));
			}	
			
			
		} else {
			// console.log(123)
			localStorage.setItem('keywords', JSON.stringify([keyword]));

		}

		location.href = "search-list.html?key=" + keyword;


	});


	if (localStorage.getItem('keywords')) {

		var keywords = JSON.parse(localStorage.getItem('keywords'));

		$('#historySearch').html(template('historySearchTpl', {
			data: keywords
		}));

	}

	$('#clearHistory').on('tap', function () {

		localStorage.removeItem('keywords');

		$('#historySearch').html('');

	})

});