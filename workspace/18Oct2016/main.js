var curPage = 1;
var isLoad = false;
var lastTumblr = '';


document.addEventListener("DOMContentLoaded", function(event){

  var button = document.getElementById('js-click');
  button.addEventListener('click', function(event){
    if(isLoad===false){
      isLoad = true;

      if(lastTumblr!=$("#selTmblr").val()){
        lastTumblr=$("#selTmblr").val();
        $("#response-images").html('');
        $("#js-stuff").html('new page source');
        curPage = 1;
      }

      $("#js-click").html('Pause Loading');
      loadNextPage();
    }else{
      isLoad = false;
      $("#js-click").html('Start Loading');
    }
  });

});

function loadNextPage(){
  if(isLoad===true){

    var url = 'http://' + lastTumblr + '.tumblr.com/page/'
    $.ajax({
        url: url + curPage,
        type: 'GET',
        success: function(res) {
            var responseHtml = $.parseHTML( res.responseText );
            var html = '';

            var images = $(responseHtml).find("img");

            $.each( images, function( i, el ) {
              //if(el.src.endsWith('.gif')){
                html += "<div style='float:left;width:100px;height:100px;background-color:#000000;overflow:hidden;'>";
                html += "<a href='" + url + curPage + "' target='_blank'>";
                html += "<img style='width:100px' src='" + el.src + "' border='0'/>";
                html += "</a>";
                html += "</div>";
              //}
            });

            $("#response-images").prepend(html);
            $("#js-stuff").html('last page loaded: ' + curPage);
            curPage++;
            loadNextPage();

        }
    });
  }
}
