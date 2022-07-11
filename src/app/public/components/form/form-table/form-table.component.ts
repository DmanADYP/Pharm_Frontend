import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, Subscription } from 'rxjs';
import { HttpService } from 'src/app/public/services/http.service';
import { Config } from 'src/app/shared/models/config.model';
import { FormEntryComponent } from '../form-entry/form-entry.component';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css'],
})
export class FormTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'deprecated',
    'details',
    'deprecate',
    'delete',
  ];
  public dataSource: Config[] = [];
  subs: Subscription[] = [];
  constructor(private dialog: MatDialog, private httpService: HttpService) {}

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.getTableData();
  }

  private getTableData() {
    this.subs.push(
      this.httpService
        .getAllConfigs()
        .subscribe((data) => (this.dataSource = data))
    );
  }

  public delete(id: string): void {
    this.subs.push(
      this.httpService
        .deleteConfig(id)
        .pipe(concatMap(() => this.httpService.getAllConfigs()))
        .subscribe((data) => (this.dataSource = data))
    );
  }
  public deprecate(id: string): void {
    this.subs.push(
      this.httpService
        .deprecateConfig(id)
        .pipe(concatMap(() => this.httpService.getAllConfigs()))
        .subscribe((data) => (this.dataSource = data))
    );
  }

  details(id?: string): void {
    const dialogRef = this.dialog.open(FormEntryComponent, {
      width: '60vw',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(() => this.getTableData());
  }
}
