import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LifeGameService {

  startGame(array: boolean[][], integration: number): boolean[][] {

    let result = array
    for (var i = 0; i < integration; i++) {
      result = this.tact(result)
    }

    return array;
  }

  tact(array: boolean[][]): boolean[][] {

    // Плоский список всех пунктов с ключем x:y
    const map: Map<string, boolean> = this.getFlatList(array)

    array.forEach((row: boolean[], y: number) => {

      // if(y > 1) {
      //   return
      // }

      row.forEach((item: boolean, x: number,) => {

        // if(x > 1) {
        //   return
        // }

        const listPopulation: {x: number, y: number}[] = this.getNeighborsOf(x, y);

        const isAlive = this.isAlive(listPopulation, map)

        row[x] = isAlive

      })
    })

    return array;
  }

  // Получить плоский список всех пунктов с ключем x:y
  private getFlatList(array: boolean[][]): Map<string, boolean> {
    const map = new Map<string, boolean>()

    array.forEach((row: boolean[], y: number) => {
      row.forEach((itemX: boolean, x: number) => {
        map.set(`${x}:${y}`, itemX)
      })

    })

    array.forEach((row: boolean[], y: number) => {

      row.forEach((item: boolean, x: number) => {

        map.set(`${x}:${y}`, item)

      })
    })

    return map
  }

  // Список соседей
  getNeighborsOf(x: number, y: number): {x: number, y: number}[] {
    return [
      // Соседи сверху:
      { x: x - 1, y: y - 1 },
      { x, y: y - 1 },
      { x: x + 1, y: y - 1 },

      // ...С каждой стороны:
      { x: x - 1, y },
      { x: x + 1, y },

      // ...И под указанной клеткой:
      { x: x - 1, y: y + 1 },
      { x, y: y + 1 },
      { x: x + 1, y: y + 1 },
    ];
  }

  // Клетка остаётся живой, только если у неё 2 или 3 живых соседа
  isAlive(listPopulation: {x: number, y: number}[], map: Map<string, boolean>): boolean {
    const result: boolean[] = []

    listPopulation.forEach((env: {x: number, y: number}) => {
      const value = map.get(`${env.x}:${env.y}`)
      if(value) {
        result.push(value)
      }
    })

    const incloudArray = result.filter(item => item)

   // если живых соседей меньше двух или больше трёх клетка умирает
   if(incloudArray.length < 2 || incloudArray.length > 3) {
    return false
   }

   return true

  }
}
