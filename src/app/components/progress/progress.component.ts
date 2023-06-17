import { Component, ElementRef, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { QuizData } from "src/app/models/models";
import { QuizService } from "src/app/services/quiz.service";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"],
})
export class ProgressComponent implements OnInit {
  curIdx$!: Observable<number>;
  quizItems!: QuizData[];

  constructor(private quizService: QuizService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.curIdx$ = this.quizService.currentIdx$;
    this.quizItems = this.quizService.quizData;

    this.quizService.progressWidth$.subscribe((width) => {
      document.documentElement.style.setProperty(
        "--progress-width",
        `${width}px`
      );
    });

    setTimeout(() => {
      const progressWidth = this.elementRef.nativeElement.clientWidth;
      this.quizService.updateProgressElementWidth(progressWidth);
    });
  }
}
