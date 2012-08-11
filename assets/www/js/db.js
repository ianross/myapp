/**
 * Created with JetBrains WebStorm.
 * User: Ian
 * Date: 11/08/12
 * Time: 11:01 AM
 * To change this template use File | Settings | File Templates.
 */
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

var Students = [];
var CurrentStudent = {name: "No Student Selected", images: [], notes: []};
var CallbackData = null;

function errorHandler(transaction, error) {
    alert('Error: ' + error.message + ' code: ' + error.code);

}

//Used for debugging...
function successCallBack() {
   // alert("DEBUGGING: success");
}

function nullHandler(){

    Application.UpdateAllContent();
    Application.UpdateStudentsImages();

};

function addSuccess(){

    Students.push({name: CallbackData, images: [], notes: []});
    $('#list').append('<li style="text-align:center" data-theme="c" class="ui-li ui-li-static ui-body-c">' + CallbackData + '</li>');
    Application.UpdateAllContent();
    CallbackData = null;

};

function updateSuccess(){

    CurrentStudent.name = CallbackData;
    Application.UpdateAllContent();
    CallbackData = null;

};

function deleteSuccess(){

    Students.splice(CallbackData[1],1);
    Application.UpdateAllContent();
    CallbackData = null;

};

function StartDB() {

    if (!window.openDatabase) {
        // not all mobile devices support databases  if it does not, the following alert will display
        // indicating the device will not be albe to run this application
        alert('Databases are not supported in this browser.');
        return;
    }

    // if it does not exist, it will create it and return a database object stored in variable db
    db = openDatabase(shortName, version, displayName,maxSize);
    //Create the table Students in the DB - Primary Key (StudentName) others -> Images and Notes
    db.transaction(function(tx){
        tx.executeSql( 'CREATE TABLE IF NOT EXISTS Students(StudentName TEXT NOT NULL PRIMARY KEY, Images TEXT NOT NULL, Notes TEXT NOT NULL)',[],nullHandler,errorHandler);
    },errorHandler,successCallBack);
}

//Function lists all database values...
function ListDBValues() {

    if(!window.openDatabase) {
        alert('Databasesa re not supported in this browser');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM Students;', [],
            function(transaction, result) {
                if (result != null && result.rows != null) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        console.log(row.StudentName + '__ ' + row.Images+ '__ ' + row.Notes);
                    }
                }
            },errorHandler);
    },errorHandler,nullHandler);

    return;
}

//Add values/entries to DB
function AddValueToDB(name, images, notes) {

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql('INSERT INTO Students(StudentName, Images, Notes) VALUES (?,?,?)',[name, images,notes], addSuccess,errorHandler);
    });

    //ListDBValues();

    return false;
}

function RemoveStudentFromDB(name) {

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql('DELETE FROM Students WHERE StudentName=?',[name], deleteSuccess,errorHandler);
    });

   // ListDBValues();

    return false;
}

function UpdateStudentInDB(cName,nName, images, notes) {

    var updateStatement = "UPDATE Students SET StudentName = ?, Images = ?, Notes = ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[nName, images, notes, cName], updateSuccess,errorHandler);
    });

   // ListDBValues();

    return false;

}

function PrepDBData(arr) {
    var outputString = "";

    for(var i=0; i<arr.length;i++) {
        if(i == arr.length-1) { outputString+= arr[i] }
        else {
            outputString+= arr[i] + ";";
        }
    }

    return outputString;

}

StartDB();
//AddValueToDB("Fred Pryor", "src/sds.jpg;src/sdsa/jpg", "dis kid such a lil nigger u wldnt believe it bro; ashdasd asdjh asjds a")
//RemoveStudentFromDB("Fred Pryor")
//UpdateStudentInDB("CURRENT NAME", "NEW NAME", "IMAGE;IMAGE;IMAGE", "NOTES;NOTES;NOTES");
//ListDBValues();