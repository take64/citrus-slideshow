/**
 * citrus-slideshow
 * version 1.0.0.0
 *
 * jquery 3.2.1 later
 *
 * @copyright   Copyright 2017, Citrus/besidesplus All Rights Reserved.
 * @author      take64 <take64@citrus.tk>
 */

(function(jQuery) {
    var SLIDE_DIRECTION = {
        'PREV': 'prev',
        'NEXT': 'next'
    };

    jQuery.fn.citrusSlideshow = function(_options) {
        var options = jQuery.extend(true, {
            autoplay: {
                enable: true,
                speed: 2000,
                handle: null
            },
            arrows: {
                enable: true,
                prev: 'PREV',
                next: 'NEXT',
                origin: {
                    x: 100,
                    y: 100
                }
            },
            dots: {
                enable: true,
                icon: '●'
            },
            size: {
                width: 800,
                height: 480
            }
        }, _options);

        // modify slideshow
        $(this).addClass('citrus-slideshow').css({
            width: options.size.width,
            height: options.size.height
        });

        // modify container
        var innerElements = $(this).children();
        var item_count = innerElements.length;
        var container = $('<div></div>').attr('class', 'cs-container').css({
            width: item_count * 100 + '%'
        });
        container.append(innerElements);
        $(this).append(container);

        // modify container item
        $.each(innerElements, function(ky, vl) {
            $(vl).addClass('cs-item').css('width', options.size.width);
        });

        // arrows
        if (options.arrows.enable === true) {
            // add button prev
            var prevButton = $('<div></div>').addClass('cs-arrow').css({
                top: options.arrows.origin.y,
                left: options.arrows.origin.x
            }).html(options.arrows.prev);
            prevButton.click(function() {
                doSlidePrev(options, container);
            });
            $(this).append(prevButton);

            // add button next
            var nextButton = $('<div></div>').addClass('cs-arrow').css({
                top: options.arrows.origin.y,
                right: options.arrows.origin.x
            }).html(options.arrows.next);
            nextButton.click(function() {
                doSlideNext(options, container);
            });
            $(this).append(nextButton);
        }


        // autoplay kicker
        doAutoplay(options, container);

        // // autoplay
        // if (options.autoplay.enable === true) {
        //     var autoplay = function () {
        //         doSlideNext(options, container);
        //         setTimeout(autoplay, options.autoplay.speed);
        //     };
        //     autoplay();
        // }

        return this;
    };

    /** do slide prev */
    function doSlidePrev(options, container) {
        var index = callSlideMovedIndex(options, container, SLIDE_DIRECTION.PREV);
        var left = (index * options.size.width * -1);
        $(container).animate({
            'left': left
        });
        // autoplay
        doAutoplay(options, container);
    }

    /** do slide next */
    function doSlideNext(options, container) {
        var index = callSlideMovedIndex(options, container, SLIDE_DIRECTION.NEXT);
        var left = (index * options.size.width * -1);
        $(container).animate({
            'left': left
        });
        // autoplay
        doAutoplay(options, container);
    }

    /** do autoplay*/
    function doAutoplay(options, container) {
        if (options.autoplay.enable === true) {
            if (options.autoplay.handle !== null) {
                clearTimeout(options.autoplay.handle);
                options.autoplay.handle = null;
            }
            options.autoplay.handle = setTimeout(function () {
                doSlideNext(options, container);
            }, options.autoplay.speed);
        }
    }

    /** call slide moved index */
    function callSlideMovedIndex(options, container, direction) {
        var index = 0;
        var item_count = container.children().length;
        var offset_left = container.offset().left;
        if (direction === SLIDE_DIRECTION.NEXT) {
            index = (Math.floor(offset_left / options.size.width) * -1) + 1;
            if (index >= item_count) {
                index = 0;
            }
        } else if(direction === SLIDE_DIRECTION.PREV) {
            index = (Math.floor(offset_left / options.size.width) * -1) - 1;
            if (index < 0) {
                index = (item_count - 1);
            }
        }
        return index;
    }

})(jQuery);
