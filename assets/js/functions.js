                var mapCenter = new google.maps.LatLng(51.1000000, 17.0333300); 
	            var map;

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

        function goM(from, to, func){
            $("#contener").hide(300);
            $("#"+to).css("display", "block");
            $("#"+to).css("visibility", "visible");
            $("#"+from).css("display", "none");
            if(arguments.length ==3 ){
             func();   
            }
            $("#contener").fadeToggle(300);
        };

        function loadUsers(){
            $.ajax({
            url: "assets/php/users.php",
            data: "",
            dataType: "text",
            success: function(data){
                $("#users-table").empty;
                var items = [];
                $.each(JSON.parse(data), function(id, json){
                    items.push("<tr id='" + json.login +"'><td>#<span>" + json.login +"</span></td></tr>")
                })
                $("#users-table").html(items);
            },
            error: function(){}
            });
        };

        function searchUsers(){
            
            var log = $("#inputSearch").val();
            
            if(log!=""){
            $.ajax({
            type: "POST",
            url: "assets/php/usersSearch.php",
            data: "log="+log,
            dataType: "text",
            success: function(data){
                $("#users-table").empty;
                var items = [];
                $.each(JSON.parse(data), function(id, json){
                    items.push("<tr id='" + json.login +"'><td>#<span>" + json.login +"</span></td></tr>")
                })
                $("#users-table").html(items);
            },
            error: function(){}
            });
            }
            else{
                loadUsers();
            }
        };

        function userInfo(u_id){
            $.ajax({
            type: "POST",
            url: "assets/php/userInfo.php",
            data: {userID : u_id},
            dataType: "text",
            success: function(data){
                $("#userInfo").empty();
                var items = []; 
                $.each(JSON.parse(data), function(id, json) {  
               items.push('<li class="list-group-item" tag="'+ u_id +'" id="userName">Imię : <span>'+json.imie+'</span></li>'+
                         '<li class="list-group-item" id="userSurname">Nazwisko : <span>'+json.nazwisko+'</span></li>'+
                         '<li class="list-group-item" id="userBalance">Saldo : <span>'+json.saldo+'</span></li>');
               $("#userInfo").html(items);
                });
                },
            error: function(){}
        });
        };

        function deleteUser(name){
        $.ajax({
            type: "POST",
            url: "assets/php/userDelete.php",
            data: {Uname: name},
            dataType: "text",
            success: function(data){
                loadUsers()
            },
            error: function(){}
        });}

        function adminUser(name){
        $.ajax({
            type: "POST",
            url: "assets/php/userAdmin.php",
            data: {Uname: name},
            dataType: "text",
            success: function(){
            alert("Nadano prawo Admina!");
            },
            error: function(){}
        });}

        function loadUserBikes(u_id){
            $.ajax({
            type: "POST",
            url: "assets/php/userBikes.php",
            data: {userID : u_id},
            dataType: "text",
            success: function(data){
                $("#userBikes").empty();
                var items = []; 
                $.each(JSON.parse(data), function(id, json) {  
               items.push('<li class="list-group-item" id=' + json.id_rower +'">#<span>' + json.id_rower +'</span><button type="button" style=" background-color: rgba(0, 0, 0, 0.8); margin-left: 30px" id='+ json.id_rower +' class="btn">Zwróć</button></li>');
               $("#userBikes").html(items);
                });
                if($('#userBikes').is(':empty'))
                    {
                    document.getElementById("userBikes").innerHTML = '<li class="list-group-item"><strong>Brak rowerów</strong><span></span></li>';
                    }
                },
            error: function(){}
        });
        };

        function deleteUserBike(b_id){
        $.ajax({
            type: "POST",
            url: "assets/php/userBikeDelete.php",
            data: {bikeID: b_id},
            dataType: "text",
            success: function(data){
            loadUserBikes(data);
            },
            error: function(){}
        });}

	function map_initialize()
	{
			var googleMapOptions = 
			{ 
				center: mapCenter,
				zoom: 12, 
				zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
				scaleControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		
		   	map = new google.maps.Map(document.getElementById("google_map"), googleMapOptions);			
			
			$.get("assets/php/mapProcess.php", function (data) {
				$(data).find("marker").each(function () {
					  var name 		= $(this).attr('name');
					  var address 	= '<p style="color: black;">'+ $(this).attr('address') +'</p>';
					  var point 	= new google.maps.LatLng(parseFloat($(this).attr('lat')),parseFloat($(this).attr('lng')));
					  create_marker(point, name, address, false, false, false);
				});
			});	
			

			google.maps.event.addListener(map, 'rightclick', function(event) {

				var EditForm = '<p><div class="marker-edit">'+
				'<form action="ajax-save.php" method="POST" name="SaveMarker" id="SaveMarker">'+
				'<label for="pName"><span id="black">Nazwa :</span><input type="text" name="pName" id="black" class="save-name" placeholder="Podaj tytuł" maxlength="40" /></label>'+
				'<label for="pDesc"><span id="black">Opis :</span><textarea name="pDesc" id="black" class="save-desc" placeholder="Wpisz adres" maxlength="150"></textarea></label>'+
				'</div></p><button name="save-marker" class="save-marker">Zapisz miejsce</button>';

				create_marker(event.latLng, 'Stacja', EditForm, true, true, true);
			});
										
	}
	

	function create_marker(MapPos, MapTitle, MapDesc,  InfoOpenDefault, DragAble, Removable)
	{	  	  		  
		var marker = new google.maps.Marker({
			position: MapPos,
			map: map,
			draggable:DragAble,
			animation: google.maps.Animation.DROP,
		});

		var contentString = $('<div class="marker-info-win">'+
		'<div class="marker-inner-win"><span class="info-content">'+
		'<h1 class="marker-heading">'+MapTitle+'</h1>'+
		MapDesc+ 
		'</span><button name="remove-marker" class="remove-marker">Usuń miejsce</button>'+
		'</div></div>');	

		

		var infowindow = new google.maps.InfoWindow();

		infowindow.setContent(contentString[0]);


		var removeBtn 	= contentString.find('button.remove-marker')[0];
		var saveBtn 	= contentString.find('button.save-marker')[0];

		google.maps.event.addDomListener(removeBtn, "click", function(event) {
			remove_marker(marker);
		});
		
		if(typeof saveBtn !== 'undefined') 
		{

			google.maps.event.addDomListener(saveBtn, "click", function(event) {
				var mReplace = contentString.find('span.info-content'); 
				var mName = contentString.find('input.save-name')[0].value; 
				var mDesc  = contentString.find('textarea.save-desc')[0].value; 
				
				if(mName =='' || mDesc =='')
				{
					alert("Podaj nazwę i opis!");
				}else{
					save_marker(marker, mName, mDesc, mReplace);
				}
			});
		}
		
				 
		google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker); 
	    });
		  
		if(InfoOpenDefault) 
		{
		  infowindow.open(map,marker);
		}
	}
	
	
	function remove_marker(Marker)
	{
		

		if(Marker.getDraggable()) 
		{
			Marker.setMap(null); 
		}
		else
		{
			var mLatLang = Marker.getPosition().toUrlValue(); 
			var myData = {del : 'true', latlang : mLatLang};
			$.ajax({
			  type: "POST",
			  url: "assets/php/mapProcess.php",
			  data: myData,
			  success:function(data){
					Marker.setMap(null); 
					alert(data);
				},
				error:function(){}
			});
		}

	}
	
	
	function save_marker(Marker, mName, mAddress, replaceWin)
	{
		var mLatLang = Marker.getPosition().toUrlValue(); 
		var myData = {name : mName, address : mAddress, latlang : mLatLang}; 
		console.log(replaceWin);		
		$.ajax({
		  type: "POST",
		  url: "assets/php/mapProcess.php",
		  data: myData,
		  success:function(data){
				replaceWin.html(data); 
				Marker.setDraggable(false);
            },
            error:function(){}
		});
	};
        