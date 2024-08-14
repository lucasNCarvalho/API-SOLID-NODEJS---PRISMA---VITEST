import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function  metrics(request: FastifyRequest, reply: FastifyReply) {

        const getUserMetricsService = makeGetUserMetricsService()

        const {checkInsCount} = await getUserMetricsService.execute({
           userId: request.user.sub,
        })


    return reply.status(201).send({
        checkInsCount
    })
}