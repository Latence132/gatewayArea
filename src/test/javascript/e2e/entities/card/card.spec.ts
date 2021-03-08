import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CardComponentsPage, CardDeleteDialog, CardUpdatePage } from './card.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Card e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cardComponentsPage: CardComponentsPage;
  let cardUpdatePage: CardUpdatePage;
  let cardDeleteDialog: CardDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cards', async () => {
    await navBarPage.goToEntity('card');
    cardComponentsPage = new CardComponentsPage();
    await browser.wait(ec.visibilityOf(cardComponentsPage.title), 5000);
    expect(await cardComponentsPage.getTitle()).to.eq('gatewayApp.card.home.title');
    await browser.wait(ec.or(ec.visibilityOf(cardComponentsPage.entities), ec.visibilityOf(cardComponentsPage.noResult)), 1000);
  });

  it('should load create Card page', async () => {
    await cardComponentsPage.clickOnCreateButton();
    cardUpdatePage = new CardUpdatePage();
    expect(await cardUpdatePage.getPageTitle()).to.eq('gatewayApp.card.home.createOrEditLabel');
    await cardUpdatePage.cancel();
  });

  it('should create and save Cards', async () => {
    const nbButtonsBeforeCreate = await cardComponentsPage.countDeleteButtons();

    await cardComponentsPage.clickOnCreateButton();

    await promise.all([
      cardUpdatePage.setValueInput('value'),
      cardUpdatePage.setSymbolInput('symbol'),
      cardUpdatePage.setImageFrontInput(absolutePath),
    ]);

    expect(await cardUpdatePage.getValueInput()).to.eq('value', 'Expected Value value to be equals to value');
    expect(await cardUpdatePage.getSymbolInput()).to.eq('symbol', 'Expected Symbol value to be equals to symbol');
    expect(await cardUpdatePage.getImageFrontInput()).to.endsWith(
      fileNameToUpload,
      'Expected ImageFront value to be end with ' + fileNameToUpload
    );

    await cardUpdatePage.save();
    expect(await cardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Card', async () => {
    const nbButtonsBeforeDelete = await cardComponentsPage.countDeleteButtons();
    await cardComponentsPage.clickOnLastDeleteButton();

    cardDeleteDialog = new CardDeleteDialog();
    expect(await cardDeleteDialog.getDialogTitle()).to.eq('gatewayApp.card.delete.question');
    await cardDeleteDialog.clickOnConfirmButton();

    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
