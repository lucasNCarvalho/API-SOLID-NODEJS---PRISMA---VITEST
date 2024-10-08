import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "../gyms/create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";


export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/gyms/:gymId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate', validate)

}