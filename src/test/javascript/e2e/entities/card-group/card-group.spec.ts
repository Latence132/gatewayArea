import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/page-objects';

import { CardGroupComponentsPage, CardGroupDeleteDialog, CardGroupUpdatePage } from './card-group.page-object';

const expect = chai.expect;

describe('CardGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cardGroupComponentsPage: CardGroupComponentsPage;
  let cardGroupUpdatePage: CardGroupUpdatePage;
  let cardGroupDeleteDialog: CardGroupDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CardGroups', async () => {
    await navBarPage.goToEntity('card-group');
    cardGroupComponentsPage = new CardGroupComponentsPage();
    await browser.wait(ec.visibilityOf(cardGroupComponentsPage.title), 5000);
    expect(await cardGroupComponentsPage.getTitle()).to.eq('gatewayApp.cardGroup.home.title');
    await browser.wait(ec.or(ec.visibilityOf(cardGroupComponentsPage.entities), ec.visibilityOf(cardGroupComponentsPage.noResult)), 1000);
  });

  it('should load create CardGroup page', async () => {
    await cardGroupComponentsPage.clickOnCreateButton();
    cardGroupUpdatePage = new CardGroupUpdatePage();
    expect(await cardGroupUpdatePage.getPageTitle()).to.eq('gatewayApp.cardGroup.home.createOrEditLabel');
    await cardGroupUpdatePage.cancel();
  });

  it('should create and save CardGroups', async () => {
    const nbButtonsBeforeCreate = await cardGroupComponentsPage.countDeleteButtons();

    await cardGroupComponentsPage.clickOnCreateButton();

    await promise.all([
      cardGroupUpdatePage.setNameInput('name'),
      // cardGroupUpdatePage.cardSelectLastOption(),
    ]);

    expect(await cardGroupUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await cardGroupUpdatePage.save();
    expect(await cardGroupUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cardGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CardGroup', async () => {
    const nbButtonsBeforeDelete = await cardGroupComponentsPage.countDeleteButtons();
    await cardGroupComponentsPage.clickOnLastDeleteButton();

    cardGroupDeleteDialog = new CardGroupDeleteDialog();
    expect(await cardGroupDeleteDialog.getDialogTitle()).to.eq('gatewayApp.cardGroup.delete.question');
    await cardGroupDeleteDialog.clickOnConfirmButton();

    expect(await cardGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
