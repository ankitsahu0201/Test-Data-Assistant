function generateGrids()
{
  const requestedTblCnt = $("#tableCntVal").val();
  if(requestedTblCnt > 12)  {
    // Throwing error as table count exceeds 12.
    $("#alertWarning").html('<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>');
    $("#alertWarning").append("<strong> Error!</strong> Dataset or table count should not exceed 12.");
    $("#alertWarning").css('display','block');
    setTimeout(function(){
      $("#alertWarning").css('display','none');
    }, 5000);
    $(".blocks").empty();
    $("#tableCntVal").val(0);
  }
  else if (requestedTblCnt <= 0){
    // Throwing error as table count is less than 0.
    $("#alertWarning").html('<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>');
    $("#alertWarning").append("<strong> Error!</strong> Minimum 1 dataset or table is required.");
    $("#alertWarning").css('display','block');
    setTimeout(function(){
      $("#alertWarning").css('display','none');
    }, 3000);
    $(".blocks").empty();
    $("#tableCntVal").val(0);
    $("#Step1NextBtn").attr("disabled", true);
  }
  else {
    //Adding dynamic grids
    $(".blocks").empty();
    for(var i = 0; i < requestedTblCnt; i++){
      $(".blocks").append("<div class='col col-lg-4 col-md-6 col-sm-6'><input type='text' class='tables' placeholder='Name?' autocomplete='none'><br><label class='labelTabSeq'><i>Table-" + (i+1) + "</i></label></div");
    }
    $("#Step1NextBtn").attr("disabled", false);
  }

}
