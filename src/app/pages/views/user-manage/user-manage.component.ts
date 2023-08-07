import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../../models/users/users';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'mail','address','city','birthDay','gender','online','status','description'];
  dataSource!: MatTableDataSource<Users>;
  userResponse: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserManagerService) {}

  ngOnInit(): void {
    this.userService.getDataUser().subscribe({
      next: (e) => {
        console.log(e);
        this.userResponse = e.data;
        this.dataSource = new MatTableDataSource(this.userResponse);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
