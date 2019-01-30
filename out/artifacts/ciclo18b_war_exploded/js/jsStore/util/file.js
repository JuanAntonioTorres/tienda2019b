/**
 * Created by Luciano on 17/10/2018.
 */

STORE.namespace('STORE.File');

STORE.File.getFileNameFromURI = function(uri){
    return uri.substr(uri.lastIndexOf('\\') + 1).split('.')[0];
}
STORE.File.getFileExtensionFromURI = function(uri){
    return uri.substr(uri.lastIndexOf('\\') + 1).split('.')[1];
}