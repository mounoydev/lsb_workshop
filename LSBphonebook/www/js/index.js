var db;
var userid;
var url='http://103.208.26.17:3000';
//var url2='http://localhost:3000';
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
       // readphonebook();
        readdep();
      //  getdepartment();
        updatedatasqllite() ;
        setdeparment();
       // updatemysql();

        var onSuccess = function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
        };

// onError Callback receives a PositionError object
//
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
};
app.initialize();
function submituser()
{    db.transaction(
        function (tx)
        {
            tx.executeSql('sql',[],'onsuccess','onerror');
            tx.executeSql('INSERT INTO user (name, surname,gender,phone,email,depid) VALUES (?,?,?,?,?,?)',[$('#lbname').val(),$('#lbsurname').val(),$("input[name=lbgender]:checked").val(),$('#lbphone').val(),$('#lbemail').val(),$('#departmant').val()],

                function () { alert('insert');   },
                function (error) { alert(error); }
                );
        });

}
function filldetail(id) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM user where user.id='+id, [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++){

                $("#showlbname").html("Name: "+results.rows.item(i).name);
                $("#showlbsurname").html("Surname: "+results.rows.item(i).surname);
                $("#showlbphone").html("Phone: "+results.rows.item(i).phone);
                $("#showemail").html("Email: "+results.rows.item(i).email);
                $("#showgender").html("Gender: "+results.rows.item(i).gender);
            }
        }, null);
    });
}


function addkeyvalue() {
    var key = $('#lbkey').val();
    var valu = $('#lbvalue').val();
    window.storeage.setItem(key,valu);
    $('#lbkey').val('');
    $('#lbvalue').val('');
}
function removekeyvalue() {
    var key = $('#lbkey').val();
    storeage.removeItem(key);
    $('#lbkey').val('');
    $('#lbvalue').val('');
}
function readKeyValue() {
    var key = $('#lbkey').val();
    var valu = window.storeage.getItem(key);
    $('#lbvalue').val(valu);
}
function testpost() {
    $.post(url+'/profile',{name:'mounoy',phone:'77719192'})
}

function readphonebook() {
    $.getJSON(url+'/phonebook/deplist/DOA',null,function (data) {
        for(var i=0;i<data.length;i++)
        {console.log(data[i].Tel);}
    });
}

function readdep() {
    $.getJSON(url+'/phonebook/dep',null,function (data) {
        for(var i=0;i<data.length;i++)
        {console.log(data[i].id+""+data[i].fullname);
        $('#listdep').append("<li onclick='listuser("+data[i].id+")'> <a href='#pageviewdep'>"+data[i].fullname+"</a></li>")
        }
    });
}
function listuser(depid) {
    $.getJSON(url+'/phonebook/viewuser/'+depid,null,function (data) {
        var user ="";
        for(var i=0;i<data.length;i++)
        {    //single
            user+= '<li onclick=\"filldatauser(\''+data[i].id+"\',\'"+data[i].name+"\',\'"+data[i].surname+"\',\'"+data[i].gender+"\',\'"+data[i].position+"\',\'"+data[i].division+"\',\'"+data[i].fullname+"\',\'"+data[i].Tel+"\',\'"+data[i].dept+"\')\"> <a class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\" href='#pagedetail'>" + data[i].name+" "+data[i].surname+"</a></li>";
        }
        $('#listuser').html(user);
    });
}
//SELECT phonebook.myusers.*,phonebook.dep.fullname FROM phonebook.myusers,phonebook.dep
//where phonebook.myusers.dept=phonebook.dep.id and  dept=
function filldatauser(id,name,surname,gender,position,division,dept,tel,depid) {
    userid = id;
    $("#showlbname").html("Name: "+name);
    $("#showlbsurname").html("Surname: "+surname);
    $("#showlbphone").html("Phone: "+tel);
    $("#showgender").html("Gender: "+gender);
    $("#lbdev").html("department: "+dept);
    $("#lbpos").html("Position: "+position);
    $("#lbdivision").html("Divistion: "+division);
    $("#clickcall").attr("href", "Tel:"+tel);
    $("#clickcall2").attr("href", "Tel:"+tel);

    $("#ulbname").val(name);
    $("#ulbsurname").val(surname);
    $("#ulbphone").val(tel);
    $("#ulbposition").val(position);
    $("#udivistion").val(division);
    $("#udepartmant").val(depid);
    $('input:radio[name=ulbgender][value='+ gender +']').click();
    $('input:radio[name=ulbgender][value='+ gender +']').click();

}
//ສົ່ງຄ່າ Get ໃຫ້ ເວັບເຊິວິດ
function adduser(name,surname,gender,position,division,deptid,tel) {
    var query ="http://localhost:3000/phonebook/createuser?"
        +"name="+name
        +"&surname="+surname
        +"&gender="+gender
        +"&position="+position
        +"&division="+division
        +"&depid="+deptid
        +"&phone="+tel;
    $.getJSON(query,null,function (data) {
        alert(data);
    });
}
function updateuser(id,name,surname,gender,position,division,deptid,tel) {
    var query ="http://localhost:3000/phonebook/updateuser?"
        +"name="+name
        +"&surname="+surname
        +"&gender="+gender
        +"&position="+position
        +"&division="+division
        +"&depid="+deptid
        +"&id="+id
        +"&phone="+tel;
    $.getJSON(query,null,function (data) {
        alert(data);
    });
}
function btedit() {
    updateuser(userid,$('#ulbname').val(),$('#ulbsurname').val(),$("input[name=ulbgender]:checked").val(),$('#ulbposition').val(),$('#udivistion').val(),$('#udepartmant').val(),$('#ulbphone').val())
}

