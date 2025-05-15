import passport from 'passport';

import { setupLocalStrategy } from './localStrategy';
import { setupJwtStrategy } from './jwtStrategy';

setupLocalStrategy();
setupJwtStrategy();

export default passport;
