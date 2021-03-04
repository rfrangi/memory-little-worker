import {animate, state, style, transition, trigger} from "@angular/animations";

export const CHANGE_CARD = [
  trigger('cardFlip', [
    state('default', style({
      transform: 'none',
    })),
    state('success', style({
      transform: 'perspective(600px) rotateX(360deg)'
    })),
    transition('* => *', [
      animate('400ms')
    ]),

  ])
]
