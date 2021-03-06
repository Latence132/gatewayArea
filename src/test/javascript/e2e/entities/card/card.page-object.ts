import { element, by, ElementFinder } from 'protractor';

export class CardComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('card div table .btn-danger'));
  title = element.all(by.css('card div h2#page-heading span')).first();
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

export class CardUpdatePage {
  pageTitle = element(by.id('card-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  valueInput = element(by.id('field_value'));
  symbolInput = element(by.id('field_symbol'));
  imageFrontInput = element(by.id('file_imageFront'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setValueInput(value: string): Promise<void> {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput(): Promise<string> {
    return await this.valueInput.getAttribute('value');
  }

  async setSymbolInput(symbol: string): Promise<void> {
    await this.symbolInput.sendKeys(symbol);
  }

  async getSymbolInput(): Promise<string> {
    return await this.symbolInput.getAttribute('value');
  }

  async setImageFrontInput(imageFront: string): Promise<void> {
    await this.imageFrontInput.sendKeys(imageFront);
  }

  async getImageFrontInput(): Promise<string> {
    return await this.imageFrontInput.getAttribute('value');
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

export class CardDeleteDialog {
  private dialogTitle = element(by.id('delete-card-heading'));
  private confirmButton = element(by.id('confirm-delete-card'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
