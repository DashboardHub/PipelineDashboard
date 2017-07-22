import { PipelinedashboardPage } from './app.po';

describe('pipelinedashboard App', () => {
  let page: PipelinedashboardPage;

  beforeEach(() => {
    page = new PipelinedashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
