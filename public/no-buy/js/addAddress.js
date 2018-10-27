$(function(){
    //三级联动城市选择框
    var cityPicker=new mui.PopPicker({layer:3});
    cityPicker.setData(cityData);
    var showCityPickerButton=document.querySelector('#showCityPicker');
    showCityPickerButton.addEventListener('tap',function(e){
        cityPicker.show(function(items){
            $('[name="address"]').val((items[0] || {}).text + (items[1] || {}).text + (items[2] || {}).text);

        })
    },false)

    var flag=true;

    //根据地址蓝的id参数判断是否修改地址
    if(getParamsByUrl(location.href,'id')){
        flag=false;
        $.ajax({
            url:'/address/queryAddress',
            method:'get',
            success:function(result){
                for(var i=0;i<result.length;i++){
                    if(result[i].id==getParamsByUrl(location.href,'id')){
                        $('[name="address"]').val(result[i].address);
						$('[name="addressDetail"]').val(result[i].addressDetail);
						$('[name="recipients"]').val(result[i].recipients);
						$('[name="postcode"]').val(result[i].postCode);
                    }
                }
            }
        })
    }

    //添加收货地址
    $('#addAdress').on('tap',function(){
        var This=$(this);
        var url='/address/addAddress';
        var data={
            address:$.trim($('[name="address"]').val()),
			addressDetail:$.trim($('[name="addressDetail"]').val()),
			recipients:$.trim($('[name="recipients"]').val()),
			postcode:$.trim($('[name="postcode"]').val())
        }

        if(!data.address){
            mui.toast('请选择地址');
            return;
        }
        if(!data.addressDetail){
            mui.toast('请输入详细地址');
            return;
        }
        if(!data.recipients){
            mui.toast('请输入收货人');
            return;
        }
        if(!data.postcode){
            mui.toast('请输入邮箱编码');
            return;
        }

        //修改收货地址

        if(!flag){
            data.id=getParamsByUrl(location.href,'id');
            url='/address/updateAddress';
        }

        $.ajax({
            url:url,
            type:'post',
            data:data,
            beforeSend:function(){
                This.html('正在'+(flag ? '添加' : '修改') + '收货地址');
            },
            success:function(result){
                if(result.success){
                    location.href="address.html";
                }else{
                    mui.toast(result.message)
                }
            }
        })
    })
})