import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnChanges {
  @Input() isSuccess: boolean = true;
  @Input() isVisible: boolean = false;
  @Input() message: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && changes['isVisible'].currentValue) {
      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    }
  }

  closeNotification() {
    this.isVisible = false;
  }
}
