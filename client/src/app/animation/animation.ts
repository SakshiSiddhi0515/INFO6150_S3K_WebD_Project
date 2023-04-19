import { animation, trigger, animateChild, group, transition, animate, style, query} from '@angular/animations';
  
export const transAnimation = trigger('fadeIn', [
	transition(':enter',[
		
		style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))
		
	]),
	transition(':leave',[
		
		style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))
		
	])

])