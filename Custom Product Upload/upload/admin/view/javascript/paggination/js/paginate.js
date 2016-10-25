(function($){

       $.fn.customPaginate = function(options)
       {
           var paginationContainer = this;
           var itemsToPaginate;
          // alert('in')
            
           var defaults = {
       
                itemsPerPage : 24
           
           };
        
           var settings = {};
        
           $.extend(settings, defaults, options);
           
           var itemsPerPage = settings.itemsPerPage;
        
           itemsToPaginate = $(settings.itemsToPaginate);
           var numberOfPaginationLinks = Math.ceil((itemsToPaginate.length / itemsPerPage));

           $('.pagingCont').remove();
           $("<ul class='pagingCont'></ul>").prependTo(paginationContainer);
           
           for(var index = 0; index < numberOfPaginationLinks; index++)
           {
                paginationContainer.find("ul").append("<li>"+ (index+1) + "</li>");
           }
           
           itemsToPaginate.filter(":gt(" + (itemsPerPage - 1)  + ")").hide();
           
           paginationContainer.find("ul li").first().addClass(settings.activeClass).end().on('click', function(){
			   
			   var $this = $(this);
			   
			   $this.addClass(settings.activeClass);
			   
			   $this.siblings().removeClass(settings.activeClass);
           
               var linkNumber = $this.text();
               
                var itemsToHide = itemsToPaginate.filter(":lt(" + ((linkNumber-1) * itemsPerPage)  + ")");
                $.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((linkNumber * itemsPerPage) - 1)  + ")"));
                
                var itemsToShow = itemsToPaginate.not(itemsToHide);

                $("html,body").animate({scrollTop:"0px"}, function(){
                  itemsToHide.hide();
                  itemsToShow.show();
                });
           });
           
       }
            






    $.fn.arrayPaginate = function(inputArray,container)
    {
        var paginationContainer = this;
        var itemsToPaginate=inputArray.length;
      //  alert('in')



           var itemsPerPage = 24


   if (itemsToPaginate<24){
       container.html(inputArray);

   }else {
       var settings = {};
var draw=[];


       for (var j = 0; j < 24 ; j++){
           draw.push(inputArray[j]);
       }
     //  $.extend(settings, defaults, options);


       container.html(draw);

       var numberOfPaginationLinks = Math.ceil(itemsToPaginate / itemsPerPage);

       $('.pagingCont').remove();

       $("<ul class='pagingCont'></ul>").prependTo(paginationContainer);

       for (var index = 0; index < numberOfPaginationLinks; index++) {

           this.find("ul").append("<li>" + (index + 1) + "</li>");
       }

     // itemsToPaginate.filter(":gt(" + (itemsPerPage - 1) + ")").hide();

       paginationContainer.find("ul li").first().addClass(settings.activeClass).end().on('click', function () {

           $('.page').remove();
           var $this = $(this);

           $this.addClass("active-class");

           $this.siblings().removeClass("active-class");

           var linkNumber = $this.text();
           var ItemsToDraw = [];
           for (var i = 24 * (linkNumber - 1); i < 24 * (linkNumber - 1) + 24; i++) {
               if (i < inputArray.length)
                   ItemsToDraw.push(inputArray[i]);
           }
           container.html(ItemsToDraw)

       });
       container.html(ItemsToDraw)
       alert(inputArray, ItemsToDraw, container);
   }
    }

}(jQuery));