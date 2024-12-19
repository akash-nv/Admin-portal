import { transition, style, query, sequence, animate, stagger, state, trigger } from "@angular/animations";


export const DropDownAnimation = trigger("dropDownMenu", [
    transition(":enter", [
        style({ height: 0, overflow: "hidden" }),
        query(".menu-item", [
            style({ opacity: 0, transform: "translateY(-50px)" })
        ]),
        sequence([
            animate("150ms", style({ height: "*" })),
            query(".menu-item", [
                stagger(-50, [
                    animate("300ms ease", style({ opacity: 1, transform: "none" }))
                ])
            ])
        ])
    ]),

    transition(":leave", [
        style({ height: "*", overflow: "hidden" }),
        query(".menu-item", [style({ opacity: 1, transform: "none" })]),
        sequence([
            query(".menu-item", [
                stagger(50, [
                    animate(
                        "300ms ease",
                        style({ opacity: 0, transform: "translateY(-50px)" })
                    )
                ])
            ]),
            animate("150ms", style({ height: 0 }))
        ])
    ])
]);

export const rotateAnimation = trigger('rotatedState', [
    state('false', style({ transform: 'rotate(0)' })),
    state('true', style({ transform: 'rotate(180deg)' })),
    transition('true => false', animate('0.3s cubic-bezier(0.35, 0, 0.25, 1)')),
    transition('false => true', animate('0.3s cubic-bezier(0.35, 0, 0.25, 1)'))
])
