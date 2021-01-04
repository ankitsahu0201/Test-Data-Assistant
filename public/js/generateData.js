function generateData(){
  const relationships=[];
  for (var i = 0; i < document.querySelectorAll("#relationships div").length ; i++){
      let lhs = document.querySelectorAll("#relationships div .tabNameLeft")[i].value + "." + document.querySelectorAll("#relationships div .tabAttrLeft")[i].value;
      let rhs = document.querySelectorAll("#relationships div .tabNameRight")[i].value + "." + document.querySelectorAll("#relationships div .tabAttrRight")[i].value;
      relationships.push(lhs + "=" + rhs);
  }

  location.href = '/generateData/' + relationships;
}
