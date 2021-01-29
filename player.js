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
    addStyle(response.data.css);

    let currentToolTip = response.data.structure.steps[0];
    showTooltipGuide(null, response.data, currentToolTip);
}

function addStyle(css){
    let styleElement = $(`<style>${css}</style>`,{
        type: 'text/css'
    });
    let headElement =  $('head');
    headElement.append(styleElement);
}

function getToolTipElement(tiplates) {
    let container = $('<div>', {
        class: "sttip",
    });
    container.css({
        "position": "absolute",
        "display": "inline"
    });
    let parentElement = $('<div>', {
        class: "tooltip"
    });
    parentElement.css({
        "position": "absolute",
        "display": "flex",
        "align-items": "center"
    });
    let tooltipHtml = $.parseHTML(tiplates.tip);

    parentElement.append(tooltipHtml);
    container.append(parentElement);

    return container;
}

function showTooltipGuide(previousIndex, tooltipData, currentIndex){
    if(!currentIndex || currentIndex.id==="eol0") return;
    if(previousIndex) previousIndex.remove();


    let currentToolTip = getToolTipElement(tooltipData.tiplates);

    $(currentIndex.action.selector).after(currentToolTip);
    $('div.showDiv').after(currentToolTip)

    $("div.tooltip").addClass(currentIndex.action.classes);
    if(currentIndex.action.placement){
        $("div.tooltip").addClass("in");
        $("div.tooltip").addClass(currentIndex.action.placement);
    }

    const content = $.parseHTML(currentIndex.action.contents['#content']);

    $("div.popover-title").prepend("Web app guide");
    

    $("div[data-iridize-id='content']").append(content);
    $("span[data-iridize-role='stepsCount']").text(tooltipData.structure.steps.length);
    $("span[data-iridize-role='stepCount']").text(currentIndex.action.stepOrdinal);
   
}
