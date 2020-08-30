import pesel from '@/services/generators/pesel.js'
import { describe, expect, it } from '@jest/globals'
import MockDate from 'mockdate'

describe('Pesel', () => {
  it('should generate 11 digits number', () => {
    const generatedPesel = pesel.pesel(null, null, 'any')
    expect(generatedPesel.length).toBe(11)
  })

  it('should generate number based on age', () => {
    const generatedPesel = pesel.pesel(null, 21, 'any')
    expect(Number.parseInt(generatedPesel)).toBeGreaterThan(99000000000)
    expect(Number.parseInt(generatedPesel)).toBeLessThan(100000000000)
  })

  it('should generate male and female number', () => {
    let generatedPesel = pesel.pesel(null, null, 'female')
    expect(generatedPesel[9] % 2).toBe(0)

    generatedPesel = pesel.pesel(null, null, 'male')
    expect(generatedPesel[9] % 2).toBe(1)
  })

  it('should generate number based on birthDate', () => {
    const generatedPesel = pesel.pesel('1997-02-15', null, 'any')
    expect(generatedPesel.substr(0, 6)).toBe('970215')
  })

  it('should generate proper number after millennium', () => {
    const generatedPesel = pesel.pesel('2001-12-31', null, 'any')
    expect(generatedPesel.substr(0, 6)).toBe('013231')
  })

  it('should prepare birthday of grownup if age set to 18', () => {
    MockDate.set(new Date('2020-07-05T10:00:00.000Z'))
    const result = pesel.pesel(null, 18, 'any')
    expect(Number.parseInt((result).substr(1, 5))).toBeLessThan(22705)
  })

  it('should prepare birthday even on first day of year', () => {
    MockDate.set(new Date('2020-01-01T10:00:00.000Z'))
    const result = pesel.pesel(null, 23, 'any')
    expect(Number.parseInt((result).substr(0, 6))).toBe(970101)
  })

  it('should prepare birthday even on the last day of year', () => {
    MockDate.set(new Date('2020-12-31T10:00:00.000Z'))
    const result = pesel.pesel(null, 23, 'any')
    expect(Number.parseInt((result).substr(0, 6))).toBeLessThan(971231)
  })

  it('should generate pesel for time travelers from other centuries', () => {
    let result = pesel.pesel('1897-02-15', null, 'any')
    expect(Number.parseInt((result).substr(0, 6))).toBe(978215)

    result = pesel.pesel('2197-02-15', null, 'any')
    expect(Number.parseInt((result).substr(0, 6))).toBe(974215)

    result = pesel.pesel('2297-02-15', null, 'any')
    expect(Number.parseInt((result).substr(0, 6))).toBe(976215)
  })
})
