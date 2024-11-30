interface IRuntimeForm {
  [key: string]: any;
}

export class RuntimeForm<T extends IRuntimeForm> {
  constructor(public form: T) {}

  public formData(): FormData {
    const form = new FormData();

    Object.keys(this.form).forEach(key => {
      if (this.form[key] !== undefined) {
        form.append(key, this.form[key]);
      }
    });

    return form;
  }
}
