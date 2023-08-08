import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../../models/users/users';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../common/dialog/user-form/user-form.component';
import Swal from 'sweetalert2';
import { FullUserInfo, UserInfo } from 'src/app/common/models/data-config';

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
  displayedColumns2: string[] = ['firstName', 'lastName', 'phone', 'mail','address','city','birthDay','gender','online','status','id'];
  dataUserDeleted!: MatTableDataSource<Users>;
  userDeletedResponse: any;
  @ViewChild('paginatorRecover') paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

  public user!: Users;

  public listUserDelete:Users[] = [];

  public userDelete!: Users;
  public userRecover!: Users;

  public userLogin! : FullUserInfo;

  constructor(private userService: UserManagerService, private dialog: MatDialog) {this.userLogin = JSON.parse(sessionStorage.getItem("profile")!)}

  ngOnInit(): void {
    this.loadData();
  }
  applyFilter(event: Event,table: number) {
    if(table == 0){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }else{
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataUserDeleted.filter = filterValue.trim().toLowerCase();

      if (this.dataUserDeleted.paginator) {
        this.dataUserDeleted.paginator.firstPage();
      }
    }
  }
  public updateUser(i:any):void{
    console.log(this.userResponse[i]);
  }

  openDialog(i:any): void {
    console.log(JSON.parse(sessionStorage.getItem("profile")!))
    this.user = i;
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
    this.userDelete = i;
    if(this.userLogin.mail === this.userDelete.mail){
      Swal.fire("You cant delete yourself",'','info');
    }
    else{
      let sec = this.userDelete.lastLoginDate;
      this.userDelete.lastLoginDate = new Date(sec).toISOString().slice(0, 19).replace('T', ' ');
      this.userService.softDelete(this.userDelete).subscribe({
          next: ()=>{
            this.loadData();
          }
      })
    }
  }

  recover(i:any,type:string):void{
    if(typeof i === 'string' && type === 'true'){
      this.listUserDelete = this.userDeletedResponse;
      this.listUserDelete.forEach((e) => {
        this.userRecover = e;
        let sec = this.userRecover.lastLoginDate;
        this.userRecover.lastLoginDate = new Date(sec).toISOString().slice(0, 19).replace('T', ' ');
        this.userService.recoverUser(this.userRecover).subscribe({
          next: ()=>{
            this.loadData();
          }
        })
      });
    }
    else{
      this.userRecover = i;
      let sec = this.userRecover.lastLoginDate;
      this.userRecover.lastLoginDate = new Date(sec).toISOString().slice(0, 19).replace('T', ' ');
      this.userService.recoverUser(this.userRecover).subscribe({
        next: ()=>{
          this.loadData();
        }
    })
    }
  }

  // deleteAllUser():void{
  //   this.userDeletedResponse.array.forEach((e:any) => {
  //     this.userService.
  //   });
  // }

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
    this.userService.getUsersDeleted().subscribe({
      next: (e) => {
        console.log(e);
        this.userDeletedResponse = e.data;
        this.dataUserDeleted = new MatTableDataSource(this.userDeletedResponse);

        this.dataUserDeleted.paginator = this.paginator2;
        this.dataUserDeleted.sort = this.sort2;
      },
    });
  }
}


