import { GetUserMetricsService } from "../get-user-metric"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsService() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const userMetrics = new GetUserMetricsService(checkInsRepository)

    return userMetrics
}