// Immediately Invoked Function
(
    function(global) {

        const itemHtml = `
            <label> {0}({1}-{2}):</label>
            <input type="number" id="id_{0}" min="{1}" max="{2}" step="{3}" value="{4}">
            <div></div>
        `;

        var inspector = {};
        
        // use: input( { varName } )
        inspector.input = function( env, varName, min=0, max=100, func=null ) {
            if ( env[varName] == null  ) {
                utils.insertHtml( "#inspector_panel", "<div>no such variable: {0} in {1} </div>".format( varName, env ), true );
                return;
            } 

            const step = ((max-min)/20).toFixed(2);
            // const varName = utils.varToString( singleVarArray )

            utils.insertHtml( "#inspector_panel", itemHtml.format( varName, min, max, step, env[varName] ), true);

            const ele = document.querySelector('#id_{0}'.format(varName) );
            // console.log(  ele, "addEventListener" )
            ele.addEventListener( 'input', function(e){ 
                // console.log(  e.target.value, typeof  e.target.value, env[varName] , func );
                env[varName] = Number(e.target.value);
                if (func != null) {
                    func();
                }
            }  );
        }
        // before the end of function(global) 
        // Export something the global object
        global.inspector = inspector ;

    } // end function(global)

// )(global);   // for nodejs
)(window);  // for browser
