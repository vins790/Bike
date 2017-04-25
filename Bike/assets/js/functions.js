        function loadBikes(){
            $.ajax({
            url: "assets/php/bikes.php",
            data: "",
            dataType: "text",
            success: function(data){
                $("#bikes-table").empty();
                var items = []; 
                $.each(JSON.parse(data), function(id,json) {
                   var color1;
                   if(json.czy_sprawny==1){
                       color1="green";
                   }else{
                       color1="red";
                   }
                   var date  = new Date(json.dataWaznosci);
                   var today = new Date();
                   var color2 = "green";
                   if(date<today)
                       color2 = "red";
                    
                   items.push("<tr id='" + json.id_roweru + "'><td>#<span>" + json.id_roweru + "</span></td><td><i class='fa fa-circle'     aria-hidden='true' id=" + color1 + "></i></td><td><i class='fa fa-circle' aria-hidden='true' id=" + color2 + "></i>");
                   $("#bikes-table").html(items);
                });
                },
            error: function(){}
        });};

        function bikeInfo(b_id){
            $.ajax({
            type: "POST",
            url: "assets/php/bikeInfo.php",
            data: {bikeID : b_id},
            dataType: "text",
            success: function(data){
                $("#bikeInfo").empty();
                var items = []; 
                $.each(JSON.parse(data), function(id,json) {
                  
                    
               items.push('<li class="list-group-item">ID roweru : #<span id="bikeID">'+ b_id +'</span></li>'+
                         '<li class="list-group-item">Status : ' + ((json.id_zapiecia!=null)?'wypożyczony':'wolny') +'</li>'+
                         '<li class="list-group-item">Stan : '+json.czy_sprawny+'</li>'+
                         '<li class="list-group-item"><p style="text-align:left;">Data ostatniego przeglądu : '+
                         '<div id="inspectionDate"><span>'+json.dataPrzegladu+'</span>'+
                         '<span style="float:right;" id="date1" tag="off"><i class="fa fa-pencil-square-o" aria-hidden="true">'+
                         '</i></span></div></p></li>'+
                         '<li class="list-group-item"><p style="text-align:left;">Data następnego przeglądu : '+
                         '<div id="expireDate"><span>'+json.dataWaznosci+'</span>'+
                         '<span style="float:right;" id="date2" tag="off"><i class="fa fa-pencil-square-o" aria-hidden="true">'+
                         '</i></span></div></p></li>');
               $("#bikeInfo").html(items);
                });
                },
            error: function(){}
        });};

        function editDate(clicked){
            var divID = $(clicked).parent().prop("id");
            var currentDate = $("#" + divID + " > span:nth-of-type(1)").text();
            $("#"+divID).empty().html('<input class="text" placeholder="yyyy-mm-dd"></input>  '+ 
                                     '<i class="fa fa-check" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i>');
            
            $(document).on('click', '#' + divID + ' > i:nth-of-type(2)',function(){
                $("#"+divID).empty().html('<span>' + currentDate + '</span>'+
                '<span style="float:right;" id="date2" tag="off"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>');
            });
            
            $(document).on('click', '#' + divID + ' > i:nth-of-type(1)',function(){
               var bikeID = $('span[id="bikeID"]').text();
               var date = $("#"+divID+" > input").val();
               var vars = "postBikeID="+bikeID+"&postDate="+date;
        
               if(clicked == "#date1"){
                   $.ajax({
                    type: "POST",
                    url: "assets/php/inspectionDate.php",
                    data: {postBikeID:bikeID,postDate:date},
                    dataType: "text",
                    success: function(){
                        bikeInfo(bikeID);
                    }});
               }else if(clicked == "#date2"){
                   $.ajax({
                    type: "POST",
                    url: "assets/php/expireDate.php",
                    data: {postBikeID:bikeID,postDate:date},
                    dataType: "text",
                    success: function(){
                        bikeInfo(bikeID);
                    }});
               }
            });
        };

        function loadFaulties(){
            $.ajax({
            url: "assets/php/faulties.php",
            data: "",
            dataType: "text",
            success: function(data){
                $("#faulties-list").empty();
                var items = []; 
                $.each(JSON.parse(data), function(id,json) {
                   var color;
                   if(json.status==1){
                       color="red";
                   }else if(json.status==0){
                       color="green";
                   }else if(json.status==2){
                       color="yellow";
                   }else{
                       color=null;
                   }
                
                   items.push("<tr id='" + json.id_awarii + "'><td>#<span>" + json.id_awarii + "</span></td><td><i class='fa fa-circle' aria-hidden='true' id=" + color + "></i>");
                   $("#faulties-list").html(items);
                });
                },
            error: function(){}
        });}
        
        function loadServisants(){
        $.ajax({
            url: "assets/php/servisants.php",
            data: "",
            dataType: "text",
            success: function(data){
                $("#servisants-list").empty();
                var items = [];
                $.each(JSON.parse(data), function(id,json) {
                    items.push("<tr id='" + json.id_serwis + "'><td>#<span>" + json.id_serwis + "</span><td></tr>");
                });
                $("#servisants-list").html(items);
            },
            error: function(){}
        });}
        
        function deleteFault(faultID){  
        $.ajax({
            type: "POST",
            url: "assets/php/faultDelete.php",
            data: {fault: faultID},
            success: function(data){
                alert(data);
                coutOrders(data);
                loadOrders(data);
                loadFaulties();
            },
            error: function(){}
        });}
        
        function loadOrders(servisID){
        $.ajax({
            type: "POST",
            url: "assets/php/orders.php",
            data: {id: servisID},
            dataType: "text",
            success: function(data){
                $("#orders-list").empty();
                var items = [];
                $.each(JSON.parse(data), function(id, json){
                    items.push("<tr id='" + json.id_awarii + "'><td>#<span>" + json.id_awarii + "</span></td></tr>");
                })
                $("#orders-list").html(items);
            },
            error: function(){}
        });}
        
        function coutOrders(servisID){
          $.ajax({
                type: "POST",
                url: "assets/php/ordersCounter.php",
                data: {servis: servisID},
                success: function(data){
                    $('li[id="faultAmount"] > span').empty();
                    $('li[id="faultAmount"] > span').append(data);
                },
                error: function(){}
        });}
        
        function servisInfo(servisID){
                $.ajax({
                type: "POST",
                url: "assets/php/servisInfo.php",
                data: {servis: servisID},
                success: function(data){
                    $('li[id="servis-id"] > span').empty();
                    $('li[id="name"] > span').empty();
                    $('li[id="surname"] > span').empty();
                    $('li[id="mail"] > span').empty();
                    
                    $('li[id="servis-id"] > span').append(servisID);
                    $('li[id="name-id"] > span').append(data['imie']);
                    $('li[id="surname"] > span').append(data['nazwisko']);
                    $('li[id="mail"] > span').append(data['mail']);
                },
                error: function(){}
        });}
        
        function faultInfo(faultID){
                $.ajax({
                type: "POST",
                url: "assets/php/faultInfo.php",
                data: {fault: faultID},
                success: function(data){
                    
                    $('li[id="fault-id"] > span').empty();
                    $('li[id="bike-id"] > span').empty();
                    $('li[id="description"] > span').empty();
                    
                    $('li[id="fault-id"] > span').append(faultID);
                    $('li[id="bike-id"] > span').append(data['id_rower']);
                    $('li[id="description"] > span').append(data['opis']);
                    
                    
                    $('div[id="status"]').empty();
                    
                    var status=data['status'];
                    
                    if(status=="0") {
                        $('div[id="status"]').css("background-color",'rgba(0, 255, 0, 0.5)');
                        $('div[id="status"]').text("OK");
                        $('div[id="show-servis"]').css("display","block");
                    }else if(status=="1") {
                        $('div[id="status"]').css("background-color",'rgba(255, 0, 0, 0.5)');
                        $('div[id="status"]').text("awaria");
                        $('div[id="show-servis"]').css("display","none");
                    }else if(status=="2") {
                        $('div[id="status"]').css("background-color",'rgba(255, 255, 0, 0.5)');
                        $('div[id="status"]').text("w toku");
                        $('div[id="show-servis"]').css("display","block");
                    }
                },
                error: function(){}
            });}
        
        function addOrder(IDs){
            var array = JSON.parse("[" + IDs + "]"); 
            $.ajax({
            type: "POST",
            url: "assets/php/addOrder.php",
            data: {array: JSON.stringify(IDs)},
            success: function(data){
                loadOrders(array[1]);
                loadFaulties();
                coutOrders(array[1]);
                faultInfo(array[0]);
            },
            error: function(){}
        });}
        
        function oddOrder(faultID){
            if(faultID)
            $.ajax({
                type: "POST",
                url: "assets/php/oddOrder.php",
                data: {id: faultID},
                success: function(data){
                    if(data){
                        loadOrders(data);
                        coutOrders(data);
                        loadFaulties();
                        faultInfo(faultID);
                    }
                },
                error: function(){}
            });
        }


        function go(from, to, func){
            $("#contener").hide(300);
            $("#"+to).css("display", "block");
            $("#"+from).css("display", "none");
            if(arguments.length ==3 ){
             func();   
            }
            $("#contener").fadeToggle(300);
        };
