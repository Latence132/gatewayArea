import { element, by, ElementFinder } from 'protractor';

export class GameComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('game div table .btn-danger'));
  title = element.all(by.css('game div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class GameUpdatePage {
  pageTitle = element(by.id('game-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  stateSelect = element(by.id('field_state'));

  cardGroupSelect = element(by.id('field_cardGroup'));
  playerSelect = element(by.id('field_player'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStateSelect(state: string): Promise<void> {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect(): Promise<string> {
    return await this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption(): Promise<void> {
    await this.stateSelect.all(by.tagName('option')).last().click();
  }

  async cardGroupSelectLastOption(): Promise<void> {
    await this.cardGroupSelect.all(by.tagName('option')).last().click();
  }

  async cardGroupSelectOption(option: string): Promise<void> {
    await this.cardGroupSelect.sendKeys(option);
  }

  getCardGroupSelect(): ElementFinder {
    return this.cardGroupSelect;
  }

  async getCardGroupSelectedOption(): Promise<string> {
    return await this.cardGroupSelect.element(by.css('option:checked')).getText();
  }

  async playerSelectLastOption(): Promise<void> {
    await this.playerSelect.all(by.tagName('option')).last().click();
  }

  async playerSelectOption(option: string): Promise<void> {
    await this.playerSelect.sendKeys(option);
  }

  getPlayerSelect(): ElementFinder {
    return this.playerSelect;
  }

  async getPlayerSelectedOption(): Promise<string> {
    return await this.playerSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class GameDeleteDialog {
  private dialogTitle = element(by.id('delete-game-heading'));
  private confirmButton = element(by.id('confirm-delete-game'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
