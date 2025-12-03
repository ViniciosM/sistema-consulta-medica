import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }

    const payload = jwt.verify(token, secret);

    req.user = { id: payload.userId, perfil: payload.perfil };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Não autenticado' });
      }
      if (!allowedRoles.includes(req.user.perfil)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }
      next();
    } catch (err) {
      console.error('requireRole error:', err);
      res.status(500).json({ error: 'Erro interno' });
    }
  };
};
