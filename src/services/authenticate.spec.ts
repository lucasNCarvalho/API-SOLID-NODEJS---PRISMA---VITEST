import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Register Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {

        await usersRepository.create({
            name: 'lucas',
            email: 'lucas@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'lucas@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        await expect(() =>
            sut.execute({
                email: 'lucas@gmail.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {

        await usersRepository.create({
            name: 'lucas',
            email: 'lucas@gmail.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() =>
            sut.execute({
                email: 'lucas@gmail.com',
                password: '12343356'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})