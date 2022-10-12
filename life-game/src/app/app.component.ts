import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { LifeGameService } from './services/life-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = 'life-game';

  integration: number = 1

  disableButton = false;

  size: number = 3

  array: boolean[][] = []

  constructor(
    private lifeGameService: LifeGameService,
    private chd: ChangeDetectorRef,
    private _ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.setSize(this.size.toString())
  }

  setSize(size: string) {

    if(this.disableButton) {
      return
    }

    this._ngZone.runOutsideAngular(() => {

      const value = Number(size)

      if(isNaN(value)) {
        return
      }

      this.size = value

      this.array = new Array(this.size)

      for(let i = 0; i < this.size; i++) {
        this.array[i] = []
        for(let j = 0; j< this.size; j++) {
          this.array[i][j] = false
        }
      }

    })

    this.chd.detectChanges()
  }

  async startGame() {

    this.disableButton = true

    for(let i = 1; i <= this.integration; i++) {

      await this.tact(() => {

        this.lifeGameService.integration(this.array)
        console.log('work');

        if(i === this.integration) {
          this.disableButton = false
        }

        this.chd.detectChanges()
      }, 200)
    }


  }

  clickItem(i: number, j: number) {


    if(this.disableButton) {
      return
    }

    this.array[i][j] = !this.array[i][j]

    this.chd.detectChanges()
  }

  private tact = (func: () => void, time: number): Promise<any> => {
     return new Promise((resolve) => {

      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          func()
          resolve(true)
        }, time)
      })

     })
  }

}
