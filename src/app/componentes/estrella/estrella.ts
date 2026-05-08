import { Component, Input } from '@angular/core';
import { LucideStar } from '@lucide/angular';

@Component({
    selector: 'app-estrella',
    imports: [LucideStar],
    templateUrl: './estrella.html',
})
export class Estrella {
    @Input() rating: number | undefined;
}