exports.generate=function(type, length) {
   let result = '';

   //AlphaNumeric
   const alphaNumCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const alphaNumcharLength = alphaNumCharacters.length;

   //characters
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   const charLength = characters.length;

   //number
   const numbers = '0123456789';
   const numLength = numbers.length;

   //Password
   const password = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@!$#%&-.';
   const passLength = password.length;

   //Sentence
   const sentence = 'a b c d e f g h i j k l m n o p q r s t u v w x y z ';
   const sentLength = sentence.length;

   //GenderFull
   const gender = ["Male","Female","Unknown"];
   const genderLength = gender.length;

   //GenderInitials
   const gen = ["M","F"];
   const genLength = gen.length;


   if(type == "number"){
     for ( var i = 0; i < length; i++ ) {
        result += numbers.charAt(Math.floor(Math.random() * numLength));
     }
   }else if(type == "character"){
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
     }
   }else if(type == "alphanumeric"){
     for ( var i = 0; i < length; i++ ) {
        result += alphaNumCharacters.charAt(Math.floor(Math.random() * alphaNumcharLength));
     }
   }else if(type == "password"){
     for ( var i = 0; i < length; i++ ) {
        result += password.charAt(Math.floor(Math.random() * passLength));
     }
   }else if(type == "sentence"){
     for ( var i = 0; result.length < length - 1; i++ ) {
        if (i == 0){
          result += characters.charAt(Math.floor(Math.random() * charLength));
        } else{
          result += sentence.charAt(Math.floor(Math.random() * sentLength));
        }
        result = result.replace(/ +(?= )/g,'');
     }
     result = result + ".";
   }else if(type == "genderFull"){
     result = gender[Math.floor(Math.random() * genderLength)];
   }else if(type == "genderInitials"){
     result = gen[Math.floor(Math.random() * genLength)];
   }

return result;
}

exports.generateRanged=function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

exports.generateDecimal=function(len, precision) {
  var result = '';
  const numbers = '0123456789';
  const numLength = numbers.length;

  for ( var i = 0; i < len; i++ ) {
     result += numbers.charAt(Math.floor(Math.random() * numLength));
  }

  var decimalValue =  result / Math.pow(10,precision);
  return decimalValue;
}

exports.shuffler=function(data){
  const dataToShuffle = data.split("&");
  const dataLength = dataToShuffle.length;

  return dataToShuffle[Math.floor(Math.random() * dataLength)].trim();
}
