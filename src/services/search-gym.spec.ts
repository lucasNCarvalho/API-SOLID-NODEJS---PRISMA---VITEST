import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymService } from './search-gyms'



let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Fetch User Check-in History Service', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymService(gymsRepository)
    })


    it('should be able to search for gyms', async () => {

        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        await gymsRepository.create({
            title: 'Typescript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })


        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1,
        })


        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym' }),
        ])
    })


    it.skip('should be able to fetch paginated gyms search', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Typescript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        }

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 2
        })
        
        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Typescript Gym 21' }),
            expect.objectContaining({ title: 'Typescript Gym 22' })
        ])
    })
})