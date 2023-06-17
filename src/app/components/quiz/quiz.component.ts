import { Component, OnInit } from "@angular/core";
import { QuizData } from "src/app/models/models";
import { QuizService } from "src/app/services/quiz.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
})
export class QuizComponent implements OnInit {
  quizItems!: QuizData[];
  curIdx$!: Observable<number>;
  correctCount$!: Observable<number | null>;
  checkAnswer$!: Observable<boolean>;
  answerIsChoosed$!: Observable<boolean>;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizItems = this.quizService.quizData;
    this.curIdx$ = this.quizService.currentIdx$;
    this.correctCount$ = this.quizService.correctCount$;
    this.checkAnswer$ = this.quizService.checkAnswer$;
    this.answerIsChoosed$ = this.quizService.answerIsChoosed$;
  }

  handleChoose(i: number, corAnsw: number, id: string) {
    this.quizService.handleChoose(i, corAnsw, id);
  }

  handleNext() {
    this.quizService.handleNext();
  }
}
