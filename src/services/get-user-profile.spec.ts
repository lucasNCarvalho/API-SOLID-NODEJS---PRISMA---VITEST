import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)
    })

    it('should be able to a user profile', async () => {

        const createdUser = await usersRepository.create({
            name: 'lucas',
            email: 'lucas@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('lucas')
    })


    
    it('should not able to get user profile with wrong id', async () => {

        expect(() => 
            sut.execute({
                userId: 'non-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

})