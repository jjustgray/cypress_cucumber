const {
  Before,
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  homepage,
  inferenceCalculator,
  navigationMenu,
  pricing,
  products,
  resources,
  sales,
} = require("../../support/pages");

Before({ tags: "@known-issue" }, function () {
  this.skip();
});

Given("I am on the Telnyx homepage", () => {
  homepage.visit();
});

Given("I am browsing the product catalog", () => {
  products.visitCatalog();
});

Given("I am viewing Voice API details", () => {
  products.visitVoiceApi();
});

Given("I am viewing Telnyx pricing", () => {
  pricing.visit();
});

Given("I am viewing SIP Trunking pricing", () => {
  pricing.visitSipPricing();
});

Given("I am on the enterprise sales page", () => {
  sales.visit();
});

Given("I am viewing the resources hub", () => {
  resources.visit();
});

Given("I am viewing inference pricing", () => {
  inferenceCalculator.visit();
});

When("I open inference pricing from the homepage", () => {
  homepage.chooseInferencePricing();
});

When("I choose Sign up in the homepage hero", () => {
  homepage.chooseHeroSignup();
});

When("I go to the page footer", () => {
  homepage.goToFooter();
});

Then("the page footer is visible", () => {
  homepage.assertFooterVisible();
});

When("I browse the product categories", () => {
  products.browseCategories();
});

When("I choose Voice API", () => {
  products.chooseVoiceApi();
});

When("I open the pricing plans", () => {
  pricing.openPlans();
});

When("I choose enterprise sales from the plans", () => {
  pricing.chooseEnterpriseSalesFromPlans();
});

When("I choose Sign up from the plans", () => {
  pricing.chooseSignupFromPlans();
});

When("I choose SIP Trunking from the pricing catalog", () => {
  pricing.chooseSipTrunkingFromCatalog();
});

When("I open release notes from the resources hub", () => {
  resources.openReleaseNotes();
});

When("I open a recent release note", () => {
  resources.openRecentReleaseNote();
});

When("I open the navigation menu", () => {
  navigationMenu.open();
});

When("I close the navigation menu", () => {
  navigationMenu.close();
});

When("I choose Contact sales from navigation", () => {
  navigationMenu.chooseContactSales();
});

When("I note the current estimate", () => {
  inferenceCalculator.rememberCurrentEstimate();
});

When("I set input tokens to 2 billion", () => {
  inferenceCalculator.setInputTokensToTwoBillion();
});

When("I set input tokens to zero", () => {
  inferenceCalculator.setInputTokens("0");
});

When("I set input tokens to a negative amount", () => {
  inferenceCalculator.setInputTokens("-1");
});

When("I enter letters as input tokens", () => {
  inferenceCalculator.setInputTokens("abc");
});

When("I note the Default tier prices", () => {
  inferenceCalculator.rememberDefaultTierPrices();
});

When("I choose the Priority service tier", () => {
  inferenceCalculator.choosePriorityTier();
});

Then("I see the inference pricing page", () => {
  homepage.assertInferencePricingPage();
});

Then("the homepage hero is visible", () => {
  homepage.assertHeroVisible();
});

Then("I reach the sign-up page", () => {
  homepage.assertSignupPage();
});

Then("the footer has a visible LinkedIn link to Telnyx", () => {
  homepage.assertLinkedInFooterLink();
});

Then("the footer has a visible X link to Telnyx", () => {
  homepage.assertXFooterLink();
});

Then("the navigation menu is expanded", () => {
  navigationMenu.assertExpanded();
});

Then("the navigation menu is collapsed", () => {
  navigationMenu.assertCollapsed();
});

Then("the homepage title fits on the screen", () => {
  homepage.assertHeroFitsViewport();
});

Then("the navigation menu has a visible contact sales link", () => {
  navigationMenu.assertOffersContactSales();
});

Then("I see the Voice API overview", () => {
  products.assertVoiceApiOverview();
});

Then("the Voice API introduction fits on the screen", () => {
  products.assertIntroductionFitsViewport();
});

Then("the Voice API page highlights its scale", () => {
  products.assertScaleMetrics();
});

Then("I see visible Voice API contact and sign-up links", () => {
  products.assertOnboardingOptions();
});

Then("I can compare the available payment plans", () => {
  pricing.assertAvailablePlans();
});

Then("I see enterprise sales contact options", () => {
  sales.assertEnterpriseSalesHeading();
});

Then("I see SIP Trunking pricing", () => {
  pricing.assertSipPricingPage();
});

Then("I see pay-as-you-go rates", () => {
  pricing.assertPayAsYouGoRates();
});

Then("outbound calls start at $0.005 per minute", () => {
  pricing.assertOutboundRates();
});

Then("inbound calls start at $0.0032 per minute", () => {
  pricing.assertInboundRates();
});

Then("inbound channels cost $12 per month", () => {
  pricing.assertInboundChannelPricing();
});

Then("the sales team responds within one business day", () => {
  sales.assertResponseTime();
});

Then("I see a visible US sales phone link", () => {
  sales.assertUsSalesPhone();
});

Then("I see a visible international sales phone link", () => {
  sales.assertInternationalSalesPhone();
});

Then("the sales page offers at least 10 phone options", () => {
  sales.assertAtLeastTenPhoneOptions();
});

Then("I see release note filters", () => {
  resources.assertReleaseNoteFilters();
});

Then("I see a release note article", () => {
  resources.assertReleaseNoteArticle();
});

Then("the estimate is higher than before", () => {
  inferenceCalculator.assertEstimateHigherThanBefore();
});

Then("the input-token cost is zero and the estimate is valid", () => {
  inferenceCalculator.assertZeroInputTokenCost();
  inferenceCalculator.assertEstimateIsNonNegative();
});

Then("the calculator normalizes the input to one", () => {
  inferenceCalculator.assertInputTokensValue("1");
  inferenceCalculator.assertEstimateIsNonNegative();
});

Then("the calculator normalizes the input to zero", () => {
  inferenceCalculator.assertInputTokensValue("0");
  inferenceCalculator.assertEstimateIsNonNegative();
});

Then("the Priority tier is selected and its prices differ from Default", () => {
  inferenceCalculator.assertPriorityTierSelected();
  inferenceCalculator.assertPriorityTierPricesDifferFromDefault();
});

Then("the pricing page fits the screen without horizontal scrolling", () => {
  pricing.assertNoMobileHorizontalOverflow();
});
