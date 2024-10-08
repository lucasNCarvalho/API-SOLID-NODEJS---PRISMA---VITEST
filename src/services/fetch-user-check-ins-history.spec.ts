import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch User Check-in History Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryService(checkInsRepository)
    })


    it('should be able to fetch check-in history', async () => {

        await checkInsRepository.create({
            gym_Id: 'gym-01',
            userId: 'user-01'
        })

        await checkInsRepository.create({
            gym_Id: 'gym-02',
            userId: 'user-01'
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_Id: 'gym-01' }),
            expect.objectContaining({ gym_Id: 'gym-02' })
        ])
    })

    
    it('should be able to fetch paginated check-in history', async () => {

        for(let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gym_Id: `gym-${i}`,
                userId: 'user-01'
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_Id: 'gym-21' }),
            expect.objectContaining({ gym_Id: 'gym-22' })
        ])
    })
})