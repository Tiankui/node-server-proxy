require(['jquery','underscore'],function($,_){
  $.get('articlelist',
    function (data, textStatus, jqXHR) {
      $('.header').after(data);
    }
  );
});