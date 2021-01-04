function validateTableSchema(){
const tableCnt = document.querySelectorAll(".finalTables").length;
let errorFlag=false;

for (var i=0; i<tableCnt ; i++){
  let tabSeq= i + 1;
  let attributeCnt = document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldName").length;
  let incompleteFlag = false;

    for(var j=0; j<attributeCnt; j++){
      let fieldNameValue = document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldName")[j].value.trim();
      let fieldTypeValue = document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldType")[j].value.trim();
      let fieldOptionValue = document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].value.trim();
      if (fieldNameValue.length == 0){
        document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldName")[j].style.backgroundColor="#FC7573";
        incompleteFlag=true;
      }else{
        document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldName")[j].style.backgroundColor="white";
      }

      if (! document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].disabled){
        switch(fieldTypeValue){
          case "randomData.generateRanged": if (fieldOptionValue.includes("-")){
                let userInput = fieldOptionValue.split("-");
                if (!$.isNumeric(userInput[0].trim())){
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                  incompleteFlag=true;
                }else if (!$.isNumeric(userInput[1].trim())){
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                  incompleteFlag=true;
                }else{
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
                }
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }
              break;
          case "randomData.generate.number": if(fieldOptionValue.length ==0 ){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else if (!$.isNumeric(fieldOptionValue)){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
              }
              break;
          case "numSequence": if(fieldOptionValue.length ==0 ){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else if (!$.isNumeric(fieldOptionValue)){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
              }
              break;
          case "randomData.generateDecimal": if (fieldOptionValue.includes(",")){
                let userInput = fieldOptionValue.split(",");
                if (!$.isNumeric(userInput[0].trim())){
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                  incompleteFlag=true;
                }else if (!$.isNumeric(userInput[1].trim())){
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                  incompleteFlag=true;
                }else{
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
                }
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }
              break;
          case "randomData.generate.string": if(fieldOptionValue.length ==0 ){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else if (!$.isNumeric(fieldOptionValue)){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
              }
              break;
          case "randomData.generate.sentence": if(fieldOptionValue.length ==0 ){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else if (!$.isNumeric(fieldOptionValue)){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
              }
              break;
          case "randomData.generate.alphanumericStr": if(fieldOptionValue.length ==0 ){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else if (!$.isNumeric(fieldOptionValue)){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
              }
              break;

          case "default":
          case "shuffler":
          if(fieldOptionValue.length == 0){
            document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
            incompleteFlag=true;
          }else{
            document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
          }
          break;

          case "dt.dateLessThan" :
          case "dt.dateGreaterThan":
          case "dt.datetimeLessThan":
          case "dt.datetimeGreaterThan" :
              if(fieldOptionValue.length == 0){
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }else if(fieldOptionValue.includes("-")){
                var temp = fieldOptionValue.trim().split('-');
                var d = new Date(temp[0] + '/' + temp[1] + '/' + temp[2]);
                var formatCheck = (d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0]));
                if (formatCheck){
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
                }else{
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                  incompleteFlag=true;
                }
              }else{
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }
              break;

          case "dt.dateBetween":
          case "dt.datetimeBetween":
              alert(fieldOptionValue);
              if (fieldOptionValue.includes("-") && fieldOptionValue.includes("&")){
                let userInput = fieldOptionValue.split("&");
                let temp="";
                let d="";
                let formatCheck="";
                let flagValidation="true";

                for(var i = 0; i<2 ; i++){
                  temp = userInput[i].trim().split('-');
                  d = new Date(temp[0] + '/' + temp[1] + '/' + temp[2]);
                  formatCheck = (d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0]));
                  if (!formatCheck){
                    flagValidation="false";
                    break;
                  }
                }

                if(flagValidation){
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="white";
                }
                else {
                  document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                  incompleteFlag=true;
                }
              }else {
                document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].style.backgroundColor="#FC7573";
                incompleteFlag=true;
              }
              break;

        }
      }

    }

    let recordCnt = document.querySelector("#schemaBlock-" + tabSeq + " .input.recordCnt").textContent;
    let recordDelimiter = document.querySelector("#schemaBlock-" + tabSeq + " .input.recordDelimiter").textContent;
    if(recordCnt.length == 0 || recordDelimiter.length == 0){
      document.querySelector("#schemaBlock-" + tabSeq + " p").style.color = "red";
      incompleteFlag=true;
    }else if(! $.isNumeric(recordCnt)){
      document.querySelector("#schemaBlock-" + tabSeq + " p").style.color = "red";
      incompleteFlag=true;
    }

    if(incompleteFlag){
      document.querySelector("#btn" + tabSeq).classList.remove("btn-primary");
      document.querySelector("#btn" + tabSeq).classList.remove("btn-dark");
      document.querySelector("#btn" + tabSeq).classList.add("btn-danger");
      errorFlag=true;
    }
    else{
      document.querySelector("#btn" + tabSeq).classList.remove("btn-danger");
    }
}

if(! errorFlag){
  let allAttributesArray = [];
  let tableOptions = [];
  for (var i=0; i<tableCnt ; i++){
    let tabSeq= i + 1;
    let attributeCnt = document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldName").length;

    for(var j=0; j<attributeCnt; j++){
      allAttributesArray.push(document.querySelector("#btn" + tabSeq).getAttribute('data-name'));
      allAttributesArray.push(document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldName")[j].value.trim());
      allAttributesArray.push(document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldType")[j].value.trim());
      allAttributesArray.push(document.querySelectorAll("#schemaBlock-" + tabSeq + " .fieldOption")[j].value.trim().replace(/,/g," & "));
    }

    tableOptions.push(document.querySelector("#btn" + tabSeq).getAttribute('data-name'));
    tableOptions.push(document.querySelector("#schemaBlock-" + tabSeq + " .input.recordCnt").textContent);
    tableOptions.push(document.querySelector("#schemaBlock-" + tabSeq + " .input.recordDelimiter").textContent);
  }

  location.href = '/saveStep2/' + allAttributesArray + "/tableOptions/" + tableOptions;
  }

}
