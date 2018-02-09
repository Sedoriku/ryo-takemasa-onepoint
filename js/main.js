$(document).ready(function() {

    $.getJSON('https://jsonplaceholder.typicode.com/posts', function(data) {
        $.each(data, function(i) {

            if (i < 25) {
                // get a random number
                // it is added to url for random image
                // all images will be the same without the id (https://github.com/unsplash/unsplash-source-js/issues/9)
                randomImgId = getRandomInt(1000);


                var grid_post_html = '<div class="grid-item js-grid-item grid-item--image">';
                    grid_post_html +=   '<div class="item-hover_border"></div>';
                    grid_post_html +=   '<img src="https://source.unsplash.com/random?sig='+randomImgId+'" alt="" class="item-img">';
                    grid_post_html +=   '<div class="item-title_wrapper"> ';
                    grid_post_html +=       '<h3 class="item-title item-title--medium">'+ data[i].title +'</h3>';
                    grid_post_html +=   '</div>';
                    grid_post_html +='</div>';

                $('.js-grid').append(grid_post_html);
            }
        });
    });


    //remove node #text from html
    clean(document.body);

    // $('.js-grid').masonry({
    //     itemSelector: '.grid-item',
    //     columnWidth: 300
    // });

});



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function clean(node)
{
  for(var n = 0; n < node.childNodes.length; n ++)
  {
    var child = node.childNodes[n];
    if
    (
      child.nodeType === 8
      ||
      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
    )
    {
      node.removeChild(child);
      n --;
    }
    else if(child.nodeType === 1)
    {
      clean(child);
    }
  }
}
