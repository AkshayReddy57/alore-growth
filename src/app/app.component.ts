import {
  Component
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  AddSegmentComponent
} from './main/add-segment/add-segment.component';
import {
  EmojiModule
} from '@ctrl/ngx-emoji-mart/ngx-emoji';
import {
  AddTableComponent
} from './main/add-table/add-table.component';
import {
  TooltipPosition
} from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alore';
  segments = [];
  public textArea: string = '';
  icon: string;
  description: string;
  name: string;
  dynamicTestList: any;
  selectedTestItem: any;
  color: string;
  showExtraClass = true;
  segmentIndex: any = 0
  positionOptions: TooltipPosition = 'above';

  public isEmojiPickerVisible: boolean;
  public addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  constructor(public dialog: MatDialog) {}

  addSegment() {

    const dialogRef = this.dialog.open(AddSegmentComponent, {
      width: '450px',
      data: {
        name: this.name,
        icon: this.icon,
        description: this.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.name) {
        let obj = {
          name: result.name,
          icon: result.icon,
          description: result.description,
          tables: [],
        }
        this.segments.push(obj)
      }
    });
  }

  addNewTable(segment, index) {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '450px',
      data: {
        name: this.name,
        icon: this.icon,
        color: this.color
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.name) {
        let obj = {
          name: result.name,
          icon: result.icon,
          color: result.color,
        }
        this.segments = this.segments.map((element, i) => {
          if (element.name == segment.name && index == i) {
            element.tables.push(obj)
          }
          return element
        })
      }
    })

  }

}
