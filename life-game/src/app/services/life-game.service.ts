import { Injectable } from "@angular/core";
import { Point } from "../models/point.model";

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

      row.forEach((item: boolean, x: number,) => {

        const isAlive = this.isAlive({x, y}, map)

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
  private getNeighborsOf(point: Point): Point[] {

  const {x, y} = point

    return [
      { x: x - 1, y: y - 1 },
      { x, y: y - 1 },
      { x: x + 1, y: y - 1 },

      { x: x - 1, y },
      { x: x + 1, y },

      { x: x - 1, y: y + 1 },
      { x, y: y + 1 },
      { x: x + 1, y: y + 1 },
    ];
  }

  // если живых соседей меньше двух или больше трёх клетка умирает
  isAlive(point: Point, map: Map<string, boolean>): boolean {

    const listPopulation: Point[] = this.getNeighborsOf(point);

    const result: boolean[] = []

    listPopulation.forEach((env: Point) => {
      const value = map.get(`${env.x}:${env.y}`)
      if(value) {
        result.push(value)
      }
    })

    const incloudArray = result.filter(item => item)

   if(incloudArray.length < 2 || incloudArray.length > 3) {
    return false
   }

   return true

  }
}
