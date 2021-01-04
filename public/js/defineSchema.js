function defineSchema(element){
  const elementOrder = element.innerHTML;
  const tableName = element.getAttribute('data-name');
  const elementSeq = elementOrder.substr(6);

  for(var i = 0 ; i < $(".finalTables").length; i++){
    i++;
    if (!document.querySelector(".finalTables#btn" + i).classList.contains("btn-danger")){
      $(".finalTables").removeClass("btn-primary");
      $(".finalTables#btn" + i).addClass("btn-dark");
      element.classList.remove("btn-dark");
      element.classList.add("btn-primary");
    }
    i--;
  }

  // $(".finalTables").removeClass("btn-primary");
  // $(".finalTables").addClass("btn-dark");
  // element.classList.remove("btn-dark");
  // element.classList.add("btn-primary");

  $(".blocksExtended").removeClass("visible");
  $(".blocksExtended").addClass("invisible");

  $("#schemaBlock-" + elementSeq).removeClass("invisible");
  $("#schemaBlock-" + elementSeq).addClass("visible");

}

function addNewAttribute(element){
  const tabName = element.parentElement.querySelector("h3").textContent;
  $('<div id="table-' + tabName + '"><input type="text" placeholder="Field Name" class="fieldName"><select name="dataType" class="fieldType" onchange="populateOption(this)"> <optgroup label="Most Common"><option value="faker.random.uuid">UUID(Random)</option><option value="faker.random.number">Number(Random)</option><option value="randomData.generateRanged">Number(WithinRange)</option><option value="randomData.generate.number">Number(FixedLength)</option><option value="numSequence">Number(Sequence)</option><option value="randomData.generateDecimal">Number(Decimal)</option><option value="faker.lorem.word">String(Random)</option><option value="randomData.generate.string">String(FixedLength Word)</option><option value="randomData.generate.sentence">String(FixedLength Sentence)</option><option value="randomData.generate.char">Character(Random)</option><option value="randomData.generate.alphanumericChar">AlphaNumeric(Character)</option><option value="randomData.generate.alphanumericStr">AlphaNumeric(String)</option><option value="default">Default</option><option value="shuffler">Shuffler</option><option value="dt.date">Today\'s Date</option><option value="dt.datetime">Today\'s Datetime</option> </optgroup>  <optgroup label="Random"><option value="faker.random.word">Word</option><option value="faker.random.words">Words</option><option value="faker.lorem.sentence">Sentence</option><option value="faker.lorem.text">Text</option><option value="faker.lorem.paragraph">Paragraph</option> </optgroup>  <optgroup label="Date"><option value="dt.datePast">PastDate(Random)</option><option value="dt.dateFuture">FutureDate(Random)</option><option value="dt.datetimePast">PastDatetime(Random)</option><option value="dt.datetimeFuture">FutureDatetime(Random)</option><option value="dt.dateLessThan">DateBefore</option><option value="dt.dateGreaterThan">DateAfter</option><option value="dt.datetimeLessThan">DatetimeBefore</option><option value="dt.datetimeGreaterThan">DatetimeAfter</option><option value="dt.dateBetween">DateBetween</option><option value="dt.datetimeBetween">DatetimeBetween</option><option value="casual.year">Year</option><option value="faker.date.weekday">Weekday</option> </optgroup>  <optgroup label="Bank"><option value="faker.finance.account">AccountNo(Random)</option><option value="faker.finance.accountName">AccountName</option><option value="faker.finance.amount">Amount</option><option value="faker.finance.transactionType">TransactionType</option><option value="faker.finance.currencyCode">CurrencyCode</option><option value="faker.finance.currencyName">CurrencyName</option><option value="faker.finance.currencySymbol">CurrencySymbol</option><option value="faker.finance.creditCardNumber">CreditCardNumber</option><option value="faker.finance.creditCardCVV">CreditCardCVV</option><option value="faker.finance.transactionDescription">TransactionDescription</option> </optgroup>  <optgroup label="Customer"><option value="faker.internet.userName">UserName</option><option value="faker.internet.password">UserPassword</option><option value="faker.internet.email">Email</option><option value="faker.internet.url">URL</option><option value="faker.internet.ip">IP Address</option><option value="faker.name.firstName">FirstName</option><option value="faker.name.lastName">LastName</option><option value="randomData.generate.genderFull">Gender(Full)</option><option value="randomData.generate.genderInitials">Gender(Initials)</option><option value="faker.name.prefix">NamePrefix</option><option value="faker.name.suffix">NameSuffix</option><option value="faker.name.title">Title</option><option value="faker.name.jobType">JobType</option> </optgroup>  <optgroup label="Company"><option value="faker.company.companySuffix">CompanySuffix</option><option value="faker.company.companyName">CompanyName</option> </optgroup>  <optgroup label="Phone"><option value="faker.phone.phoneNumber">PhoneNumber</option><option value="faker.phone.phoneNumberFormat">PhoneNumberFormat</option><option value="faker.phone.phoneFormats">PhoneFormats</option> </optgroup>  <optgroup label="Address"><option value="faker.address.zipCode">ZipCode</option><option value="faker.address.zipCodeByState">ZipCodeByState</option><option value="faker.address.city">City</option><option value="faker.address.cityPrefix">CityPrefix</option><option value="faker.address.citySuffix">CitySuffix</option><option value="faker.address.streetName">StreetName</option><option value="faker.address.streetAddress">StreetAddress</option><option value="faker.address.streetSuffix">StreetSuffix</option><option value="faker.address.streetPrefix">StreetPrefix</option><option value="faker.address.secondaryAddress">SecondaryAddress</option><option value="faker.address.county">County</option><option value="faker.address.country">Country</option><option value="faker.address.countryCode">CountryCode</option><option value="faker.address.state">State</option><option value="faker.address.stateAbbr">StateAbbr</option><option value="faker.address.latitude">Latitude</option><option value="faker.address.longitude">Longitude</option><option value="faker.address.direction">Direction</option><option value="faker.address.cardinalDirection">CardinalDirection</option><option value="faker.address.ordinalDirection">OrdinalDirection</option><option value="faker.address.timeZone">TimeZone</option> </optgroup>  </select><input type="text" placeholder="Options" class="fieldOption" disabled="true"><br>').insertBefore(element);

}

