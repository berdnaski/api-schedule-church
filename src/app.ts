import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { usersRoutes } from './http/controllers/users/routes';
import { authRoutes } from './http/controllers/auth/routes';
import { departmentsRoutes } from './http/controllers/departments/routes';
import { schedulesRoutes } from './http/controllers/schedules/routes';
import { songsRoutes } from './http/controllers/songs/routes';
import { songsVersionRoutes } from './http/controllers/songVersion/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { adminRoutes } from './http/controllers/admin/routes';
import { leaderRequestRoutes } from './http/controllers/leader-request/routes';

export const app = fastify();

app.register(cors, {
  origin: 'http://localhost:5173', // URL do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  }
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(authRoutes);
app.register(departmentsRoutes);
app.register(schedulesRoutes);
app.register(songsRoutes);
app.register(songsVersionRoutes);
app.register(adminRoutes);
app.register(leaderRequestRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // Log error for production environment
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
