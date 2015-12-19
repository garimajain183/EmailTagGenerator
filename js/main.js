$(function() {

  var lastSelectedTag;
  //Search for input
  $('#emailList input').on('keyup',function(e) {
      switch (e.keyCode) {
          case 8:  // Backspace key up event
            if (isEmpty(lastSelectedTag)) {
              lastSelectedTag = $('#emailList').find('span.emailTagCont:last');
              selectTag(lastSelectedTag, true);
            } else {
              lastSelectedTag.remove();
              lastSelectedTag = null;
            }
            break;
          case 32: // space key up event
            createEmailTag();
          break;
          default:
          break;
      }
  });

 // Creates Email tag
  function createEmailTag() {
    var emailInputVal = $('#emailList input');
    var emails = emailInputVal.val();
    if (!isEmpty(emails)) {
      var emailArr = emails.split(",");
      for (i = 0; i < emailArr.length; i++) {
          if (isValidEmail(emailArr[i].trim())) {
            emailInputVal.before('<span class="emailTagCont"><span class="emailTag"> <span class="emailTagClose"> x </span> </span>'+ emailArr[i] +'</span>');
            selectTag(lastSelectedTag, false);
            lastSelectedTag = null;
          } else {
            if (!isEmpty(emailArr[i])) {
              alert("Invalid email: "+ emailArr[i]);
            }
          }
      }
      emailInputVal.val("");
    }
  }

  //Highlighting tag
  function selectTag(span, isSelected) {
    if (!isEmpty(span)) {
      if (isSelected) {
        span.css({"background-color":"#1693bd","color":"#fff"});
      } else {
        span.css({"background-color":"#dce0df","color":"#000"});
      }
    }
  }

  // Click on close remove tag
  $('#emailList').on('click','.emailTagClose',function(){
      $(this).closest('.emailTagCont').remove();
  });

  // Check for empty variable
  function isEmpty(variable) {
    if (variable == '' || variable == null) {
      return true;
    }
    return false;
  }

 //Email Validation
  function isValidEmail(email) {
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return re.test(email);
  }

});