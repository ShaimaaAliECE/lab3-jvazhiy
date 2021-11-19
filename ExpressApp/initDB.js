const mysql = require('mysql'); //importing sql
let conn = mysql.createConnection({ //connecting to db in gcp
        host:'107.178.222.202',
        user: 'root',
        password:'mypass',
        database:'SchDB'
});
conn.query(`CREATE TABLE AdminstratorSchedule
            ( id INT, meeting1 varchar(100), meeting2 varchar(100), meeting3 varchar(100), meeting4 varchar(100),meeting5 varchar(100),
                meeting6 varchar(100),meeting7 varchar(100),meeting8 varchar(100),meeting9 varchar(100),
            )` //creation of admin meeting table
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Adminstrator Schedule has been newly made');
})
conn.query(`CREATE TABLE GuestSchedule 
            ( guestname varchar(100), meetingone varchar(100), meeetingtwo varchar(100), meetingthree varchar(100), meetingfour varchar(100),
            meetingfive varchar(100), meetingsix varchar(100), meetingseven varchar(100), meetingeight varchar(100), meetingnine varchar(100),
            meetingten varchar(100)
            )` //creatiion of guest table
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Guest Schedule Table has been newly made');
})
conn.query( `insert into AdminstratorSchedule values 
            (1,"8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm")`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

conn.end();