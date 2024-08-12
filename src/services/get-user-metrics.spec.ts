import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'
import { GetUserMetricsService } from './get-user-metric'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsService(checkInsRepository)
    })


    it('should be able to get user check-ins count from metrics', async () => {

        await checkInsRepository.create({
            gym_Id: 'gym-01',
            userId: 'user-01'
        })

        await checkInsRepository.create({
            gym_Id: 'gym-02',
            userId: 'user-01'
        })

        const { checkInsCount} = await sut.execute({
            userId: 'user-01',
        })


        expect(checkInsCount).toEqual(2)
    })

})