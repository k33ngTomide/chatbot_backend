

const corsConfig = {
  enabled: true,
  origin: ['https://chatbot-frontend-delta-three.vercel.app'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
}

export default corsConfig
