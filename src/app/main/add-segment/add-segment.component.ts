import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  AppComponent
} from 'src/app/app.component';

export interface DialogData {
  icon: string;
  description: string;
  name: string;
}

@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.scss']
})
export class AddSegmentComponent implements OnInit {

  addSegmentForm: FormGroup;
  public textArea: string = '';

  public isEmojiPickerVisible: boolean;
  public addEmoji(event) {
    this.addSegmentForm.get('icon').setValue(`${this.textArea}${event.emoji.native}`)

    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  constructor(
    public dialogRef: MatDialogRef < AppComponent > ,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.addSegmentForm = this.formBuilder.group({
      name: [''],
      icon: [''],
      description: ['']
    })
  }

  selectIcon(event) {
    this.isEmojiPickerVisible = true
  }

  save() {
    this.dialogRef.close(this.addSegmentForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
