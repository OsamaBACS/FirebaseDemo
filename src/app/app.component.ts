import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  courses$: AngularFireList<any[]>;
  courseObservable$;
  course$;
  authors$: Observable<any>;
  // courses!: any[];
  // subscription: Subscription;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses');
    this.courseObservable$ = this.courses$.snapshotChanges();

    // To Get Object
    this.course$ = db.object('/courses/1').valueChanges();

    this.authors$ = db.object('/courses/authors/1').valueChanges();

    // this.subscription = db
    //   .list('courses')
    //   .valueChanges()
    //   .subscribe((courses) => {
    //     this.courses = courses;
    //     console.log(this.courses);
    //   });
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  add(course: HTMLInputElement) {
    this.courses$.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        { title: 'Components' },
        { title: 'Directives' },
        { title: 'Templates' },
      ],
    } as any);
    course.value = '';
  }
  update(course: any) {
    this.db.object('/courses/' + course.key).update({
      title: 'New Title',
      isLive: true,
    });
  }
  delete(course: any) {
    this.db
      .object('/courses/' + course.key)
      .remove()
      .then((x) => console.log('Deleted'));
  }
}
