Template.TEMPLATE_NAME.events({

    // Add click handle for change animations
    'click .widget' : function(event){
        event.preventDefault();
        window.location = $(event.target).text().replace(/\W/g, '');
    }

});