/**
 * Created by pigletkps on 8/23/2016.
 */

function myalert() {
    var name = 'mounoy';
    var age ='23';

    document.getElementById('name').value = name ;
    document.getElementById('age').value = age;
    document.getElementById('show').innerHTML ='My name is ' + name + ', Age ' + age;
}

function myalert2(id,name,age) {
    document.getElementById('name').value = name ;
    document.getElementById('age').value = age;
    document.getElementById('show').innerHTML ='ID: ' + id + 'My name is ' + name + ', Age ' + age;
}