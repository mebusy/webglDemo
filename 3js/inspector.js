// Immediately Invoked Function
(
    function(global) {

        const itemHtml = `
            <label> {0}({1}-{2}):</label>
            <input type="number" id="id_{0}" min="{1}" max="{2}" step="{3}" value="{4}">
        `;

        var inspector = {};
        
        // use: add( { varName } )
        inspector.add = function( singleVarArray, min=0, max=100, env=global ) {
            // console.log( singleVarArray );
            if (typeof singleVarArray != 'object') {
                utils.insertHtml( "#inspector_panel", "<div>err: use .add( {variable} ) </div>" );
                return;
            } 

            const step = (max-min)/10;
            const varName = utils.varToString( singleVarArray )

            utils.insertHtml( "#inspector_panel", itemHtml.format( varName, min, max, step, env[varName] ));

            const input = document.querySelector('#id_{0}'.format(varName) );
            input.addEventListener( 'input', function(e){ env
                // console.log(  e.target.value, typeof  e.target.value, env[varName]  );
                env[varName] = Number(e.target.value);
            }  );
        }
        // before the end of function(global) 
        // Export something the global object
        global.inspector = inspector ;

    } // end function(global)

// )(global);   // for nodejs
)(window);  // for browser