function addNewRelationship(element){
  $(".hiddenTemplate").clone().attr('class', 'visible').insertBefore(element);
}

function populateOption(element, flag){
  const selection = element.value;

  if (flag == "Y")
    element.nextSibling.value="";
  switch(selection){
    case "randomData.generateRanged": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Min - Max"
        break;
    case "randomData.generate.number": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Specify Length"
        break;
    case "numSequence": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Initial Number"
        break;
    case "randomData.generate.string": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Specify Length"
        break;
    case "randomData.generate.sentence": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Specify Length"
        break;
    case "randomData.generate.alphanumericStr": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Specify Length"
        break;
    case "default": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Specify Value"
        break;
    case "randomData.generateDecimal": element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Length, Precision"
        break;
    case "shuffler" : element.nextSibling.disabled = false;
        element.nextSibling.placeholder="Specify value(s)"
        break;

    case "dt.dateLessThan" :
    case "dt.dateGreaterThan" :
    case "dt.datetimeLessThan" :
    case "dt.datetimeGreaterThan" :    element.nextSibling.disabled = false;
        element.nextSibling.placeholder="YYYY-MM-DD"
        break;

    case "dt.dateBetween" :
    case "dt.datetimeBetween" : element.nextSibling.disabled = false;
        element.nextSibling.placeholder="YYYY-MM-DD & YYYY-MM-DD"
        break;

    default: element.nextSibling.disabled = true;
        element.nextSibling.placeholder="Options"
  }

}
