import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    selector   : 'fuse-countdown',
    templateUrl: './countdown.component.html',
    styleUrls  : ['./countdown.component.scss']
})
export class FuseCountdownComponent implements OnInit
{
    @Input('eventDate') eventDate;
    countdown: any;

    constructor()
    {
        this.countdown = {
            days   : '',
            hours  : '',
            minutes: '',
            seconds: ''
        };
    }

    ngOnInit()
    {
        const currDate = moment();
        const eventDate = moment(this.eventDate);

        let diff = eventDate.diff(currDate, 'seconds');

        const countDown =
                  Observable
                      .interval(1000)
                      .map(value => {
                          return diff = diff - 1;
                      })
                      .map(value => {
                          const timeLeft = moment.duration(value, 'seconds');

                          return {
                              days   : timeLeft.asDays().toFixed(0),
                              hours  : timeLeft.hours(),
                              minutes: timeLeft.minutes(),
                              seconds: timeLeft.seconds()
                          };
                      });

        countDown.subscribe(value => {
            this.countdown = value;
        });
    }
}
