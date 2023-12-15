import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  displayedColumns: string[] = ['avatar', 'name', 'email', 'role'];
  users: User[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 5;
  searchValue: string = '';
  constructor(private _user: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.paginateRows();
  }

  paginateRows(): void {
    this.dataSource.paginator = this.paginator;
  }

  getUsers(): void {
    this._user.getUsers().subscribe((response) => {
      this.users = response;
      this.dataSource.data = this.users;
      this.paginateRows();
      this.table.renderRows();
    });
  }

  searchByName(): void {
    const value = this.searchValue.toLocaleLowerCase();
    const EMPTY = 0;
    if (value.length === EMPTY) this.getUsers();
    else {
      this.dataSource.data = this.users.filter((user) =>
        user.name.toLocaleLowerCase().includes(value)
      );
      this.paginateRows();
      this.table.renderRows();
    }
  }
}
