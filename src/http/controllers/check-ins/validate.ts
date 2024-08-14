import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { makeValidadeCheckInService } from '@/services/factories/make-validate-check-in-service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchemaa = z.object({
        checkInId: z.string().uuid()
    })


    const { checkInId } = validateCheckInParamsSchemaa.parse(request.params)

    const validateCheckInService = makeValidadeCheckInService()

    await validateCheckInService.execute({
        checkInId
    })


    return reply.status(204).send()
}