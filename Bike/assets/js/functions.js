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
            }    
        });};
        
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
            }    
        });}
        
        function deleteFault(faultID){  
        $.ajax({
            type: "POST",
            url: "assets/php/faultDelete.php",
            data: {fault: faultID},
            success: function(data){}
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
        }});}
        
        function coutOrders(servisID){
          $.ajax({
                type: "POST",
                url: "assets/php/ordersCounter.php",
                data: {servis: servisID},
                success: function(data){
                    $('li[id="faultAmount"] > span').empty();
                    $('li[id="faultAmount"] > span').append(data);
                }
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
                }    
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
                }    
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
                }   
        });}
        
        function oddOrder(faultID){
            $.ajax({
                type: "POST",
                url: "assets/php/oddOrder.php",
                data: {id: faultID},
                success: function(data){
                        loadOrders(data);
                        loadFaulties();
                    }});
            
        }