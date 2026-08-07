import HomePage from '../pages/HomePage';
import DownloadPage from '../pages/DownloadPage';

describe('ChainIT homepage CTA navigation', () => {
  it('navigates to the download page and verifies its UI', () => {
    HomePage.visitHomePage();
    HomePage.handlePopupIfVisible();
    HomePage.clickExplorePlatformButton();

    DownloadPage.verifyUrl('https://chainit.com/download/');
    DownloadPage.verifyHeroText();
    DownloadPage.verifyLogoIsVisible();
    DownloadPage.verifyHeaderLinksAreVisible();
  });
});
