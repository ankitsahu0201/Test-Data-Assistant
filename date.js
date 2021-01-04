exports.date = function(){
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return(year + "-" + month + "-" + date);
}

exports.datetime = function(){
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

exports.datePast = function(){
  let end = new Date();
  let start = new Date(1900, 0, 1);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return(year + "-" + month + "-" + date);
}

exports.dateFuture = function(){
  let start = new Date();
  let end = new Date(3499, 11, 31);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return(year + "-" + month + "-" + date);
}

exports.datetimePast = function(){
  let end = new Date();
  let start = new Date(1900, 0, 1);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

exports.datetimeFuture = function(){
  let start = new Date();
  let end = new Date(3499, 11, 31);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

exports.dateLessThan = function(data){
  let temp = data.toString().trim().split("-");
  let end = new Date(temp[0], parseInt(temp[1])-1, temp[2]);
  let start = new Date(1900, 0, 1);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return(year + "-" + month + "-" + date);
}

exports.dateGreaterThan = function(data){
  let temp = data.toString().trim().split("-");
  let start = new Date(temp[0], parseInt(temp[1])-1, temp[2]);

  let end = new Date(3499, 11, 31);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return(year + "-" + month + "-" + date);
}

exports.datetimeLessThan = function(data){
  let temp = data.toString().trim().split("-");
  let end = new Date(temp[0], parseInt(temp[1])-1, temp[2]);

  let start = new Date(1900, 0, 1);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

exports.datetimeGreaterThan = function(data){
  let temp = data.toString().trim().split("-");
  let start = new Date(temp[0], parseInt(temp[1])-1, temp[2]);

  let end = new Date(3499, 11, 31);
  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

exports.dateBetween = function(startDate, endDate){
  let temp1 = startDate.toString().trim().split("-");
  let start = new Date(temp1[0], parseInt(temp1[1])-1, temp1[2]);

  let temp2 = endDate.toString().trim().split("-");
  let end = new Date(temp2[0], parseInt(temp2[1])-1, temp2[2]);

  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return(year + "-" + month + "-" + date);
}

exports.datetimeBetween = function(startDate, endDate){
  let temp1 = startDate.toString().trim().split("-");
  let start = new Date(temp1[0], parseInt(temp1[1])-1, temp1[2]);

  let temp2 = endDate.toString().trim().split("-");
  let end = new Date(temp2[0], parseInt(temp2[1])-1, temp2[2]);

  let date_ob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}
