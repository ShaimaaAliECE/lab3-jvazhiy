const express = require('express');
const newConnection = require('./DBConnection');

const app = express();
app.use(express.urlencoded({extended: true}))
// serve static contents
app.use(express.static('static'));

// dynamic handling
app.post('/LOGIN', (req, res) => 
{
    if(req.body.username == "name" && req.body.password == "wordpass"){
        res.redirect('adminpage.html')
    }
})
app.get('/GUEST', (req,res) => 
{
    res.redirect('gu.html')
})
app.post('/SAVE', (req, res) => //saving mechnaism
{
    let v1 = false;
    let v2 = false;
    let v3 = false;
    let v4 = false;
    let v5 = false;
    let v6 = false;
    let v7 = false;
    let v8 = false;
    let v9 = false;
    if (req.body.g1) 
        { 
            console.log("true"); v1 = true;
        } 
        else 
        {
            console.log("false"); v1 = false;
        }

    if (req.body.g2) 
        {
            console.log("true");  v2 = true;
        } 
    else 
    {
        console.log("false"); v2 = false;
    }

    if (req.body.g3) 
        {
            console.log("true");  v3 = true;
        } 
    else 
        {
            console.log("false"); v3 = false;
        }

    if (req.body.g4) 
        {
            console.log("true");  v4 = true;
        } 
    else 
        {
            console.log("false"); v4 = false;
        }

    if (req.body.g5) 
        {
            console.log("true");  v5 = true;
        } 
    else 
        {
            console.log("false"); v5 = false;
        }

    if (req.body.g6) 
        {
            console.log("true");  v6 = true;
        }
     else
         {
             console.log("false"); v6 = false;
        }

    if (req.body.g7) 
        {
            console.log("true");  v7 = true;
        } 
    else 
        {
            console.log("false"); v7 = false;
        }

    if (req.body.g8) 
        {
            console.log("true");  v8 = true;
        } 
    else
         {console.log("false"); v8 = false;}

    if (req.body.v9) 
        {
            console.log("true");  v9 = true;
        } 
    else 
        {
            console.log("false"); v9 = false;
        }

    console.log("");
    console.log(v1,v2,v3,v4,v5,v6,v7,v8,v9);
    console.log(" ");
    console.log(" "); //empty strings
    console.log(" "); 

    let nameGuest = req.body.name
    let conn=newConnection(); //creating new connection object
    conn.connect(); //establishing connection
    conn.query(
        `insert into GuestSchedule values ('${nameGuest}',${v1},'${v2}','${v3}','${v4}','${v5}','${v6}','${v7}','${v8}','${v9}')` //sql query
            ,(err,rows,fields) => {
                console.log(err);  
            } );               
    res.redirect('index.html'); //redirecting to see on page
})
app.get('/showtime', (req, res) =>
 {
    let conn=newConnection();
    conn.connect();
    conn.query( `select * from AdminstratorTimes `
    , (err,rows,fields) => 
    {                
            let content = ''; //empty string 
            content += '<h1> doOdle Meeting List</h1><br>'
            for (r of rows){ //looping through each row
                content += '<div>';
                content += "Meeting 1: "+r.g1 + "<br>" //
                content += "Meeting 2: "+r.g2 + "<br>"
                content += "Meeting 3: "+r.g3 + "<br>"
                content += "Meeting 4: "+r.g4 + "<br>"
                content += "Meeting 5: "+r.g5 + "<br>"
                content += "Meeting 6: "+r.g6 + "<br>"
                content += "Meeting 7: "+r.g7 + "<br>"
                content += "Meeting 8: "+r.g8 + "<br>"
                content += "Meeting 9: "+r.g9 + "<br>"
                content += '\n';
            }
            res.send(content);
        }); 

    conn.end(); 

})
app.post('/UPDATE', (req, res) => 
{
    let admin1 = req.body.a1
    let admin2 = req.body.a2
    let admin3 = req.body.a3
    let admin4 = req.body.a4
    let admin5 = req.body.a5
    let admin6 = req.body.a6
    let admin7 = req.body.a7
    let admin8 = req.body.a8
    let admin9 = req.body.a9
    let conn = newConnection(); //declaring connection
    conn.connect(); //establishing connection
    conn.query( //query sent to the DB 
        `UPDATE AdminstratorTimes SET meeting1='${admin1}' , meeting2='${admin2}' , meeting3='${admin3}' , 
        meeting4='${admin4}' , meeting5='${admin5}' , meeting6='${admin6}' , meeting7='${admin7}' , meeting8='${admin8}' , meeting9='${admin9}'}' WHERE id=1`
            ,(err,rows,fields) => 
            { } );
    conn.end(); //ending connection so we dont waste resources
    res.redirect('index.html'); //redirecting to be seen on page

})
app.get('/showschedule', (req, res) => 
{
    let conn=newConnection(); //creating a new connection object
    conn.connect(); //establishing connection
    let k1,k2,k3,k4,k5,k6,k7,k8,k9; //declaring varibales to 
    conn.query( `select * from AdminstratorTimes `
    , (err,rows,fields) => {                
            for (r of rows){
                k1 = r.meeting1 
                k2 = r.meeting2
                k3 = r.meeting3
                k4 = r.meeting4
                k5 = r.meeting5
                k6 = r.meeting6
                k7 = r.meeting7
                k8 = r.meeting8
                k9 = r.meeting9
            }
        }); 

    conn.query( `select * from GuestSchedule ` //selecting all form guest schdule
    , (err,rows,fields) => {                
        let content = ''; //intial empty string
        content += '<h1>List of meetings today </h1><br>' //title
             for (r of rows){
              content += '<div>'; //creating a section
            content += "name: "+r.name + "<br>"
                        //comparsion of values
           let re1 = r.meetingone.localeCompare('0');
                        if(re1 == 0)
                        {
        content += "<input type='checkbox'>" + k1
                }else
                    {
                content += "<input type='checkbox' checked='true'>" + k1 //concatenating our result to the oringnal empty stirng
                    }
            let re2 = r.meetingtwo.localeCompare('false');
                if(re2 == 0)
                    {
                         content += "<input type='checkbox'>" + k2
                }else
                    {
                        content += "<input type='checkbox' checked='true'>" + k2
                    }
                    
            let re3 = r.meetingthree.localeCompare('false');
                if(re3 == 0)
                    {
                        content += "<input type='checkbox'>" + k3
                }else
                    {
                        content += "<input type='checkbox' checked='true'>" + k3
                    }

            let re4 = r.meetingfour.localeCompare('false');
                if(re4 == 0)
                    {
                        content += "<input type='checkbox'>" + k4
                }else
                {
                        content += "<input type='checkbox' checked='true'>" + k4
                    }

            let re5 = r.meetingfive.localeCompare('false');
                if(re5 == 0)
                    {
                        content += "<input type='checkbox'>" + k5
                }else
                    {
                        content += "<input type='checkbox' checked='true'>" + k5
                     }

            let re6 = r.meetingsix.localeCompare('false');
                if(re6 == 0)
                    {
                        content += "<input type='checkbox'>" + k6
                }else
                    {
                        content += "<input type='checkbox' checked='true'>" + k6
                    }

            let re7 = r.meetingseven.localeCompare('false');
                if(re7 == 0)
                    {
                        content += "<input type='checkbox'>" + k7
                }else
                    {
                        content += "<input type='checkbox' checked='true'>" + k7
                    }

            let re8 = r.meetingeight.localeCompare('false');
                if(re8 == 0)
                    {
                         content += "<input type='checkbox'>" + k8
                }else
                    {
                        content += "<input type='checkbox' checked='true'>" + k8
                    }

            let re9 = r.meetingnine.localeCompare('false');
                if(re9 == 0)
                    {
                    content += "<input type='checkbox'>" + k9
                }else
                    {
                        content += "<input type='checkbox' checked='true'>" + k9
                    }
                        content += '</div><br>' //ending the section 
                        content += '\n';
                    }
        res.send(content);
            
            });

    conn.end();       //ending the connection
})
app.listen(80);   //listinenig port