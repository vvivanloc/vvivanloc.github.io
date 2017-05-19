'use strict';

// @_flow

function renderJSX() {

    // render containing components first !

    // flip card
    var lElements = document.getElementsByTagName('flipcardfront');
    var lFlipcardFrontBuilder = FlipcardFront(lElements);
    lFlipcardFrontBuilder.render();

    lElements = document.getElementsByTagName('flipcardback');
    var lFlipcardBackBuilder = FlipcardBack(lElements);
    lFlipcardBackBuilder.render();

    // animated tool tip
    lElements = document.getElementsByTagName('animatedtooltip');
    var lAnimatedTooltipBuilder = AnimatedTooltip(lElements);
    lAnimatedTooltipBuilder.render();

    // carousel
    lElements = document.getElementsByTagName('carousel');
    var lCarouselBuilder = Carousel(lElements);
    lCarouselBuilder.render();

    // job info bar
    lElements = document.getElementsByTagName('jobinfobar');
    var lJobInfoBarBuilder = JobInfoBar(lElements);
    lJobInfoBarBuilder.render();

    // image panels
    var lConfig = {
        imgpath: "img/portfolio/clients",
        tooltip: false
    };

    lElements = document.getElementsByTagName('sponsorpanel');
    var lSponsorPanel = SponsorPanel(lElements, lConfig);
    lSponsorPanel.render();

    lConfig = {
        imgpath: "img/portfolio/technologies",
        tooltip: true,
        height: 32,
        marginbottom: "5px",
        margintop: "10px",
        caption: true
    };

    lElements = document.getElementsByTagName('techpanel');
    var lTechPanel = SponsorPanel(lElements, lConfig);
    lTechPanel.render();

    // badges
    lElements = document.getElementsByTagName('rank');
    lConfig = {
        label: "<img src='../img/portfolio/badges/rank.png'></img>",
        tooltip_pre: "Poste"
    };
    var lRankBuilder = Badge(lElements, lConfig);
    lRankBuilder.render();

    lElements = document.getElementsByTagName('team');
    lConfig = {
        label: "<img src='../img/portfolio/badges/team.png'></img>",
        tooltip_pre: "Equipe de",
        tooltip_post: "personne"
    };

    var lTeamBuilder = Badge(lElements, lConfig);
    lTeamBuilder.render();

    lElements = document.getElementsByTagName('duration');
    lConfig = {
        label: "<img src='../img/portfolio/badges/clock.png'></img>",
        tooltip_pre: "Date: "
    };

    var lDateBuilder = Badge(lElements, lConfig);
    lDateBuilder.render();

    lElements = document.getElementsByTagName('result');
    lConfig = {
        label: "<img src='../img/portfolio/badges/medal.png'></img>",
        tooltip_pre: "Résultat"
    };
    var lResultBuilder = Badge(lElements, lConfig);
    lResultBuilder.render();
}
//# sourceMappingURL=jsxRenderer.js.map
