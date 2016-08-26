/*jshint browser: true */
/*global $: true */

(function(){
    'use strict';

    window.CanvasGrid = window.CanvasGrid || CanvasGrid;

    function CanvasGrid (artboardWrapper, width, height, template) {
        this.width = width;
        this.height = height;
        this.template = template;
        this.artboardWrapper = $(artboardWrapper);
        this.artboard = this.artboardWrapper.children().eq(0);

        this.init(this.artboardWrapper, this.width, this.height);
    }

    CanvasGrid.prototype.init = function () {
        var artBoardDim;
        this.setUpArtBoardWrapper();
        artBoardDim = this.setUpArtBoard();
        this.setUpGrids(artBoardDim);
    };

    CanvasGrid.prototype.setUpArtBoardWrapper = function () {
        //setup artboardwrapper
        this.artboardWrapper.css({
            width: this.width,
            height: this.height
        });
    };

    CanvasGrid.prototype.setUpArtBoard = function () {
        //setup artboard
        var tW;
        var tH;
        if(this.template.artboardSize.w > this.template.artboardSize.h){
            tW = this.width;
            tH = tW * this.template.artboardSize.h;
        }
        else{
            tH = this.height;
            tW = tH / this.template.artboardSize.h;
        }
        this.artboard
            .empty()
            .css({
            width: tW,
            height: tH,
            marginLeft: -tW/2,
            marginTop: -tH/2
        });
        return {
            width: tW,
            height: tH
        };
    };

    CanvasGrid.prototype.setUpGrids = function (artBoardDim) {
        var selfed = this;
        this.template.grid.forEach(function (gridData) {
            var gridItem = $('<div>', {
                class: 'grids',
            }).css({
                width: (artBoardDim.width * gridData.w / 100),
                height: ( artBoardDim.height * gridData.h / 100),
                top: (artBoardDim.width * gridData.x / 100) + 'px',
                left: (artBoardDim.width * gridData.y / 100) + 'px'
            });
            gridItem.appendTo(selfed.artboard);
        });
    };

})();