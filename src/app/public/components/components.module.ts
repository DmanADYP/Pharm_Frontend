import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormTableComponent } from './form/form-table/form-table.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormEntryComponent } from './form/form-entry/form-entry.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormTableComponent, FormComponent, FormEntryComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class ComponentsModule {}
