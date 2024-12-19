import { trigger, transition, query, style, group, animate, state } from "@angular/animations";

// export const fadeInOut =
//   trigger('fadeInOut', [
//     transition(':enter', [
//         style({ opacity: 0, transform: 'scale(0.9)' }),
//         animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
//       ]),
//       transition(':leave', [
//         animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' })),
//       ]),
//   ]);

  export const fadeInOut = trigger('fadeInOut', [
    state('visible', style({ opacity: 1, transform: 'scale(1)' })),
    state('hidden', style({ opacity: 0, transform: 'scale(0.9)' })),
    transition('hidden => visible', [
      animate('200ms ease-out')
    ]),
    transition('visible => hidden', [
      animate('200ms ease-in')
    ])
  ]);