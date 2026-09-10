import BasePage from "../../BasePage"; 

class ProductPage extends BasePage {
  get productsTab() {
    return cy.contains('button', 'Products').filter(':visible').first();
  }

  get productPageHeading() {
    return cy.contains('Products').filter(':visible').first();
  }

  get searchInput() {
    return cy.get('input[placeholder="Search"]').filter(':visible').first();
  }

  get createProductButton() {
    return cy.contains('button', 'Create Product').filter(':visible').first();
  }

  get productTable() {
    return cy.get('table').filter(':visible').first();
  }

  get productTableHeaders() {
    return this.productTable.find('thead th');
  }

  get productTableRows() {
    return this.productTable.find('tbody tr').filter(':visible');
  }

  getProductCount() {
     return this.productTableRows.then(($rows) => {return $rows.length;
  });
 }

 getProductNames() {
  return this.productTableRows.then(($rows) => {
  const productNames = [];
  $rows.each((index, row) => {
  const name = Cypress.$(row).find('td').first().text().replace(/\s+/g, ' ').trim();
    if (name) { 
        productNames.push(name);
      }
    });

    return productNames;
  });
}


   clickProductsTab() {
    cy.log('Action: Click Products tab');
    this.productsTab.should('exist').and('be.visible').click({ force: true });
    cy.url().should('include', 'tab=products');
    cy.log('Products tab clicked successfully');
    cy.log('Navigated to Products page');
    return this;
  }

  captureProductCountBeforeCreation() {
  cy.log('Action: Capture product count before creating a new product');
  this.getProductCount().then((count) => {
  expect(count, 'Product count before creation').to.be.greaterThan(0);
  cy.wrap(count).as('productCountBefore');
  cy.log(`Product count before creation: ${count}`);
  });

  return this;
  } 

  captureProductNamesBeforeCreation() {
  cy.log('Action: Capture all existing product names before creation');
  this.getProductNames().then((productNames) => { expect(productNames, 'Existing product names').to.not.be.empty;
  cy.wrap(productNames).as('productNamesBefore');
  cy.log(`Products before creation: ${productNames.join(', ')}`);
  });

  return this;
  } 

   verifyProductsPageLoaded() {
    cy.log('Action: Verify Products page is loaded');
    cy.url().should('include', 'tab=products');
    this.productPageHeading.should('exist').and('be.visible');
    cy.log('VERIFIED: Products page is loaded');
    return this;
  }

  findNewProductAfterCreation() {
  cy.log('Action: Find newly created product after creation');
  this.getProductNames().then((afterNames) => {
  cy.get('@productNamesBefore').then((beforeNames) => {
  const newProducts = afterNames.filter((name) => !beforeNames.includes(name));
  expect(newProducts,'New product created').to.have.length(1);
  const newProductName = newProducts[0];
  cy.wrap(newProductName).as('newProductName');
  cy.log(`New product found: ${newProductName}`);
  cy.contains('tbody tr', newProductName).filter(':visible').should('exist');
  cy.log(`VERIFIED: New product "${newProductName}" is displayed successfully`);
    });
  });

  return this;
}


  // Search
  verifySearchField() {
    cy.log('Action: Verify Product search field');
    this.searchInput.should('exist').and('be.visible');
    cy.log('VERIFIED: Product search field');
    return this;
  }

  searchProduct(productName) {
    cy.log(`Action: Search Product: ${productName}`);
    this.searchInput.should('exist').and('be.visible').clear().type(productName);
    cy.log(`Product search completed: ${productName}`);
    return this;
  }

  clearSearch() {
    cy.log('Action: Clear Product search');
    this.searchInput.should('exist').clear();
    cy.log('Product search cleared');
    return this;
  }

  // Create Product
  verifyCreateProductButton() {
    cy.log('Action: Verify Create Product button');
    this.createProductButton.should('exist').and('be.visible');
    cy.log('VERIFIED: Create Product button');
    return this;
  }

  clickCreateProduct() {
    cy.log('Action: Click Create Product');
    this.createProductButton.should('exist').and('be.visible').click({ force: true });
    cy.log('Create Product button clicked');
    return this;
  }

  // Product Table
  verifyProductTable() {
    cy.log('Action: Verify Product table');
    this.productTable.should('exist').and('be.visible');
    cy.log('VERIFIED: Product table');
    return this;
  }

  verifyProductTableColumns() {
    cy.log('Action: Verify Product table columns');
    const columns = ['Name','Created By','Created At','Actions'];
    columns.forEach((columnName) => {
    this.productTableHeaders.contains(columnName).should('exist');
    cy.log(`Verified column: ${columnName}`);
    });
    cy.log('VERIFIED: All Product table columns');
    return this;
  }

  verifyProductRecords() {
    cy.log('Action: Verify Product records');
    this.productTableRows.should('have.length.at.least', 1);
    cy.log('VERIFIED: Product records are displayed');
    return this;
  }

  // Get First Product
  getFirstProductName() {
    cy.log('Action: Get first Product name');
    this.productTableRows.first().find('td').first()
      .invoke('text')
      .then((text) => {
    const productName = text.replace(/\s+/g, ' ').trim();
    expect(productName,'First Product name').to.not.be.empty;
    cy.wrap(productName).as('firstProductName');
    cy.log(`First Product: ${productName}`);
      });
    return this;
  }

  // Pagination
  verifyPaginationInformation() {
    cy.log('Action: Verify Product pagination information');
    cy.get('body').invoke('text').then((text) => {
    const pageText = text.replace(/\s+/g, ' ').trim();
    expect(pageText,'Product pagination information').to.match(/Showing\s+\d+\s+to\s+\d+\s+of\s+\d+\s+results/i);
    });
    cy.log('VERIFIED: Product pagination information');
    return this;
  }

 
  // Complete Page Validation
  verifyAllProductPageElements() {
    cy.log('Action: Verify all Product page elements');
    this.verifyProductsPageLoaded();
    this.verifySearchField();
    this.verifyCreateProductButton();
    this.verifyProductTable();
    this.verifyProductTableColumns();
    this.verifyProductRecords();
    cy.log('VERIFIED: All Product page elements');

    return this;
  }

  waitForProductCreation() {
  cy.log('Action: Wait for Product VDT creation to complete');
  cy.contains('Product VDT Creation', { timeout: 120000 }).filter(':visible').should('be.visible');
  cy.log('Product VDT Creation popup displayed');

  cy.contains(/Waiting for product minting|Product was created/i, {timeout: 120000}).filter(':visible').should('be.visible');
  cy.log('Product creation and minting process completed');

  return this;
}

captureProductCountAfterCreation() {
  cy.log('Action: Capture product count after product creation');
  cy.get('@productCountBefore').then((beforeCount) => {
  this.getProductCount().then((afterCount) => {
  cy.wrap(afterCount).as('productCountAfter');
  cy.log(`Product count before creation: ${beforeCount}`);
  cy.log(`Product count after creation: ${afterCount}`);
  expect(afterCount,'Product count should increase by one').to.equal(beforeCount + 1);});
  });

  return this;
}


}
export default new ProductPage();