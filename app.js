//Calling Express Framework
const express = require('express');

//Calling Body-Parser package to parse request parameters
const bodyParser = require('body-parser');

//Calling EJS package
const ejs = require('ejs');

//Calling datafactory and faker javascript packages
const factory = require('datafactoryjs');
const faker = require('faker');
const casual = require('casual');

//Calling file-system javascript package
const fs = require('fs');
const os = require('os');

//Calling SendMail javascript package
const sendmail = require('sendmail')();

//Calling date javascript package
const dt = require(__dirname + "/date.js");

//Calling randomString javascript package
const randomData = require(__dirname + "/randomString.js");

//Rough
// console.log(faker.date.past());
// console.log(faker.date.future());
// console.log(faker.lorem.sentence());
console.log(casual.year);


//Setting up app
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Defining mainData
let mainData=[];
let tableOptions=[];
let tableAttributes=[];
let sentConfirmation="";

//Setting up GET request for root(/)
app.get("/",function(req,res){
  res.render("home");
});

//Setting up GET request for start(/start/Step1)
app.get("/start/:step",function(req,res){
  //console.log(mainData);
  res.render("start", {stepNo: req.params.step, tableData : mainData, tableAttributes : tableAttributes, tableOptions : tableOptions});
});

//Setting up POST request for start(/start/Step1)
app.get("/saveStep1/:tables", function(req,res){
  mainData=[];
  const tableList = req.params.tables.split(",");
  for(var i = 0; i < tableList.length; i++){
    let dataSchema = { id : i, name: tableList[i]};
    mainData.push(dataSchema);
  }
  res.redirect("/start/Step2");
});

//Setting up GET request for start(/start/Step3)
app.get("/saveStep2/:attributes/tableOptions/:tableOptions", function(req,res){
  tableAttributes=[];
  const tabOptions = req.params.tableOptions.split(",");
  const attrData = req.params.attributes.split(",");
  for(var i = 0; i < mainData.length; i++)
  {
    for(var j=0; j < attrData.length; j=j+4)
    {
      if (mainData[i].name == attrData[j]){
        let attr = {table: attrData[j], fieldName: attrData[j+1], fieldType: attrData[j+2], fieldOption: attrData[j+3]};
        tableAttributes.push(attr);
      }
    }
  }

  for(var i = 0; i < mainData.length; i++)
  {
    for(var j=0; j < tabOptions.length; j=j+3)
    {
      if (mainData[i].name == tabOptions[j]){
        let option = {table: tabOptions[j], recordCnt: tabOptions[j+1], recordDelimiter: tabOptions[j+2]};
        tableOptions.push(option);
      }
    }
  }

  res.redirect("/start/Step3");

});

