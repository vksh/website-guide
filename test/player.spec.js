const { module, test } = QUnit;

const tooltipElement =
  '<div role="region" tabindex="999" aria-label="Steps"><div data-iridize-role="title" class="popover-title"><button aria-label="Close" data-iridize-role="closeBt">&#10005;</button></div><div class="popover-content"><div data-iridize-id="content"></div></div><div class="stFooter" data-iridize-id="footer"><div><span class="steps-count">Step <span data-iridize-role="stepCount"></span>/<span data-iridize-role="stepsCount"></span></span><button tabindex="999" class="prev-btn default-later-btn" data-iridize-role="laterBt">Remind me later</button><span class="powered-by">Powered by </span></div><div data-iridize-role="nextBtPane"><button tabindex="999" class="prev-btn default-prev-btn" data-iridize-role="prevBt">Back</button><a tabindex="999" role="button" aria-label="Next" class="next-btn" data-iridize-role="nextBt" href="javascript:void(0);">Next</a></div></div></div>';

module("Website guide test", {
  afterEach: function () {
    $("div.sttip").remove();
  },
});

test("should add style tag and append css from response to it", function (assert) {
  __5szm2kaj({
    data: {
      css: "SOME RANDOM CSS",
      structure: {
        steps: [],
      },
    },
  });

  const styleTagAdded = !!$("head style")
    .toArray()
    .find((style) => {
      return style.innerText === "SOME RANDOM CSS";
    });

  assert.equal(styleTagAdded, true, "Style tag added successfully");
});

test("should render elements in tooltip ", function (assert) {
  __5szm2kaj({
    data: {
      css: "SOME RANDOM CSS",
      structure: {
        steps: [
          {
            action: {
              selector: "body",
              classes: "SOMECLASSTOADD",
              placement: "RIGHT",
              contents: {
                "#content": "<p>HEY THERRE I AM TOOLTIP</p>",
              },
              stepOrdinal: 1,
            },
            followers: [
              {
                next: 2,
              },
            ],
          },
        ],
      },
      tiplates: {
        tip: tooltipElement,
      },
    },
  });
  actual = $("div.sttip");

  const expectedHTML =
    '<div class="tooltip SOMECLASSTOADD in RIGHT" style="position: absolute; display: flex; align-items: center;"><div role="region" tabindex="999" aria-label="Steps" style="background-color: rgb(249, 230, 230); padding: 15px; box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 20px 14px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; min-width: 350px;"><div data-iridize-role="title" class="popover-title">Web app guide<button aria-label="Close" data-iridize-role="closeBt" style="position: absolute; top: 5px; right: 15px; font-size: 20px; color: red; font-weight: bold; border: none;">✕</button></div><div class="popover-content" style="background: inherit;"><div data-iridize-id="content"><p>HEY THERRE I AM TOOLTIP</p></div></div><div class="stFooter" data-iridize-id="footer"><div><span class="steps-count">Step <span data-iridize-role="stepCount">1</span>/<span data-iridize-role="stepsCount">1</span></span><button tabindex="999" class="prev-btn default-later-btn" data-iridize-role="laterBt">Remind me later</button><span class="powered-by">Powered by </span></div><div data-iridize-role="nextBtPane"><button tabindex="999" class="prev-btn default-prev-btn" data-iridize-role="prevBt" style="max-width: 85px; margin-right: 10px;">Back</button><a tabindex="999" role="button" aria-label="Next" class="next-btn" data-iridize-role="nextBt" href="javascript:void(0);">Next</a></div></div></div></div>';
  assert.equal(actual.html(), expectedHTML, "match rendered result");
});

test("Should render next", function (assert) {
  __5szm2kaj({
    data: {
      css: "SOME RANDOM CSS",
      structure: {
        steps: [
          {
            id: 1,
            action: {
              selector: "body",
              classes: "SOMECLASSTOADD",
              placement: "RIGHT",
              contents: {
                "#content": "<p>Hey there i am tooltip</p>",
              },
              stepOrdinal: 1,
            },
            followers: [
              {
                next: 2,
              },
            ],
          },
          {
            id: 2,
            action: {
              selector: "body",
              classes: "Next Element",
              placement: "TOP",
              contents: {
                "#content": "<p>This is step 2</p>",
              },
              stepOrdinal: 2,
            },
            followers: [
              {
                next: "eol0",
              },
            ],
          },
        ],
      },
      tiplates: {
        tip: tooltipElement,
      },
    },
  });
  $(".next-btn").click();

  actual = $("div.sttip");

  const expectedHTML =
    '<div class="tooltip Next Element in TOP" style="position: absolute; display: flex; align-items: center;"><div role="region" tabindex="999" aria-label="Steps" style="background-color: rgb(249, 230, 230); padding: 15px; box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 20px 14px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; min-width: 350px;"><div data-iridize-role="title" class="popover-title">Web app guide<button aria-label="Close" data-iridize-role="closeBt" style="position: absolute; top: 5px; right: 15px; font-size: 20px; color: red; font-weight: bold; border: none;">✕</button></div><div class="popover-content" style="background: inherit;"><div data-iridize-id="content"><p>This is step 2</p></div></div><div class="stFooter" data-iridize-id="footer"><div><span class="steps-count">Step <span data-iridize-role="stepCount">2</span>/<span data-iridize-role="stepsCount">2</span></span><button tabindex="999" class="prev-btn default-later-btn" data-iridize-role="laterBt">Remind me later</button><span class="powered-by">Powered by </span></div><div data-iridize-role="nextBtPane"><button tabindex="999" class="prev-btn default-prev-btn" data-iridize-role="prevBt" style="max-width: 85px; margin-right: 10px;">Back</button><a tabindex="999" role="button" aria-label="Next" class="next-btn" data-iridize-role="nextBt" href="javascript:void(0);">Next</a></div></div></div></div>';
  assert.equal(actual.html(), expectedHTML, "render next content");
});
