const express = require('express')
const dotenv = require('dotenv');
const fs = require('fs');
const { google } = require("googleapis");
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();
const app = express()
app.use(bodyParser.json())
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
var port = process.env.PORT || 3000;

app.post('/whatapp', (req, res) => {

    const {name,grade,subject,email,contactNumber,alternateNumber,board,classMode,address} = req.body;
    try {
        console.log("--", process.env.TWILIO_ACCOUNT_SID)
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body:`You have a new query! \n Student Name: ${name} \n Grade: ${grade} \n Subject: ${subject} \n Email: ${email} \n Contact Number: ${contactNumber} \n Alternate Number: ${alternateNumber} \n Board: ${board} \n Class Mode: ${classMode} \n Address: ${address}`,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+919350444925'
            })
            .then(message => res.status(200).json({ message: 'received ' }))
    }
    catch (e) {
        res.status(500).json({ message: "something went wrong" })
    }

})

app.get('/home', (req, res) => {
    res.status(200).json({ message: `received` })

})
// app.post('/test', async (req, res) => {

//    try{
//     const {name,grade,subject,email,contactNumber,alternateNumber,board,classMode,address} = req.body;
//     console.log(name);
//      const auth = new google.auth.GoogleAuth({
//          keyFile: "keys.json", //the key file
//          //url to spreadsheets API
//          scopes: "https://www.googleapis.com/auth/spreadsheets", 
//      });
 
//      const authClientObject = await auth.getClient();
//      const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
//      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
 
//      //write data into the google sheets
//      await googleSheetsInstance.spreadsheets.values.append({
//          auth, //auth object
//          spreadsheetId, //spreadsheet id
//          range: "Sheet1!A:I", //sheet name and range of cells
//          valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
//          resource: {
//              values: [[name,grade,subject,email,contactNumber,alternateNumber,board,classMode,address]],
//          },
//      });
//       //Read front the spreadsheet
//       const readData = await googleSheetsInstance.spreadsheets.values.get({
//          auth, //auth object
//          spreadsheetId, // spreadsheet id
//          range: "Sheet1!A:A", //range of cells to read from.
//      })
 
//      //send the data reae with the response
//      res.status(200).send("Send Succesfully")
//    }
//    catch(e){
//     res.status(500).send("Something went wrong");
//    }
// })



app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
})