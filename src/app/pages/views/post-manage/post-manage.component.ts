import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../../models/post/post';
import { MatDialog } from '@angular/material/dialog';
import { PostManagerService } from '../../services/post-manager/post-manager.service';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.scss']
})
export class PostManageComponent implements OnInit{
  displayedColumns: string[] = ['delFlg', 'createDate', 'updateDate','content','accessModifierLevel','typePost','id'];
  dataSource!: MatTableDataSource<Post>;
  postLegalResponse: any;
  @ViewChild('paginatorLegal') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns2: string[] = ['delFlg', 'createDate', 'updateDate','content','accessModifierLevel','typePost','id'];
  dataSourceIllegal!: MatTableDataSource<Post>;
  postIllegalResponse: any;
  @ViewChild('paginatorIllegal') paginator2!: MatPaginator;
  @ViewChild('ilSort') sort2!: MatSort;

  displayedColumns3: string[] = ['delFlg', 'createDate', 'updateDate','content','accessModifierLevel','typePost','id'];
  dataPostDeleted!: MatTableDataSource<Post>;
  postDeletedResponse: any;
  @ViewChild('paginatorRecover') paginator3!: MatPaginator;
  @ViewChild('dSort') sort3!: MatSort;

  public post!: Post;

  public listPostDelete:Post[] = [];

  public listpostIllegalResponse : Post[] =[];

  public postDelete!: Post;
  public postRecover!: Post;

  constructor(private postService: PostManagerService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData():void{
    this.postService.getDataPostLegal().subscribe({
      next: (e) => {
        console.log(e);
        this.postLegalResponse = e.data;
        this.dataSource = new MatTableDataSource(this.postLegalResponse);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
    this.postService.getDataPostIllegal().subscribe({
      next: (e) => {
        console.log(e);
        this.postIllegalResponse = e.data;
        this.dataSourceIllegal = new MatTableDataSource(this.postIllegalResponse);

        this.dataSourceIllegal.paginator = this.paginator2;
        this.dataSourceIllegal.sort = this.sort2;
      },
    });
    this.postService.getPostDeleted().subscribe({
      next: (e) => {
        console.log(e);
        this.postDeletedResponse = e.data;
        this.dataPostDeleted = new MatTableDataSource(this.postDeletedResponse);

        this.dataPostDeleted.paginator = this.paginator3;
        this.dataPostDeleted.sort = this.sort3;
      },
    });
  }

  deletePost(i:any):void{
    this.postDelete = i;
      this.postService.softDelete(this.postDelete).subscribe({
          next: ()=>{
            this.loadData();
          }
      })
  }

  recover(i:any,type:string):void{
    if(typeof i === 'string' && type === 'true'){
      this.listPostDelete = this.postDeletedResponse;
      this.listPostDelete.forEach((e) => {
        this.postRecover = e;
        this.postService.recoverPost(this.postRecover).subscribe({
          next: ()=>{
            this.loadData();
          }
        })
      });
    }
    else{
      this.postRecover = i;
      this.postService.recoverPost(this.postRecover).subscribe({
        next: ()=>{
          this.loadData();
        }
    })
    }
  }

  applyFilter(event: Event,table: number) {
    if(table == 0){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }else if(table == 1){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataPostDeleted.filter = filterValue.trim().toLowerCase();

      if (this.dataPostDeleted.paginator) {
        this.dataPostDeleted.paginator.firstPage();
      }
    }
    else{
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceIllegal.filter = filterValue.trim().toLowerCase();

      if (this.dataSourceIllegal.paginator) {
        this.dataSourceIllegal.paginator.firstPage();
      }
    }
  }
}
