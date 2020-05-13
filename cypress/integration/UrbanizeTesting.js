/// <reference types="Cypress" />
/*global cy */

describe("Testing App Functions", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  describe("Testing Random Words", function () {
    it("Ensures Working Random Word Searches", function () {
      cy.get(".MuiButton-outlinedPrimary > .MuiButton-label").click();
      cy.get(".MuiInputBase-input").should("not.have.value", "");
    });
  });

  describe("Testing Clear Search", function () {
    it("Ensures Working Clear Search", function () {
      cy.get(".MuiInputBase-input").type("simp").should("have.value", "simp");
      cy.get(".MuiButton-outlinedSecondary > .MuiButton-label").click();
      cy.get(".MuiInputBase-input").should("have.value", "");
    });
  });

  describe("Testing Add And Remove", function () {
    it("Ensures Working Add and Remove Function", function () {
      cy.get(".MuiInputBase-input").type("fart").should("have.value", "fart");
      cy.get(
        ":nth-child(1) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root"
      ).click();
      cy.get(
        "#panel1a-header > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root"
      ).click();
      cy.get(".MuiExpansionPanelDetails-root")
        .should("exist")
        .should("be.visible");
      cy.get(
        ".MuiExpansionPanelDetails-root > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path"
      ).click();
      cy.get(".MuiExpansionPanelDetails-root").should("not.exist");
    });
  });
});