//adduser('n','s','m','po','di'........)
function getdatauser() {
    adduser($('#lbname').val(),$('#lbsurname').val(),$("input[name=lbgender]:checked").val(),$('#lbposition').val(),$('#divistion').val(),$('#departmant').val(),$('#lbphone').val());

    // ລອງເອີນໃຊ້ function add udser  ==> retrun id
}
function getdepartment() {
    $.getJSON(url+'/phonebook/dep',null,function (data) {
        var deptext="";
        for(var i=0;i<data.length;i++){
            deptext+="<option value="+data[i].id + ">" + data[i].fullname +"</option>";
        }
        $("#departmant").html(deptext);
        $("#udepartmant").html(deptext);
    })
}

function deleteuser() {
    var query ="http://localhost:3000/phonebook/deleteuser?"
         +"id="+userid;
    $.getJSON(query,null,function (data) {
        alert(data);
    });
}





function databasewebsql() {
    db = openDatabase('mydb', '1.0', 'Test DB', 10 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS department (id INTEGER PRIMARY KEY   AUTOINCREMENT, depname)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY   AUTOINCREMENT, name,surname,gender,phone,email,depid)');
        //  tx.executeSql('INSERT INTO department (depname) VALUES ("department1")');
        //  tx.executeSql('INSERT INTO department (depname) VALUES ("department2")');         //   tx.executeSql('INSERT INTO department (id,depname) VALUES (?, ?'), [e_id, e_log];
    });

}

function updatedatasqllite() {
    db = openDatabase('mydb', '1.1', 'Test DB', 10 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS department (id INTEGER PRIMARY KEY   AUTOINCREMENT,depname, fullname,active)');
    });
        $.getJSON(url+'/phonebook/dep',null,function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++){
                insertdep(data[i].id,data[i].depname,data[i].fullname,data[i].active);
            }
        });
}
function insertdep(depid,name,fullname,active) {
    db.transaction(function (tx) {
        console.log( depid +"|"  + name+"|"  + fullname);
        tx.executeSql('insert or replace into department (id,depname,fullname,active) VALUES (\''+depid+'\',\''+name+'\',\''+fullname+'\',\''+active+'\')');
    });
}
function updatemysql() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM department', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++){
                console.log(results.rows.item(i).id+"|"+results.rows.item(i).depname+"|"+results.rows.item(i).fullname+"|");
                var sqlquery =url+'/phonebook/updatedep?depid='+results.rows.item(i).id+"&name="+results.rows.item(i).depname+"&fullname="+results.rows.item(i).fullname;
                console.log(sqlquery);
                $.getJSON(sqlquery,null,function (data) {
                    console.log(data);
                });
            }
        },function (error) {
            alert('error');
        });
    })
}

function setdeparment() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM department where active=\'1\'', [], function (tx, results) {
            var len = results.rows.length, i;
            var deptext="";
            for (i = 0; i < len; i++){
                deptext+="<option value="
                    +results.rows.item(i).id + ">" + results.rows.item(i).fullname +"</option>";
            }
            console.log(deptext);
            $('#departmant').html(deptext);
            $("#udepartmant").html(deptext);
        },function (error) {
            alert('error');
        });
    })
}