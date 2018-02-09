var masonry_grid;
var $gridItem
$(document).ready(function() {

    masonryInit();

    $.getJSON('https://jsonplaceholder.typicode.com/posts', function(data) {
        $.each(data, function(i) {
            if (i < 16) {
                // get a random number
                // it is added to url for random image
                // all images will be the same without the id (https://github.com/unsplash/unsplash-source-js/issues/9)
                randomImgId = getRandomInt(4000);
                console.log(randomImgId);
                $gridItem =
                    $('<div class="grid-item js-grid-item js-grid-item--flippable grid-item--image">'+
                        '<div class="item-hover_border"></div>'+
                        '<div class="item-flipper">'+
                            '<div class="item-front">'+
                                '<img src="https://source.unsplash.com/random?sig='+randomImgId+'" alt="" class="item-img">'+
                                '<div class="item-title_wrapper"> '+
                                    '<h3 class="item-title item-title--medium">'+ data[i].title +'</h3>'+
                                '</div>'+
                            '</div>'+
                            '<div class="item-back">'+
                                '<p class="back-txt">'+data[i].body+'</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>');

                    masonry_grid.append($gridItem).masonry('appended', $gridItem);
            }

        });
    }).then(function() {
        imagesloaded();
    });

    //remove unecessary node #text from html
    clean(document.body);

    $(window).resize(function() {
        masonry_grid.masonry('layout');
    });

    $(document).on('click', '.js-grid-item--flippable', function() {
        $(this).toggleClass('grid-item--flipped');
    });


});


function masonryInit() {
    masonry_grid = $('.js-grid').masonry({
        itemSelector: '.js-grid-item',
        columnWidth: 300,
        gutter : 10
    });
}

function imagesloaded() {
    $('.js-grid-item').imagesLoaded().progress(function() {
        masonry_grid.masonry('layout');
    });
}


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