//Setting up GET request for generateData(/generateData)
app.get("/generateData", function(req,res){
  //Creating fs-dir
  const timestamp = dt.datetime().replace(/:/g,'-').replace(/ /g,'_');
  fs.mkdir(__dirname + "/GeneratedData/Request-" + timestamp, { recursive: true }, (err) => {
    if (err) throw err;
  });
  const baseDir = __dirname + "/GeneratedData/Request-" + timestamp;
  const requestNo = "Request-" + timestamp;

  const generatedData=[];

  for(var i = 0; i < mainData.length; i++)
  {
    let recordCnt = "";
    let delimiter = "";
    for(var j=0; j < tableOptions.length; j++)
    {
      if (mainData[i].name == tableOptions[j].table){
          recordCnt = tableOptions[j].recordCnt;
          delimiter = tableOptions[j].recordDelimiter;
          break;
      }
    }

    let fileHeader="";
    let fieldType=[];
    for(var j=0; j < tableAttributes.length; j++)
    {
        if (mainData[i].name == tableAttributes[j].table){
            if(fileHeader.length == 0)
            {
              fileHeader=tableAttributes[j].fieldName;
            }else {
              fileHeader = fileHeader + delimiter + tableAttributes[j].fieldName;
            }
            let typeOption = {fieldType : tableAttributes[j].fieldType, fieldOption: tableAttributes[j].fieldOption};
            fieldType.push(typeOption);
        }
    }

    let fileName = baseDir + "/" + mainData[i].name + ".txt";
    fs.writeFileSync(fileName, fileHeader, (err) => {
      if (err)
        console.log(err);
      else {
        console.log(fileName + " written successfully\n");
        console.log("The written has the following contents:");
        console.log(fs.readFileSync(fileName, "utf8"));
      }
    });

    for(var k=0; k < recordCnt; k++){
        fs.appendFileSync(fileName, os.EOL, (err) => {
          if (err)
            console.log(err);
        });

        for (var x=0; x<fieldType.length; x++){
          let apiValue = "";
          let userInput = "";

          switch(fieldType[x].fieldType){
            case "randomData.generateRanged":
                userInput = fieldType[x].fieldOption.split("-");
                if (x == fieldType.length -1 ){
                  apiValue = eval(fieldType[x].fieldType + "(" + userInput[0] + "," + userInput[1] + ")").toString();
                } else {
                  apiValue = eval(fieldType[x].fieldType + "(" + userInput[0] + "," + userInput[1] + ")").toString() + delimiter;
                }
                break;
            case "randomData.generate.number":
                userInput = fieldType[x].fieldOption;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('number'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('number'," + userInput + ")").toString() + delimiter;
                }
                break;
            case "numSequence":
                userInput = parseInt(fieldType[x].fieldOption);
                let sequence = userInput + k;
                if (x == fieldType.length -1 ){
                  apiValue = sequence.toString();
                } else {
                  apiValue = sequence.toString() + delimiter;
                }
                break;
            case "randomData.generate.string":
                userInput = fieldType[x].fieldOption;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('character'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('character'," + userInput + ")").toString() + delimiter;
                }
                break;
            case "randomData.generate.sentence":
                userInput = fieldType[x].fieldOption;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('sentence'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('sentence'," + userInput + ")").toString() + delimiter;
                }
                break;
            case "randomData.generate.alphanumericStr":
                userInput = fieldType[x].fieldOption;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('alphanumeric'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('alphanumeric'," + userInput + ")").toString() + delimiter;
                }
                break;
            case "randomData.generate.alphanumericChar":
                userInput = 1;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('alphanumeric'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('alphanumeric'," + userInput + ")").toString() + delimiter;
                }
                break;
            case "default":
                userInput = fieldType[x].fieldOption;
                if (x == fieldType.length -1 ){
                  apiValue = userInput.toString();
                } else {
                  apiValue = userInput.toString() + delimiter;
                }
                break;
            case "randomData.generate.char":
                userInput = 1;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('character'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('character'," + userInput + ")").toString() + delimiter;
                }
                break;
            case "casual.year":
                if (x == fieldType.length -1 ){
                  apiValue = eval(casual.year).toString();
                } else {
                  apiValue = eval(casual.year).toString() + delimiter;
                }
                break;
            default:
                if (x == fieldType.length -1 ){
                  apiValue = eval(fieldType[x].fieldType + "()").toString();
                } else {
                  apiValue = eval(fieldType[x].fieldType + "()").toString() + delimiter;
                }
          }

          fs.appendFileSync(fileName, apiValue, (err) => {
            if (err)
              console.log(err);
          });
        }
    }

    let result = {tableName : mainData[i].name, testData : fs.readFileSync(fileName, "utf8")};
    generatedData.push(result);

  }
  res.render("result",{tableData : mainData, generatedData : generatedData, baseDir : requestNo});
});

//Setting uo GET request for filedownload(/result/)
app.get("/result/:request/file/:fileName", function(req,res){
  const requestNo = req.params.request;
  const file = req.params.fileName;
  res.download(__dirname + "/GeneratedData/" + requestNo + "/" + file + ".txt");
});

//Setting up GET request for contactMe(/contact)
app.get("/contact",function(req,res){
  res.render("contact", {sentConfirmation : sentConfirmation});
});

//Setting up GET request for sendEmail(/send-email)
app.post("/send-email",function(req,res){
  const cat = req.body.category;
  const sub = req.body.subject;
  const sender = req.body.from;
  const emailBody = req.body.message;

  const email = {category: cat, subject : sub, from: sender, msg: emailBody};

  sendmail({
    from: sender,
    to: 'ankitsahu0201@gmail.com',
    subject: cat + " : " + sub,
    html: emailBody,
  }, function(err, reply) {
    if(err.length > 0){
    console.log(err && err.stack);
    console.dir(reply);
    res.render("contact",{sentConfirmation: "No", emailContent: email});
  }else {
    res.render("contact",{sentConfirmation: "Yes", emailContent: email});
  }
  });

});


//Defining port
app.listen(process.env.PORT || 3000, function(req,res){
  console.log("Server started on port 3000.")
});
