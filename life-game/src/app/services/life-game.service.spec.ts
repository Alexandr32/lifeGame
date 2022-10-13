import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Point } from '../models/point.model';
import { LifeGameService } from './life-game.service';

describe('LifeGameService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [],
    }).compileComponents();
  });

  // arrange
  const lifeGameService = new LifeGameService()

  it('Список соседей не должен быть пустой', () => {
    // act
    const result: Point[] = (lifeGameService as any).getNeighborsOf({ x: 0, y: 0 })

    // assert
    expect(!!result).toBeTrue()
  });

  it('Список соседей должен состоять из 8 координат', () => {
    // act
    const result: Point[] = (lifeGameService as any).getNeighborsOf({ x: 0, y: 0 })

    // assert
    expect(result.length).toBe(8)
  });

  it('Список соседей для 0:0 должны иметь правильне координаты', () => {


    // act
    const result: Point[] = (lifeGameService as any).getNeighborsOf({ x: 0, y: 0 })

    const value = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },

      { x: -1, y: 0 },
      { x: 1, y: 0 },

      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]

    result.forEach((item: Point, index: number) => {
      // assert
      expect(item.x).toBe(value[index].x)
      expect(item.y).toBe(value[index].y)
    })
  });

  it('Список соседей для отрицательных координат -2:-2 должны иметь правильне координаты', () => {

    // act
    const result: Point[] = (lifeGameService as any).getNeighborsOf({ x: -2, y: -2 })

    const value = [
      { x: -3, y: -3 },
      { x: -2, y: -3 },
      { x: -1, y: -3 },

      { x: -3, y: -2 },
      { x: -1, y: -2 },

      { x: -3, y: -1 },
      { x: -2, y: -1 },
      { x: -1, y: -1 },
    ]

    result.forEach((item: Point, index: number) => {
      // assert
      expect(item.x).toBe(value[index].x)
      expect(item.y).toBe(value[index].y)

    })
  });

  it('Список соседей для отрицательных координат -2:2 должны иметь правильне координаты', () => {

    // act
    const result: Point[] = (lifeGameService as any).getNeighborsOf({ x: -2, y: 2 })

    const value = [
      { x: -3, y: 1 },
      { x: -2, y: 1 },
      { x: -1, y: 1 },
      { x: -3, y: 2 },
      { x: -1, y: 2 },
      { x: -3, y: 3 },
      { x: -2, y: 3 },
      { x: -1, y: 3 }
    ]

    result.forEach((item: Point, index: number) => {
      // assert
      expect(item.x).toBe(value[index].x)
      expect(item.y).toBe(value[index].y)

    })
  });

  it('Список соседей для отрицательных координат 2:2 должны иметь правильне координаты', () => {

    // act
    const result: Point[] = (lifeGameService as any).getNeighborsOf({ x: 2, y: 2 })

    const value = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ]
    result.forEach((item: Point, index: number) => {

      // assert
      expect(item.x).toBe(value[index].x)
      expect(item.y).toBe(value[index].y)

    })

  });

  it('Плоский список должен иметь правильные количество элементов', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]

    // act
    const result: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // assert
    expect(result.size).toBe(9)
  });

  it('Плоский список для пустого массив не содержит элементов', () => {

    const array: boolean[][] = []

    // act
    const result: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // assert
    expect(result.size).toBe(0)
  });

  it('Ключи плоского списока должны соответсвовать координатам и их значениям', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, true, false],
      [false, false, true],
    ]

    // act
    const result: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    const value = [
      { key: "0:0", value: false },
      { key: "1:0", value: false },
      { key: "2:0", value: false },
      { key: "0:1", value: false },
      { key: "1:1", value: true },
      { key: "2:1", value: false },
      { key: "0:2", value: false },
      { key: "1:2", value: false },
      { key: "2:2", value: true },
    ]

    value.forEach(item => {
      // assert
      expect(typeof result.get(item.key) == 'boolean').toBe(true)
      expect(result.get(item.key)).toBe(item.value)
    })
  });

  // Клетка в начале координат

  it('Если клетка в начеле координат и 2 соседа (не рядом друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, true, false],
      [true, false, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 0 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка в начеле координат и 2 соседа (друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, false, false],
      [true, true, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 0 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка в начеле координат и 3 соседа она остается живой', () => {

    const array: boolean[][] = [
      [false, true, false],
      [true, true, false],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 0 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка в начеле координат и 1 сосед она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, true, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 0 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  it('Если клетка в начеле координат и нет не одно соседа она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 0 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  // Последняя клетка справа-сверху

  it('Если клетка последняя справа-сверху и 2 соседа (не рядом друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, true, false],
      [false, false, true],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 0 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка последняя справа-сверху и 2 соседа (друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, true, true],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 0 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка последняя справа-сверху и 3 соседа она остается живой', () => {

    const array: boolean[][] = [
      [false, true, true],
      [false, true, true],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 0 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка последняя справа-сверху и 1 сосед она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, true, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 0 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  it('Если клетка последняя справа-сверху и нет не одно соседа она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 0 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  // Последняя клетка справа-снизу

  it('Если клетка справа-снизу и 2 соседа (не рядом друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, true, false],
      [false, false, true],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 2 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка справа-снизу и 2 соседа (друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, true, true],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 2 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка справа-снизу и 3 соседа она остается живой', () => {

    const array: boolean[][] = [
      [false, true, true],
      [false, true, true],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 2 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка справа-снизу и 1 сосед она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 2 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  it('Если клетка справа-снизу и нет не одно соседа она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 2, y: 2 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  // Последняя клетка слева-внизу

  it('Если клетка последняя слева-внизу и 2 соседа (не рядом друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, true, false],
      [true, false, true],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 2 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка последняя слева-внизу и 2 соседа (друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, true, true],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 2 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка последняя слева-внизу и 3 соседа она остается живой', () => {

    const array: boolean[][] = [
      [false, true, true],
      [true, true, true],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 2 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка последняя слева-внизу и 1 сосед она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 2 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  it('Если клетка последняя слева-внизу и нет не одно соседа она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 2 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  // Клетка не последняя в системе координат

  it('Если клетка не последняя в системе координат и 2 соседа (не рядом друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, true, false],
      [false, false, true],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 1, y: 1 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка не последняя в системе координат и 2 соседа (друг с другом) она остается живой', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, true, true],
      [false, false, true],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 1, y: 1 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка не последняя в системе координат и 3 соседа она остается живой', () => {

    const array: boolean[][] = [
      [false, true, false],
      [false, true, true],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 1, y: 1 }, flatList)

    // assert
    expect(result).toBeTrue()
  })

  it('Если клетка не последняя в системе координат и 1 сосед она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, true, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 2 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

  it('Если клетка не последняя в системе координат и нет не одно соседа она не живая', () => {

    const array: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]

    const flatList: Map<string, boolean> = (lifeGameService as any).getFlatList(array)

    // act
    const result = lifeGameService.isAlive({ x: 0, y: 2 }, flatList)

    // assert
    expect(result).toBeFalse()
  })

});
