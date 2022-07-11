import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpService } from 'src/app/public/services/http.service';
import { Config } from 'src/app/shared/models/config.model';
import { Properties } from 'src/app/shared/models/properties.model';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.css'],
})
export class FormEntryComponent implements OnInit {
  propertiesArray: Properties[] = [];
  subs: Subscription[] = [];
  configForm = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(''),
    deprecated: new FormControl(false),
  });

  constructor(
    public dialogRef: MatDialogRef<FormEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    debugger;
    if (!this.data.id) return;
    this.httpService.getConfig(this.data.id).subscribe((data: any) => {
      const { name, deprecated, value } = data[0];

      this.configForm.patchValue({
        name,
        deprecated,
        value,
      });

      this.propertiesArray = data[0].properties;
    });
  }

  addProperty(event: any) {
    event.preventDefault();
    const prop: Properties = {
      id: '',
      name: '',
      values: '',
      deprecated: false,
    };
    this.propertiesArray.push(prop);
  }

  updateProps(event: any, id: number, prop: string) {
    switch (prop) {
      case 'name':
        this.propertiesArray[id]['name'] = event.target.value;
        break;
      case 'value':
        this.propertiesArray[id]['values'] = event.target.value;
        break;

      default:
        break;
    }
  }

  removeProp(id: number) {
    this.propertiesArray.splice(id, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close();

    const config: Config = {
      id: this.data.id,
      name: this.configForm.controls.name.value || '',
      value: this.configForm.controls.value.value || '',
      deprecated: this.configForm.controls.deprecated.value || true,
      properties: this.propertiesArray || null,
    };
    if (!this.data.id) {
      this.httpService.createConfig(config).subscribe();
      debugger;
      return;
    }

    this.httpService.updateConfig(config).subscribe();
  }
}
