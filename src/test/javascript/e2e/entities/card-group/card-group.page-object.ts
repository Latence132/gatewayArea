import { element, by, ElementFinder } from 'protractor';

export class CardGroupComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-card-group div table .btn-danger'));
  title = element.all(by.css('jhi-card-group div h2#page-heading span')).first();
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

export class CardGroupUpdatePage {
  pageTitle = element(by.id('jhi-card-group-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  cardSelect = element(by.id('field_card'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async cardSelectLastOption(): Promise<void> {
    await this.cardSelect.all(by.tagName('option')).last().click();
  }

  async cardSelectOption(option: string): Promise<void> {
    await this.cardSelect.sendKeys(option);
  }

  getCardSelect(): ElementFinder {
    return this.cardSelect;
  }

  async getCardSelectedOption(): Promise<string> {
    return await this.cardSelect.element(by.css('option:checked')).getText();
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

export class CardGroupDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cardGroup-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cardGroup'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
