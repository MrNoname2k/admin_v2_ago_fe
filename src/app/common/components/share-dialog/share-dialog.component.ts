import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ApiPath } from 'src/app/core/config/api-path';
import { SendDataService } from 'src/app/core/service/data/send-data.service';

export interface postData {
  content?: string;
  accessModifierLevel: string;
  typePost: string;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShareDialogComponent {
  @Output() postEvent = new EventEmitter<FormData>();

  public media: any[] = [];
  public content: string = '';
  public files: any[] = [];
  public accessType: string = 'public';
  public formData = new FormData();

  constructor() {}

  public onChangeFiles(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.files = files;

      for (let file of files) {
        var render = new FileReader();
        render.readAsDataURL(file);
        render.onload = (item: any) => {
          this.media.push({ url: item.target.result, type: file.type });
        };
        this.formData.append('files', file);
      }
      console.log(this.media.length);

    }
  }

  public onSubmit(): void {
    let postData: postData = {
      content: this.content,
      accessModifierLevel: this.accessType,
      typePost: 'post',
    };

    this.formData.append('json', JSON.stringify(postData));
    this.postEvent.emit(this.formData);
  }

  public onChooseAccessType(accessType: string): void {
    this.accessType = accessType;
  }
}
