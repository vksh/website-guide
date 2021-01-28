jqScriptTag = document.createElement('script');
jqScriptTag.type = 'text/javascript';
jqScriptTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';

document.getElementsByTagName("head")[0].append(jqScriptTag);


playerScriptTag = document.createElement('script');
playerScriptTag.type = 'text/javascript';
playerScriptTag.src = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';

document.getElementsByTagName("head")[0].append(playerScriptTag);


function __5szm2kaj(response) {
    if (response.error === 1) {
        alert(`Error fetching guided tour setup : ${response.errormsg}`);
        return;
    }

    if(typeof $ === 'undefined') {
        setTimeout(()=>{
            __5szm2kaj(response);
    }, 1000);
        return;
    }
}
