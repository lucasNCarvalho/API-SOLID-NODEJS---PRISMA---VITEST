import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInService } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validade Check-in Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInService(checkInsRepository)
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {
        const CreatedCheckIn = await checkInsRepository.create({
            gym_Id: 'gym-01',
            userId: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: CreatedCheckIn.id
        })


        expect(checkIn.id).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should be able to validate an inexistent check-in', async () => {

        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-check-in-id'
            })
        ).rejects.toBe(ResourceNotFoundError)


    })

    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) // utc

        const CreatedCheckIn = await checkInsRepository.create({
            gym_Id: 'gym-01',
            userId: 'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() =>
            sut.execute({
                checkInId: CreatedCheckIn.id
            })
        ).rejects.toBeInstanceOf(Error)
    })
})