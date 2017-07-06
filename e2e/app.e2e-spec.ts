import { UConnectPage } from './app.po';

describe('uconnect App', function() {
  let page: UConnectPage;

  beforeEach(() => {
    page = new UConnectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
