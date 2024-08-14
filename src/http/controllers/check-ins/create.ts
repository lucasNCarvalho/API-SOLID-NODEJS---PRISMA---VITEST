import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function createCheckIn(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckInBodyScehma = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const {gymId} = createCheckInParamsSchema.parse(request.body)
    const {latitude, longitude} = createCheckInBodyScehma.parse(request.body)

        const checkInService = makeCheckInService()

        await checkInService.execute({
            gymId,
            userId: request.user.sub,
            userLatitude: latitude, 
            userLongitude: longitude
        })


    return reply.status(201).send()
}