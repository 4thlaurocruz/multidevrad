Template.TEMPLATE_NAME.rendered = function(){

    // Add special class for handel top navigation layout
    $('body').addClass('top-navigation');

}

Template.TEMPLATE_NAME.destroyed = function(){

    // Remove special top navigation class
    $('body').removeClass('top-navigation');
};