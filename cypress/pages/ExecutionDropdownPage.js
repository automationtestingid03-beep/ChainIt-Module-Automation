import DropdownPage from './DropdownPage';

class ExecutionDropdownPage {
  constructor() {
    this.menuTrigger = 'a[data-dropdown="execution"]';
    this.activeDropdown = 'div.dropdownSection.active[data-dropdown="execution"]';

    this.executionItems = {
      pactvera: {
        label: 'Pactvera',
        url: 'https://pactvera.com/',
        text: 'Pactvera',
      },
      bre: {
        label: 'BRE',
        url: '/product/business-rules-engine/',
        text: 'Business Rules Engine',
      },
      chainitPay: {
        label: 'ChainIT Pay',
        url: 'https://chainitpay.com/',
        text: 'Money moves only when verified parties meet signed terms.',
      },
      chainitKyb: {
        label: 'ChainIT KYB',
        url: '/product/kyb-solution/',
        text: 'ChainIT KYB: Know Your Business',
      },
      chainitKyc: {
        label: 'ChainIT KYC',
        url: '/product/kyc-aml-compliance/',
        text: 'ChainIT KYC: KYC AML Compliance',
      },
      chainitX: {
        label: 'ChainIT X',
        url: '/product/chainit-x/',
        text: 'ChainIT X',
      },
    };
  }

  openExecutionDropdown() {
    DropdownPage.open(this.menuTrigger, this.activeDropdown);
    return this;
  }

  verifyExecutionDropdownVisible() {
    DropdownPage.verifyDropdownVisible(this.activeDropdown, this.executionItems.pactvera.label);
    return this;
  }

  clickExecutionItem(itemKey) {
    const item = this.executionItems[itemKey];
    DropdownPage.clickDropdownItem(this.activeDropdown, item.label);
    return this;
  }

  verifyExecutionNavigation(itemKey) {
    const item = this.executionItems[itemKey];
    DropdownPage.verifyNavigation(item.url, item.text, 'main, body');
    return this;
  }

  get itemKeys() {
    return Object.keys(this.executionItems);
  }
}

export default new ExecutionDropdownPage();
