import { Component, Input } from "@angular/core";
import { QuizData } from "src/app/models/models";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent{
  @Input() props!: { correctCount: number | null; quizItems: QuizData[] | null };
}
