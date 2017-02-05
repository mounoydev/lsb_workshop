var db;
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
       db = openDatabase('phonebook', '1.0', 'Phone Book DB', 2 * 1024 * 1024);

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS user ( id INTEGER PRIMARY KEY   AUTOINCREMENT,name, surname,gender,phone,email)');
        });
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM user', [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++){
                    console.log(results.rows.item(i).name +results.rows.item(i).id);
                    $('#listname').append('<li><a href="#pagedetail" onclick="filldetail(\''
                        + results.rows.item(i).id
                        + '\')">' + results.rows.item(i).name
                        + "</a> </li>");
                }
            }, null);
        });
    }
};
app.initialize();
function submituser()
{
    db.transaction(
        function (tx)
        {
            tx.executeSql('INSERT INTO user (name, surname,gender,phone,email) VALUES (?,?,?,?,?)',[$('#lbname').val(),$('#lbsurname').val(),$("input[name=lbgender]:checked").val(),$('#lbphone').val(),$('#lbemail').val()]);

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

    var storeage = window.localStorage; //ປະກາດໃຊ້ Clral + /
    // storeage.setItem('name','Mounoy'); //ຕັ້ງຄ່າ name = mounoy
    // storeage.setItem('User','khampasith');
    // storeage.setItem('email','pigletkps@hotmail.com');
    // storeage.setItem('password','123456');
    // storeage.setItem('apiKey','81dc9bdb52d04dc20036dbd8313ed055');


    // Read LocalStoreage
    var name = storeage.getItem('name'); //get data name
        console.log(name);
    var user = storeage.getItem('User'); //get data User
        console.log(user);

    // Delete
    storeage.removeItem('apiKey');
    storeage.setItem('name','Beer'); //Edit name = Beer
    window.localStorage.setItem('test','test');

function addkeyvalue() {
    var key = $('#lbkey').val();
    var valu = $('#lbvalue').val();
    window.storeage.setItem(key,valu);
}