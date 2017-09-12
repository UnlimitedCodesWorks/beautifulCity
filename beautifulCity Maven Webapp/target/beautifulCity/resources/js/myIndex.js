window.onload=function(){
    document.getElementById("nav").getElementsByTagName("li")[0].style.backgroundColor="rgba(255, 255, 255, 0.3)";
    var myarray=["assets/images/index1.jpg","assets/images/index2.jpg","assets/images/index3.jpg","assets/images/index4.jpg","assets/images/index1.jpg","assets/images/index6.jpg","assets/images/index1.jpg","assets/images/index8.jpg","assets/images/index9.jpg","assets/images/index10.jpg"];
    var firstLi=document.getElementById("firstInfo").getElementsByTagName("li");
    var secondLi=document.getElementById("secondInfo").getElementsByTagName("li");
    var rowHeight=document.getElementById("newContent").clientHeight;
    if(myarray.length<=5){
        for(var i=0;i<myarray.length;i++){
            firstLi[i].getElementsByTagName("img")[0].src=myarray[i];
        }
    }
    else if(myarray.length>5&&myarray.length<=10){
        for(var i=0;i<myarray.length;i++){
            if(i<5){
                firstLi[i].getElementsByTagName("img")[0].src=myarray[i];
                firstLi[i].style.height=rowHeight+"px";    //设高
                firstLi[i].getElementsByTagName("img")[0].style.height="100%";    //设高
            }
            else if(i>=5&&i<10){
                secondLi[i-5].getElementsByTagName("img")[0].src=myarray[i];
                secondLi[i-5].style.height=rowHeight+"px";        //设高
                secondLi[i-5].getElementsByTagName("img")[0].style.height="100%";//设高
            }
        }
    }
    var node=0;
    var timerImage=window.setInterval(function(){
            if(node!=2){
                document.getElementById("newInfo").style.top=node*(-rowHeight)+"px";
                node++;
            }
            else{
                node=0;
                document.getElementById("newInfo").style.top=0+"px";
                node++;
            }
       },3000);
    for(var i=0;i<firstLi.length;i++){
        firstLi[i].num=i;
        firstLi[i].onmouseover=function(){
            firstLi[this.num].getElementsByTagName("a")[0].style.bottom=0+"px";
        }
        firstLi[i].onmouseout=function(){
            firstLi[this.num].getElementsByTagName("a")[0].style.bottom=-29+"px";
        }
    }
    for(var i=0;i<secondLi.length;i++){
        secondLi[i].num=i;
        secondLi[i].onmouseover=function(){
            secondLi[this.num].getElementsByTagName("a")[0].style.bottom=0+"px";
        }
        secondLi[i].onmouseout=function(){
            secondLi[this.num].getElementsByTagName("a")[0].style.bottom=-29+"px";
        }
    }
    var rankLi=document.getElementById("rankInfo").getElementsByTagName("li");
    for(var i=0;i<rankLi.length;i++){
        rankLi[i].onmouseover=function(){
            this.style.color="red";
        }
        rankLi[i].onmouseout=function(){
            this.style.color="black";
        }
    }
    var guessLi=document.getElementById("guessInfo").getElementsByTagName("li");
    for(var i=0;i<guessLi.length;i++){
        guessLi[i].onmouseover=function(){
            this.style.color="red";
        }
        guessLi[i].onmouseout=function(){
            this.style.color="black";
        }
    }



    //以下是地图:
    // var markers=[];
    var map=new AMap.Map('myMap',{
        mapStyle: 'amap://styles/6bc0ab51fc148bb0041f941ce84c6005',
        scrollWheel:false,
        zoom:4,
        resizeEnable: true,
        center:[105,34]
    });


    //搜索乡村！！！
    map.plugin(['AMap.ToolBar'],function(){
        var tool=new AMap.ToolBar();
        map.addControl(tool);
    });
    document.getElementById("find").getElementsByTagName("div")[0].onclick=function(){
        var findContent=document.getElementById("findContent").value;
        addAddress(findContent);
    };


    //find加载地址插件！！！！
    function addAddress(address){
        var geocoder;
        map.plugin(['AMap.Geocoder'],function(){
            geocoder=new AMap.Geocoder({
                radius:1000,
                batch:false,
                extensions: "all"
            });
            map.addControl(geocoder);
        });
        geocoder.getLocation(address,function(status,result){
            if (status === 'complete' && result.info === 'OK'){
                geocoder_CallBack(result);
            }
        });
    }


    //转化find地址--------->经度纬度！
    function geocoder_CallBack(data){
         var resultStr = "";
         var geocode = data.geocodes;
         for (var i = 0; i < geocode.length; i++){
            resultStr += "<span style=\"font-size: 12px;color:black;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" + "<b>地址</b>：" + geocode[i].formattedAddress + "" + "&nbsp;&nbsp;<b>的地理编码结果是:</b><b>&nbsp;&nbsp;&nbsp;&nbsp;坐标</b>：" + geocode[i].location.getLng() + ", " + geocode[i].location.getLat() + "" + "<b>&nbsp;&nbsp;&nbsp;&nbsp;匹配级别</b>：" + geocode[i].level + "</span>";
            addMarker(geocode[i]);
         }
         map.setFitView();
         document.getElementById("result").innerHTML = resultStr;
    }


    //标记find地址名
    function addMarker(d){
        // map.clearMap();
        var marker = new AMap.Marker({
            map: map,
            position: [ d.location.getLng(),  d.location.getLat()],
            draggable: true,
            cursor: 'move',
            raiseOnDrag: true
        });
    }


    //乡村编辑,自动生成信息窗和标记！！！！
    var villPlace="千岛湖";             //数据库!!!!!!!!!!!!!!!!!!!!!!!!!!! item.xxx
    var villContent="位于中国浙江省杭州西郊淳安县境内，东距杭州129千米、西距黄山140千米。";//item.xxx
    var villImage="assets/images/index2.jpg";        //item.xxx

    //加信息窗！！！！！！！
    var infoWindow=new AMap.InfoWindow({
        isCustom: true,
        content:createInfoWindow(villPlace,villContent,villImage),       //item.xxx
        offset: new AMap.Pixel(16, -45)
    });
    addressInfo(villPlace);             //item.xxx


    //信息窗加载地址插件
    function addressInfo(villPlace){
        var geo;
        map.plugin(['AMap.Geocoder'],function(){
            geo=new AMap.Geocoder({
                radius:500,
                batch:false,
                extensions: "all"
            });
            map.addControl(geo);
        });
        geo.getLocation(villPlace,function(status,result){
            if (status === 'complete' && result.info === 'OK'){
                callback(result);
            }
        });
    }


    //转化信息窗地址--------->经度纬度！！！！！再生成标记！！！
    function callback(place){
        var code=place.geocodes;
        for (var i = 0; i < code.length; i++){
            var Marker = new AMap.Marker({
                map:map,
                position:[ code[i].location.getLng(),  code[i].location.getLat()],
                content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 10px; width: 10px; border: 1px solid hsl(180, 100%, 40%); border-radius: 5px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>'
            });
            // markers.push(Marker);
            // alert(markers[0].getPosition());
            AMap.event.addListener(Marker,'click',function(){
                infoWindow.open(map,Marker.getPosition());
            });
        }
    }



    //加信息窗内容！！！！！！！！
    function createInfoWindow(title,content,img){
        var info = document.createElement("div");
        info.className="info";
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        titleD.onclick = openPlace;
        closeX.src = "assets/images/close.png";
        closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        var middleImg=document.createElement("div");
        var divImg=document.createElement("img");
        divImg.src=img;
        var middleContent=document.createElement("div");
        middleContent.innerHTML=content;

        middleImg.appendChild(divImg);
        middle.appendChild(middleImg);
        middle.appendChild(middleContent);
        info.appendChild(middle);
        return info;
    }


    //关闭信息窗！！！
    function closeInfoWindow() {
        map.clearInfoWindow();
    }


    //乡村文化等介绍！！！！！！！
    function openPlace(){
        alert(this.innerHTML);
    }
}