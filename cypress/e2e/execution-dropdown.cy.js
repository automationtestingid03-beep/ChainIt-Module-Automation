import HomePage from '../pages/HomePage';
import ExecutionDropdownPage from '../pages/ExecutionDropdownPage';

describe('ChainIT execution dropdown navigation', () => {
  beforeEach(() => {
    cy.visitHome();
    ExecutionDropdownPage.openExecutionDropdown();
    ExecutionDropdownPage.verifyExecutionDropdownVisible();
  });

  it('opens Pactvera page', () => {
    ExecutionDropdownPage.clickExecutionItem('pactvera');
    ExecutionDropdownPage.verifyExecutionNavigation('pactvera');
  });

  it('opens BRE page', () => {
    ExecutionDropdownPage.clickExecutionItem('bre');
    ExecutionDropdownPage.verifyExecutionNavigation('bre');
  });

  it('opens ChainIT Pay page', () => {
    ExecutionDropdownPage.clickExecutionItem('chainitPay');
    ExecutionDropdownPage.verifyExecutionNavigation('chainitPay');
  });

  it('opens ChainIT KYB page', () => {
    ExecutionDropdownPage.clickExecutionItem('chainitKyb');
    ExecutionDropdownPage.verifyExecutionNavigation('chainitKyb');
  });

  it('opens ChainIT KYC page', () => {
    ExecutionDropdownPage.clickExecutionItem('chainitKyc');
    ExecutionDropdownPage.verifyExecutionNavigation('chainitKyc');
  });

  it.only('opens ChainIT X page', () => {
    ExecutionDropdownPage.clickExecutionItem('chainitX');
    ExecutionDropdownPage.verifyExecutionNavigation('chainitX');
  });
});
