import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../../models/users/users';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../common/dialog/user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'mail','address','city','birthDay','gender','online','status','id'];
  dataSource!: MatTableDataSource<Users>;
  userResponse: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public user!: Users;

  public listUserDelete:Users[] = [];

  public userDelete!: Users;

  constructor(private userService: UserManagerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log("runOninit")
    this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public updateUser(i:any):void{
    console.log(this.userResponse[i]);
  }

  openDialog(i:any): void {
    this.user = this.userResponse[i];
    console.log(this.user)
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {userUpdate: this.user }
    });

    dialogRef.afterClosed().subscribe(dataUpdate => {
      this.user = dataUpdate;
      let sec = this.user.lastLoginDate;
      this.user.lastLoginDate = new Date(sec).toISOString().slice(0, 19).replace('T', ' ');
      console.log(this.user.lastLoginDate);
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.updateUser(this.user).subscribe({
           next: (res) =>{
              Swal.fire('Saved!', '', 'success')
           },
           error: (err) =>{
            Swal.fire('Changes are not saved', '', 'info')
           }
          });
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    });
  }

  deleteUser(i:any):void{
    this.userDelete = this.userResponse[i];
    let sec = this.userDelete.lastLoginDate;
    this.userDelete.lastLoginDate = new Date(sec).toISOString().slice(0, 19).replace('T', ' ');
    this.userService.softDelete(this.userDelete).subscribe({
        next: ()=>{
          this.loadData();
        }
    })
    // result.delFlg =1;
    // this.userService.updateUser(result);
    // this.listUserDelete.push(result);
    // console.log(this.listUserDelete)
    // this.loadData();
  }

  loadData():void{
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
}


