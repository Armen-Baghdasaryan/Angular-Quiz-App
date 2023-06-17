import { Injectable, OnInit } from "@angular/core";
import { QuizData } from "../models/models";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QuizService implements OnInit {
  private currentIdxSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  currentIdx$ = this.currentIdxSubject.asObservable();

  private correctCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  correctCount$ = this.correctCountSubject.asObservable();

  private progressWidthSubject: BehaviorSubject<any> = new BehaviorSubject<
    number | null
  >(0);
  progressWidth$ = this.progressWidthSubject.asObservable();

  private progressElementWidthSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  progressElementWidth$ = this.progressElementWidthSubject.asObservable();

  private checkAnsverSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  checkAnswer$ = this.checkAnsverSubject.asObservable();

  private answerIsChoosedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  answerIsChoosed$ = this.answerIsChoosedSubject.asObservable();

  quizData: QuizData[] = [
    {
      id: JSON.stringify(Math.random() * Math.random()),
      question: "How many oceans are there?",
      answers: [
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Seven",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Two",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Four",
          isChoosed: false,
          isTrusty: false,
          isCorrect: true,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Nine",
          isChoosed: false,
          isTrusty: false,
        },
      ],
      correctAnswer: 3,
    },
    {
      id: JSON.stringify(Math.random() * Math.random()),
      question: "Who discovered America?",
      answers: [
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Mozart",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Fernan Magellan",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Vasco Da Gamma",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Christopher Colombos",
          isChoosed: false,
          isTrusty: true,
          isCorrect: true,
        },
      ],
      correctAnswer: 4,
    },
    {
      id: JSON.stringify(Math.random() * Math.random()),
      question: 'Who is the author of the picture "Scream"?',
      answers: [
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Edvard Munch",
          isChoosed: false,
          isTrusty: false,
          isCorrect: true,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Salvador Dali",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Michelangelo",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() * Math.random()),
          answer: "Luciano Pavarotti",
          isChoosed: false,
          isTrusty: false,
        },
      ],
      correctAnswer: 1,
    },
    {
      id: JSON.stringify(Math.random() + Math.random()),
      question: "Which team won  World Cup 2023?",
      answers: [
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "Armenia",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "Argentina",
          isChoosed: false,
          isTrusty: false,
          isCorrect: true,
        },
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "Brazil",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "France",
          isChoosed: false,
          isTrusty: false,
        },
      ],
      correctAnswer: 2,
    },
    {
      id: JSON.stringify(Math.random() * Math.random()),
      question: "Which player received the golden ball in 2022?",
      answers: [
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "Leo Messi",
          isChoosed: false,
          isTrusty: false,
          isCorrect: true,
        },
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "K. Benzema",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "R. Lewandowski",
          isChoosed: false,
          isTrusty: false,
        },
        {
          id: JSON.stringify(Math.random() + Math.random()),
          answer: "C. Ronaldo",
          isChoosed: false,
          isTrusty: false,
        },
      ],
      correctAnswer: 1,
    },
  ];

  constructor() {}

  handleChoose(idx: number, corAnsw: number, id: string) {
    this.progressWidthSubject.next(
      this.progressWidthSubject.value +
        this.progressElementWidthSubject.value / this.quizData.length
    );

    if (idx === corAnsw) {
      this.correctCountSubject.next(this.correctCountSubject.value + 1);
      this.checkAnsverSubject.next(true);
    } else {
      this.checkAnsverSubject.next(false);
    }
    this.answerIsChoosedSubject.next(true);

    this.handleChangeItem(id, idx, corAnsw);
  }

  handleChangeItem(id: string, idx: number, corAnsw: number) {
    this.quizData.map((quiz) => {
      quiz.answers.map((item) => {
        if (item.id === id) {
          item.isChoosed = true;
        }
        if (item.isCorrect) {
          item.isTrusty = true;
        }
      });
    });
  }

  handleNext() {
    this.currentIdxSubject.next(this.currentIdxSubject.value + 1);
    this.checkAnsverSubject.next(null);
    this.answerIsChoosedSubject.next(false);
    this.quizData.map((quiz) => {
      quiz.answers.map((item) => {
        item.isTrusty = false;
      });
    });
  }

  updateProgressElementWidth(width: number) {
    this.progressElementWidthSubject.next(width);
  }

  ngOnInit(): void {}
}
