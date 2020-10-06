function validateTableNames(){

  const tableCnt = document.querySelectorAll(".tables").length;
  let validationFlag=true;
  let duplicateFlag=false;
  const tableName = [];

  for(var i = 0 ; i < tableCnt ; i++)
  {
    if(document.querySelectorAll(".tables")[i].value.trim().length == 0){
      document.querySelectorAll(".tables")[i].style.borderColor="red";
      validationFlag=false;
    }
    else{
      document.querySelectorAll(".tables")[i].style.backgroundColor="#E8FED2";
      document.querySelectorAll(".tables")[i].style.borderColor="#1abc9c";
      duplicateFlag=false;
      for (var j=0; j<tableName.length; j++)
      {
          if(tableName[j] == document.querySelectorAll(".tables")[i].value.trim()){
            duplicateFlag=true;
            for(var k = 0 ; k < tableCnt ; k++)
            {
                if(document.querySelectorAll(".tables")[k].value.trim() == tableName[j]){
                  document.querySelectorAll(".tables")[k].style.backgroundColor="#FC7573";
                  document.querySelectorAll(".tables")[k].style.borderColor="red";
                }
            }
            // Throwing error as duplicate table names found.
            $("#alertWarning").html('<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>');
            $("#alertWarning").append("<strong> Error!</strong> Duplicate names found.");
            $("#alertWarning").css('display','block');
            setTimeout(function(){
              $("#alertWarning").css('display','none');
            }, 5000);
            validationFlag=false;
            break;
          }
      }
      tableName.push(document.querySelectorAll(".tables")[i].value.trim());
    }
  }

  if(validationFlag){
    location.href = '/saveStep1/' + tableName;
  }

}
