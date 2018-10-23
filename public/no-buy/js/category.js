$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
	});
	

	$('nav').on('tap','a',function(){
        window.location.href=this.href;
    })
})

$(function(){
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function(result){
            console.log(result)
            var html=template('category-left',{data:result.rows});
            $('.menu-list').html(html);

            if(result.rows.length > 0){

				var id = result.rows[0].id;

				$.ajax({
					type:'get',
					url:'/category/querySecondCategory',
					data:{
						id:id
					},
					success:function(result){
						$('#rightCate').html(template('rightCateTpl',{data:result.rows}))

						$('.menu-list').find('a:first-child').addClass('active');

					}
				})

			}
        }
    })


    $('body').on('tap','.getSecond',function(){
		
		var id = $(this).attr('data-id');

		$(this).addClass('active').siblings().removeClass('active');

		$.ajax({
			type:'get',
			url:'/category/querySecondCategory',
			data:{
				id:id
			},
			success:function(result){
				$('#rightCate').html(template('rightCateTpl',{data:result.rows}))
			}
		})

	});


})