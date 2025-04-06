

const corsConfig = {
  enabled: true,
  origin: ['http://localhost:5173'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
}

export default corsConfig
