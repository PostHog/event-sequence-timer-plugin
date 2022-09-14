import { describe, expect, test } from '@jest/globals'
import { extractEventsToTrack } from './index'

describe('correctly matches and extracts events', () => {
    test('correctly extracts single pair', () => {
        expect(extractEventsToTrack('(test1,test2)')).toStrictEqual([['test1', 'test2']])
    })

    test('correctly extracts two pairs', () => {
        expect(extractEventsToTrack('(test1,test2),(test3,test4)')).toStrictEqual([
            ['test1', 'test2'],
            ['test3', 'test4']
        ])
    })

    test('correctly extracts a pair with a space in the name', () => {
        expect(extractEventsToTrack('(test event,test2),(test3,test4)')).toStrictEqual([
            ['test event', 'test2'],
            ['test3', 'test4']
        ])
    })

    test('correctly extracts a pair with a trailing space', () => {
        expect(extractEventsToTrack('(test event,another event ),(test3,test4)')).toStrictEqual([
            ['test event', 'another event'],
            ['test3', 'test4']
        ])
    })

    test('correctly extracts a pair with a leading space', () => {
        expect(extractEventsToTrack('(test event, another event),(test3,test4)')).toStrictEqual([
            ['test event', 'another event'],
            ['test3', 'test4']
        ])
    })
})

describe('throws when passed invalid pairs of events', () => {
    test('throws when no events are passed', () => {
        expect(() => extractEventsToTrack('')).toThrow()
    })

    test('throws on empty pair', () => {
        expect(() => extractEventsToTrack('(,),(a,b)')).toThrow()
    })

    test('throws on extra event in pair', () => {
        expect(() => extractEventsToTrack('(test1,test2,test3),(test4,test5)')).toThrow()
    })

    test('fails to extract when missing opening parethesis', () => {
        expect(() => extractEventsToTrack('test event, another event),(test3,test4)')).toThrow()
    })

    test('fails to extract when missing trailing parethesis', () => {
        expect(() => extractEventsToTrack('(test event, another event,(test3,test4)')).toThrow()
    })

    test('fails to extract when missing comma', () => {
        expect(() => extractEventsToTrack('(test event),(test3,test4)')).toThrow()
    })

    test('fails to extract when missing comma between pairs', () => {
        expect(() => extractEventsToTrack('(test1,test2(test3,test4)')).toThrow()
    })

    test('fails to extract when trailing comma is present', () => {
        expect(() => extractEventsToTrack('(test1,test2),(test3,test4),')).toThrow()
    })
})
