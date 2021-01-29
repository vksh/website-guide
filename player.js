jqScriptTag = document.createElement("script");
jqScriptTag.type = "text/javascript";
jqScriptTag.src =
  "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

document.getElementsByTagName("head")[0].append(jqScriptTag);

playerScriptTag = document.createElement("script");
playerScriptTag.type = "text/javascript";
playerScriptTag.src =
  "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867";

document.getElementsByTagName("head")[0].append(playerScriptTag);

var prevStepId;
function __5szm2kaj(response) {
  if (response.error === 1) {
    alert(`Error fetching guided tour setup : ${response.errormsg}`);
    return;
  }

  if (typeof $ === "undefined") {
    setTimeout(() => {
      __5szm2kaj(response);
    }, 1000);
    return;
  }
  addStyle(response.data.css);

  let currentToolTip = response.data.structure.steps[0];
  showTooltipGuide(null, response.data, currentToolTip);
}

function addStyle(css) {
  let styleElement = $(`<style>${css}</style>`, {
    type: "text/css",
  });
  let headElement = $("head");
  headElement.append(styleElement);
}

function getToolTipElement(tiplates) {
  let container = $("<div>", {
    class: "sttip",
  });
  container.css({
    position: "absolute",
    display: "inline",
  });
  let parentElement = $("<div>", {
    class: "tooltip",
  });
  parentElement.css({
    position: "absolute",
    display: "flex",
    "align-items": "center",
  });
  let tooltipHtml = $.parseHTML(tiplates.tip);

  parentElement.append(tooltipHtml);
  container.append(parentElement);

  return container;
}

function getStepData(steps, stepId) {
  return steps.find((step) => step.id === stepId);
}

function handleEvents(currentIndex, currentToolTip, tooltipData) {
  $(".next-btn").click(() => {
    prevStepId = currentIndex.id;
    showTooltipGuide(
      currentToolTip,
      tooltipData,
      getStepData(tooltipData.structure.steps, currentIndex.followers[0].next)
    );
  });

  $("button[data-iridize-role='prevBt']").click(() => {
    showTooltipGuide(
      currentToolTip,
      tooltipData,
      getStepData(tooltipData.structure.steps, prevStepId)
    );
  });

  $("button[data-iridize-role='closeBt']").click(() => {
    currentToolTip.remove();
  });

  $("button[data-iridize-role='laterBt']").click(() => {
    currentToolTip.remove();
  });
}

function modifyElementCss() {
  $("div[aria-label='Steps']").css({
    "background-color": "rgb(249 230 230)",
    padding: "15px",
    "box-shadow":
      "rgba(0, 0, 0, 0.2) 0px 20px 20px 14px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px",
    "min-width": "350px",
  });

  $("button[data-iridize-role='prevBt']").css({
      "max-width": "85px",
      "margin-right": "10px"
  });

  $("button[aria-label='Close']").css({
    position: "absolute",
    top: "5px",
    right: "15px",
    "font-size": "20px",
    background: "nherit",
    color: "red",
    "font-weight": "bold",
    border: "none",
  });

  $("div.popover-content").css({
    background: "inherit",
  });
}

function showTooltipGuide(previousIndex, tooltipData, currentIndex) {
  if (!currentIndex || currentIndex.id === "eol0") return;
  if (previousIndex) previousIndex.remove();

  let currentToolTip = getToolTipElement(tooltipData.tiplates);

  $(currentIndex.action.selector).after(currentToolTip);

  $("div.showDiv").after(currentToolTip);

  $("div.tooltip").addClass(currentIndex.action.classes);
  if (currentIndex.action.placement) {
    $("div.tooltip").addClass("in");
    $("div.tooltip").addClass(currentIndex.action.placement);
  }

  const content = $.parseHTML(currentIndex.action.contents["#content"]);

  $("div.popover-title").prepend("Web app guide");

  $("div[data-iridize-id='content']").append(content);

  modifyElementCss();

  $("span[data-iridize-role='stepsCount']").text(
    tooltipData.structure.steps.length
  );
  $("span[data-iridize-role='stepCount']").text(
    currentIndex.action.stepOrdinal
  );

  if (currentIndex.action.roleTexts && currentIndex.action.roleTexts.nextBt) {
    $(".next-btn").text(currentIndex.action.roleTexts.nextBt);
  }

  handleEvents(currentIndex, currentToolTip, tooltipData);
}
