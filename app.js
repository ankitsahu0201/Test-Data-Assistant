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
const readline = require('readline');
const lineByLine = require('n-readlines');

//Calling fileUpload javascript package
const fileupload = require('express-fileupload');
const cors = require('cors');

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
//console.log(randomData.generateDecimal(10,1));

//Setting up app
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(fileupload());
app.use(cors());

//Defining mainData
let mainData=[];
let tableOptions=[];
let tableAttributes=[];
let tableRelationships=[];
let sentConfirmation="";
let tempTableAttributes=[];

//Setting up GET request for root(/)
app.get("/",function(req,res){
  res.render("home");
});

//Setting up GET request for start(/start/Step1)
app.get("/start/:step",function(req,res){
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
  tableOptions=[];
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
        if (tabOptions[j+2].length == 0)
          tabOptions[j+2] = ',';
      
        let option = {table: tabOptions[j], recordCnt: tabOptions[j+1], recordDelimiter: tabOptions[j+2]};
        tableOptions.push(option);
      }
    }
  }

  console.log(tableOptions);

  res.redirect("/start/Step3");

});

//Setting up GET request for generateData(/generateData)
app.get("/generateData/:relationships", function(req,res){
  const dataRelationship = req.params.relationships.split(",");

  tableRelationships=[];
  for(var i = 0 ; i < dataRelationship.length ; i++)
  {
    let dataSides = dataRelationship[i].split("=");
    let lhs = dataSides[0].split(".");
    let rhs = dataSides[1].split(".");
    let relation = {lhsTable : lhs[0], lhsField : lhs[1], rhsTable : rhs[0], rhsField : rhs[1], status : ""};
    tableRelationships.push(relation);
  }


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
            let typeOption = {fieldName : tableAttributes[j].fieldName, fieldType : tableAttributes[j].fieldType, fieldOption: tableAttributes[j].fieldOption};
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

    let relationFoundFlag = false;
    let relationField = [];
    for (var relationCounter = 0; relationCounter < tableRelationships.length; relationCounter++){
      if (mainData[i].name == tableRelationships[relationCounter].lhsTable){
        relationField.push(tableRelationships[relationCounter].lhsField);
        relationFoundFlag = true;
      }else if (mainData[i].name == tableRelationships[relationCounter].rhsTable){
        relationField.push(tableRelationships[relationCounter].rhsField);
        relationFoundFlag = true;
      }
    }

    for(var k=0; k < recordCnt; k++){
        fs.appendFileSync(fileName, os.EOL, (err) => {
          if (err)
            console.log(err);
        });

        for (var x=0; x<fieldType.length; x++){
          let apiValue = "";
          let userInput = "";

          for (var chk = 0; chk < relationField.length; chk++)
          {
            if (fieldType[x].fieldName == relationField[chk]){

            }
          }

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
            case "randomData.generateDecimal":
                var customData = fieldType[x].fieldOption.split("&");
                userInput = parseInt(customData[0].toString().trim()) + "," + parseInt(customData[1].toString().trim());
                if (x == fieldType.length -1 ){
                  apiValue = eval(fieldType[x].fieldType + "(" + userInput + ")").toString();
                } else {
                  apiValue = eval(fieldType[x].fieldType + "(" + userInput + ")").toString() + delimiter;
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
            case "randomData.generate.char":
                userInput = 1;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('character'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('character'," + userInput + ")").toString() + delimiter;
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
            case "shuffler":
                userInput = fieldType[x].fieldOption;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.shuffler('" + userInput + "')").toString();
                } else {
                  apiValue = eval("randomData.shuffler('" + userInput + "')").toString() + delimiter;
                }
                break;
            case "dt.dateLessThan":
            case "dt.dateGreaterThan":
            case "dt.datetimeLessThan":
            case "dt.datetimeGreaterThan":
                userInput = fieldType[x].fieldOption;
                if (x == fieldType.length -1 ){
                  apiValue = eval(fieldType[x].fieldType + "('" + userInput + "')").toString();
                } else {
                  apiValue = eval(fieldType[x].fieldType + "('" + userInput + "')").toString() + delimiter;
                }
                break;
            case "dt.dateBetween":
            case "dt.datetimeBetween":
                userInput = fieldType[x].fieldOption.split("&");
                if (x == fieldType.length -1 ){
                  apiValue = eval(fieldType[x].fieldType + "('" + userInput[0].trim() + "','" + userInput[1].trim() + "')").toString();
                } else {
                  apiValue = eval(fieldType[x].fieldType + "('" + userInput[0].trim() + "','" + userInput[1].trim() + "')").toString() + delimiter;
                }
                break;
            case "casual.year":
                if (x == fieldType.length -1 ){
                  apiValue = eval(casual.year).toString();
                } else {
                  apiValue = eval(casual.year).toString() + delimiter;
                }
                break;
            case "randomData.generate.genderFull":
                userInput = 1;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('genderFull'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('genderFull'," + userInput + ")").toString() + delimiter;
                }
                break;
            case "randomData.generate.genderInitials":
                userInput = 1;
                if (x == fieldType.length -1 ){
                  apiValue = eval("randomData.generate('genderInitials'," + userInput + ")").toString();
                } else {
                  apiValue = eval("randomData.generate('genderInitials'," + userInput + ")").toString() + delimiter;
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

//Setting up GET request for FileUpload(/file-upload/)
app.post("/file-upload/:dropId/table/:tableName", function(req,res){
    let uploadedFile = req.params.dropId;
    let timestamp = dt.datetime().replace(/:/g,'-').replace(/ /g,'_');
    let sampleFile="";

    switch(uploadedFile){
      case "1": sampleFile = req.files.file1;
                break;
      case "2": sampleFile = req.files.file2;
                break;
      case "3": sampleFile = req.files.file3;
                break;
      case "4": sampleFile = req.files.file4;
                break;
      case "5": sampleFile = req.files.file5;
                break;
      case "6": sampleFile = req.files.file6;
                break;
      case "7": sampleFile = req.files.file7;
                break;
      case "8": sampleFile = req.files.file8;
                break;
      case "9": sampleFile = req.files.file9;
                break;
      case "10": sampleFile = req.files.file10;
                break;
      case "11": sampleFile = req.files.file11;
                break;
      case "12": sampleFile = req.files.file12;
                break;
    }

    const tempFileName = __dirname + "/DMLUploads/Upload-" + timestamp + ".txt";
    sampleFile.mv(tempFileName, function(err) {
        if (err){
          return res.status(500).send(err);
        }

        tempTableAttributes=[];
        const liner = new lineByLine(tempFileName);
        let line;
        while (line = liner.next()) {
            let text = line.toString().trim();
            if (text.charAt(text.length-1) == ",")
              text = text.slice(0, -1);

            let size="";
            if (text.includes("(") ){
              let tempSize=text.split("(");
              size = tempSize[1].toString().replace(/\)/g,"");
              text=tempSize[0];
            }

            if (text.includes(" "))
            {
            let data = text.replace(/,/g,"").split(" ");
            let datatype="";
            switch(data[1].trim().toLowerCase()){
                  case "tinyint":
                  case "smallint":
                  case "int":
                  case "bigint": if (size.length > 0){
                              datatype = "randomData.generate.number";
                            } else{
                              datatype = "faker.random.number";
                            }
                            break;

                  case "decimal": if (size.length > 0){
                              datatype = "randomData.generateDecimal";
                            } else{
                              datatype = "randomData.generateDecimal";
                              size="10,0"
                            }
                            break;

                  case "char": datatype = "randomData.generate.char";
                                  break;

                  case "varchar":
                  case "string":
                  case "varchar2": if (size.length > 0){
                                  datatype = "randomData.generate.alphanumericStr";
                                }else {
                                  datatype = "faker.lorem.word";
                                }
                                break;

                  case "date":datatype = "dt.date";
                              break;

                  case "timestamp":
                  case "datetime": datatype = "dt.datetime";
                              break;

                  default: break;
              }

            let attr = {table: req.params.tableName, fieldName: data[0].trim(), fieldType: datatype, fieldOption: size};
            tempTableAttributes.push(attr);
            }
        }

        if (tableAttributes.length == 0){
              tableAttributes.push(...tempTableAttributes);
        }else {
              let index=[];
              for (var cnt=0; cnt < tableAttributes.length ; cnt++){
                  if (req.params.tableName == tableAttributes[cnt].table){
                    tableAttributes[cnt].table = "";
                    index.push(cnt);
                  }
              }
              tableAttributes.push(...tempTableAttributes);

              for (var cnt=0; cnt < index.length ; cnt++){
                  tableAttributes.splice(index[cnt] - cnt,1);
                }
        }

        tableOptions=[];
        let option = {table: req.params.tableName, recordCnt: "100", recordDelimiter: "~"};
        tableOptions.push(option);

        fs.unlink(tempFileName, function(){});

        res.redirect("/start/Step2");
    });

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
  //   if(err.length > 0){
  //   console.log(err && err.stack);
  //   console.dir(reply);
  //   res.render("contact",{sentConfirmation: "No", emailContent: email});
  // }else {
    res.render("contact",{sentConfirmation: "Yes", emailContent: email});
  //}
  });

});


//Defining port
app.listen(process.env.PORT || 3000, function(req,res){
  console.log("Server started on port 3000.")
});
