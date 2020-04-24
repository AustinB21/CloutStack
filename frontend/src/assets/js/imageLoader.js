function proxify( request ) {
    request.url = "http://www.inertie.org/ba-simple-proxy.php?mode=native&url=" + encodeURIComponent( request.url );
    return request;
}

// Create an instance of ImageResolver
// The proxy function is passed as an option
var resolver = new ImageResolver( { requestPlugin : proxify } );

// Register plugins we want to use
// You can use the built-in plugin, or create your own
// Plugins will be called in the order of their registration
resolver.register(new ImageResolver.FileExtension());
resolver.register(new ImageResolver.NineGag());
resolver.register(new ImageResolver.Instagram());
resolver.register(new ImageResolver.ImgurPage());

resolver.register(new ImageResolver.MimeType());
resolver.register(new ImageResolver.Flickr( '6a4f9b6d16c0eaced089c91a2e7e87ad' ));
resolver.register(new ImageResolver.Opengraph());
resolver.register(new ImageResolver.Webpage());

function load( url, title ) {
    resolver.resolve( url, function( result ){
        var identifier = "#"+String(title);
        $(identifier).css('width', '100%');
        $(identifier).css('height', '94%');
        $(identifier).css('border-bottom-left-radius', '23px');
        $(identifier).css('border-bottom-right-radius', '23px');
        if ( result ) {
            $(identifier).attr('src', result.image);
        } else {
            $(identifier).attr('src', "https://ichef.bbci.co.uk/news/976/cpsprodpb/10434/production/_90121666_agreementcartoon.jpg");
        }
        checkForError(title)
    });
}

function checkForError(identifier) {
    var myImage = document.getElementById(identifier)
    myImage.onerror = function () {
        myImage.src = "https://ichef.bbci.co.uk/news/976/cpsprodpb/10434/production/_90121666_agreementcartoon.jpg";
    }
}