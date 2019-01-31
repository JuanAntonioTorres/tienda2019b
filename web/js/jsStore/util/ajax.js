STORE.namespace('STORE.Ajax');
(function(g){
    'use strict';

    STORE.Ajax = {
        READY_STATE_UNINITIALIZED : 0,
        READY_STATE_LOADING : 1,
        READY_STATE_LOADED : 2,
        READY_STATE_INTERACTIVE : 3,
        READY_STATE_COMPLETE : 4
    };
// Constructor
    STORE.Ajax.CargadorContenidos = function (url, funcion, json, funcionError) {
        this.url = url;
        this.req = null;
        this.json =  json || "";
        this.onload = funcion;
        this.onerror = (funcionError) ? funcionError : this.defaultError;
        this.cargaContenidoXML(url);
    };

    STORE.Ajax.CargadorContenidos.prototype =  {
        cargaContenidoXML: function(url) {
            if(window.XMLHttpRequest) {
                this.req = new XMLHttpRequest();
            }
            else if(window.ActiveXObject) {
                this.req = new ActiveXObject("Microsoft.XMLHTTP");
            }

            if(this.req) {
                try {
                    var loader = this;
                    this.req.onreadystatechange = function() {
                        loader.onReadyState.call(loader);
                    };
                    this.req.open('POST', url, true);
                    this.req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                    this.req.send( "json="+this.json);
                } catch(err) {
                    this.onerror.call(this);
                }
            }
        },

        onReadyState: function() {
            var req = this.req;
            var ready = req.readyState;
            if(ready == STORE.Ajax.READY_STATE_COMPLETE) {
                var httpStatus = req.status;
                if(httpStatus == 200 || httpStatus == 0) {
                    this.onload.call(this);
                }
                else {
                    this.onerror.call(this);
                }
            }
        },

        defaultError: function() {
            alert("Se ha producido un error al obtener los datos"
                + "\n\nreadyState:" + this.req.readyState
                + "\nstatus: " + this.req.status
                + "\nheaders: " + this.req.getAllResponseHeaders());
        }
    };
})(window);
