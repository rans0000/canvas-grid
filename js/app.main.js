/*jshint browser: true */
/*global $: true */
/*global CanvasGrid: true */

(function(){
    'use strict';
    
    //register clickHandler
    $('.template-list-wrapper').on('click', '.list-group-item', onTemplateClck);

    //load data from fake API
    $.get('data/data-list.json')
        .done(onDataLoadSuccess);

    function onDataLoadSuccess (apiResponse) {
        createTemplateList(apiResponse);
    }

    function createTemplateList (templateList) {
        var ul = $('.template-list-wrapper')
        .empty()
        .append('<ul>', {
            class: 'list-group'
        });
        templateList.forEach(function (template) {
            //var itemContent = $('')
            var item = $('<li>', {
                class: 'list-group-item'
            })
            .append($('<img>', {
                src: template.thumb
            }))
            .append($('<span>', {
                text: template.name
            }));
            item.data('template', template);
            ul.append(item);
        });
    }
    
    function onTemplateClck () {
        var template = $(this).data('template');
        var canvas = new CanvasGrid('.artboard-wrapper', 400, 400, template);
    }

})();